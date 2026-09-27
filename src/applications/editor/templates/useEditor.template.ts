import { useMemo, useState } from "react";
import type { Editor as TiptapEditor, JSONContent } from "@tiptap/core";

import { createMediaService } from "../../media/mediaService";
import type { MediaKind } from "../../media/types";

import {  useCreateLessonMutation,  useLessonsQuery,  useUpdateLessonMutation } from "../../../queries/useLessonQueries";
import type {  HandleMediaUploadArgs,  HandleMediaUrlSubmitArgs,  LessonContent } from "./editor.template.types";

interface UseEditorTemplateArgs {  editor: TiptapEditor | null; }

const sanitizeProseMirrorNode = (
  node: unknown
): JSONContent | null => {
  if (Array.isArray(node)) {
    const sanitizedArray = node
      .map(sanitizeProseMirrorNode)
      .filter((n): n is JSONContent => n !== null);

    return {
      type: "doc",
      content: sanitizedArray,
    };
  }

  if (node && typeof node === "object") {
    const obj = node as JSONContent;

    if (
      obj.type === "text" &&
      (obj.text == null || obj.text === "")
    ) {
      return null;
    }

    if (Array.isArray(obj.content)) {
      const sanitizedContent = obj.content
        .map(sanitizeProseMirrorNode)
        .filter((n): n is JSONContent => n !== null);

      return {
        ...obj,
        content: sanitizedContent,
      };
    }

    return { ...obj };
  }

  return null;
};

