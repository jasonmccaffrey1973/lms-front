import type { Editor as TiptapEditor } from "@tiptap/core";
import { EditorContent } from "@tiptap/react";
import { useEffect, useState } from "react";

import FileDialog from "../components/fileDialog/FileDialog";
import useFileDialog from "../components/fileDialog/useFileDialog";
import Ribbon from "../components/ribbon/Ribbon";
import StyledEditorTemplate from "./Editor.Template.Styles";
import MediaDialog from "../../media/components/MediaDialog";
import { createMediaService } from "../../media/mediaService";
import type { MediaKind } from "../../media/types";
import {
  useCreateLessonMutation,
  useLessonsQuery,
  useUpdateLessonMutation,
} from "../../../queries/useLessonQueries";

interface EditorTemplateProps {
  editor: TiptapEditor | null;
}

const extractPreviewText = (content: unknown): string => {
  if (!content) {
    return "";
  }

  if (typeof content === "string") {
    return content.trim().slice(0, 220);
  }

  if (typeof content === "object") {
    const textFragments: string[] = [];

    const walk = (node: unknown) => {
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

    return textFragments.join(" ").replace(/\s+/g, " ").trim().slice(0, 220);
  }

  return "";
};

const EditorTemplate = ({ editor }: EditorTemplateProps) => {
  const { createLesson } = useCreateLessonMutation();
  const { updateLesson } = useUpdateLessonMutation();
  const { lessons, refetch: refetchLessons } = useLessonsQuery({ limit: 100 });
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [mediaDialogOpen, setMediaDialogOpen] = useState(false);
  const [mediaDialogMode, setMediaDialogMode] = useState<MediaKind>("image");
  const mediaService = createMediaService();

  const openMediaDialog = (mode: MediaKind) => {
    setMediaDialogMode(mode);
    setMediaDialogOpen(true);
  };

  const closeMediaDialog = () => {
    setMediaDialogOpen(false);
  };

  const insertVideoLink = (url: string, label: string) => {
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
  }: {
    mode: MediaKind;
    files: File[];
    altText: string;
  }) => {
    if (!editor) {
      throw new Error("Editor is not available.");
    }

    if (!files.length) {
      throw new Error("Please select at least one file.");
    }

    const uploaded = await mediaService.addUploadMedia(mode, files[0], {
      altText,
    });

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

    insertVideoLink(uploaded.url, uploaded.altText || uploaded.name);
  };

  const handleMediaUrlSubmit = async ({
    mode,
    url,
    altText,
  }: {
    mode: MediaKind;
    url: string;
    altText: string;
  }) => {
    if (!editor) {
      throw new Error("Editor is not available.");
    }

    const media = await mediaService.addUrlMedia(mode, url, {
      altText,
    });

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

    insertVideoLink(media.url, media.altText || media.name);
  };

  const createNewLesson = async (name: string) => {
    if (!editor) {
      console.error("Editor is not available. Cannot save lesson.");
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

    const createdId = result.data?.createLesson?.id;
    if (createdId) {
      setCurrentLessonId(createdId);
    }
  };

  const saveLesson = async (name: string) => {
    if (!editor) {
      console.error("Editor is not available. Cannot save lesson.");
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

  const saveLessonAs = async (name: string) => {
    await createNewLesson(name);
  };

  const openLesson = async (name: string) => {
    if (!editor) {
      console.error("Editor is not available. Cannot open lesson.");
      return;
    }

    const lessonToOpen =
      lessons.find((lesson) => lesson.id === selectedDocumentId) ??
      lessons.find((lesson) => lesson.title === name);

    if (!lessonToOpen) {
      console.error("No matching lesson found to open.");
      return;
    }

    const content = lessonToOpen.content ?? { type: "doc", content: [{ type: "paragraph" }] };

    editor.commands.setContent(content);
    setCurrentLessonId(lessonToOpen.id);
    setSelectedDocumentId(lessonToOpen.id);
  };

  const {
    fileDialogOpen,
    fileDialogType,
    openFileDialog,
    closeFileDialog,
    processDialogclose,
    filename,
    setFilename,
    searchFileName,
    setSearchFileName,
  } = useFileDialog({
    openDocument: openLesson,
    saveDocument: saveLesson,
    saveDocumentAs: saveLessonAs,
  });

  const documents = lessons.map((lesson) => ({
    id: lesson.id,
    title: lesson.title,
    updatedAt: lesson.updated_at,
    contentVersion: lesson.content_version,
    previewText: extractPreviewText(lesson.content),
  }));

  const handleConfirm = async () => {
    await processDialogclose();
  };

  useEffect(() => {
    if (fileDialogOpen && fileDialogType === "openDocument") {
      void refetchLessons();
    }
  }, [fileDialogOpen, fileDialogType, refetchLessons]);

  return (
    <>
      <StyledEditorTemplate>
        <Ribbon
          editor={editor}
          openFileDialog={openFileDialog}
          openMediaDialog={openMediaDialog}
        />

        <div
          className="editor-shell"
          aria-label="Lesson editor body"
        >
          {editor ? <EditorContent editor={editor} /> : null}
        </div>
      </StyledEditorTemplate>

      <FileDialog
        type={fileDialogType}
        open={fileDialogOpen}
        onClose={closeFileDialog}
        onConfirm={handleConfirm}
        filename={filename}
        setFilename={setFilename}
        searchFileName={searchFileName}
        setSearchFileName={setSearchFileName}
        documents={documents}
        selectedDocumentId={selectedDocumentId}
        setSelectedDocumentId={setSelectedDocumentId}
      />

      {mediaDialogOpen ? (
        <MediaDialog
          open={mediaDialogOpen}
          initialMode={mediaDialogMode}
          onClose={closeMediaDialog}
          onUpload={handleMediaUpload}
          onUrlSubmit={handleMediaUrlSubmit}
        />
      ) : null}
    </>
  );
};

export default EditorTemplate;