const extractPreviewText = (content: unknown): string => {
  if (!content) {
    return "";
  }

  if (typeof content === "string") {
    return content.trim().slice(0, 220);
  }

  if (typeof content === "object") {
    const textFragments: string[] = [];

    const walk = (node: unknown): void => {
      if (!node || textFragments.join(" ").length > 260) {
        return;
      }

      if (Array.isArray(node)) {
        node.forEach(walk);
        return;
      }

      if (typeof node === "object") {
        const objectNode = node as {
          text?: unknown;
          content?: unknown;
        };

        if (typeof objectNode.text === "string") {
          textFragments.push(objectNode.text);
        }

        walk(objectNode.content);
      }
    };

    walk(content);

    return textFragments
      .join(" ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 220);
  }

  return "";
};

const useEditorTemplate = ({
  editor,
}: UseEditorTemplateArgs) => {
  const { createLesson } = useCreateLessonMutation();
  const { updateLesson } = useUpdateLessonMutation();

  const {
    lessons,
    refetch: refetchLessons,
  } = useLessonsQuery({
    limit: 100,
  });

  const [currentLessonId, setCurrentLessonId] =
    useState<string | null>(null);

  const [selectedDocumentId, setSelectedDocumentId] =
    useState<string | null>(null);

  const [mediaDialogOpen, setMediaDialogOpen] =
    useState(false);

  const [mediaDialogMode, setMediaDialogMode] =
    useState<MediaKind>("image");

  const mediaService = useMemo(
    () => createMediaService(),
    []
  );

  const openMediaDialog = (mode: MediaKind) => {
    setMediaDialogMode(mode);
    setMediaDialogOpen(true);
  };

  const closeMediaDialog = () => {
    setMediaDialogOpen(false);
  };

  const insertVideoLink = (
    url: string,
    label: string
  ) => {
    if (!editor) {
      return;
    }

    const safeLabel = label || "Video";

    editor
      .chain()
      .focus()
      .insertContent({
        type: "paragraph",
        content: [
          {
            type: "text",
            text: safeLabel,
            marks: [
              {
                type: "link",
                attrs: {
                  href: url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
              },
            ],
          },
        ],
      })
      .run();
  };

  const handleMediaUpload = async ({
    mode,
    files,
    altText,
  }: HandleMediaUploadArgs) => {
    if (!editor) {
      throw new Error("Editor is not available.");
    }

    if (!files.length) {
      throw new Error("Please select at least one file.");
    }

    const uploaded =
      await mediaService.addUploadMedia(
        mode,
        files[0],
        {
          altText,
        }
      );

    if (mode === "image") {
      editor
        .chain()
        .focus()
        .setImage({
          src: uploaded.url,
          alt: uploaded.altText || uploaded.name,
        })
        .run();

      return;
    }

    insertVideoLink(
      uploaded.url,
      uploaded.altText || uploaded.name
    );
  };

  const handleMediaUrlSubmit = async ({
    mode,
    url,
    altText,
  }: HandleMediaUrlSubmitArgs) => {
    if (!editor) {
      throw new Error("Editor is not available.");
    }

    const media =
      await mediaService.addUrlMedia(
        mode,
        url,
        {
          altText,
        }
      );

    if (mode === "image") {
      editor
        .chain()
        .focus()
        .setImage({
          src: media.url,
          alt: media.altText || media.name,
        })
        .run();

      return;
    }

    insertVideoLink(
      media.url,
      media.altText || media.name
    );
  };

  const createNewLesson = async (
    name: string
  ) => {
    if (!editor) {
      console.error(
        "Editor is not available. Cannot save lesson."
      );
      return;
    }

    const result = await createLesson({
      variables: {
        input: {
          title: name,
          content: editor.getJSON(),
        },
      },
    });

    const createdId =
      result.data?.createLesson?.id;

    if (createdId) {
      setCurrentLessonId(createdId);
    }
  };

  const saveLesson = async (
    name: string
  ) => {
    if (!editor) {
      console.error(
        "Editor is not available. Cannot save lesson."
      );
      return;
    }

    if (!currentLessonId) {
      await createNewLesson(name);
      return;
    }

    await updateLesson({
      variables: {
        id: currentLessonId,
        input: {
          title: name,
          content: editor.getJSON(),
        },
      },
    });
  };

  const saveLessonAs = async (
    name: string
  ) => {
    await createNewLesson(name);
  };

  const openLesson = async (
    name: string
  ) => {
    if (!editor) {
      console.error(
        "Editor is not available. Cannot open lesson."
      );
      return;
    }

    const lessonToOpen =
      lessons.find(
        (lesson) =>
          lesson.id === selectedDocumentId
      ) ??
      lessons.find(
        (lesson) =>
          lesson.title === name
      );

    if (!lessonToOpen) {
      console.error(
        "No matching lesson found to open."
      );
      return;
    }

    let content: LessonContent =
      lessonToOpen.content as LessonContent;

    if (!content) {
      content = {
        type: "doc",
        content: [
          {
            type: "paragraph",
          },
        ],
      };
    } else if (typeof content === "string") {
      try {
        content = JSON.parse(
          content
        ) as JSONContent;
      } catch (error) {
        console.error(
          "Lesson content is not valid JSON:",
          {
            lessonId: lessonToOpen.id,
            title: lessonToOpen.title,
            error,
          }
        );

        editor.commands.setContent(
          "<p>Unable to load document content because the stored JSON is invalid.</p>"
        );

        return;
      }
    }

    content =
      sanitizeProseMirrorNode(content) ??
      {
        type: "doc",
        content: [
          {
            type: "paragraph",
          },
        ],
      };

    try {
      editor.commands.setContent(
        content
      );
    } catch (error) {
      console.error(
        "Failed to load Tiptap document:",
        {
          lessonId: lessonToOpen.id,
          title: lessonToOpen.title,
          content,
          error,
        }
      );

      editor.commands.setContent(
        "<p>Unable to load document content.</p>"
      );

      return;
    }

    setCurrentLessonId(
      lessonToOpen.id
    );

    setSelectedDocumentId(
      lessonToOpen.id
    );
  };

  const documents = lessons.map(
    (lesson) => ({
      id: lesson.id,
      title: lesson.title,
      updatedAt: lesson.updated_at,
      contentVersion:
        lesson.content_version,
      previewText:
        extractPreviewText(
          lesson.content
        ),
    })
  );

  return {
    // Lesson state
    currentLessonId,
    setCurrentLessonId,

    selectedDocumentId,
    setSelectedDocumentId,

    // Lessons
    lessons,
    documents,
    refetchLessons,

    // Media dialog
    mediaDialogOpen,
    mediaDialogMode,
    openMediaDialog,
    closeMediaDialog,

    // Media operations
    handleMediaUpload,
    handleMediaUrlSubmit,

    // Lesson operations
    createNewLesson,
    saveLesson,
    saveLessonAs,
    openLesson,
  };
};

export default useEditorTemplate;