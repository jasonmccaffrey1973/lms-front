
import type { Editor as TiptapEditor, JSONContent } from "@tiptap/core";
import type { MediaKind } from "../../media/types";

/**
 * Props for the EditorTemplate component.
 */
interface EditorTemplateProps {
  editor: TiptapEditor | null;
}

/**
 * Arguments used when uploading media into the editor.
 */
interface HandleMediaUploadArgs {
  mode: MediaKind;
  files: File[];
  altText: string;
}

/**
 * Arguments used when adding media from a URL.
 */
interface HandleMediaUrlSubmitArgs {
  mode: MediaKind;
  url: string;
  altText: string;
}

/**
 * Content accepted by the lesson editor.
 *
 * Lesson content may be persisted as either Tiptap JSON
 * or a JSON string returned from the API.
 */
type LessonContent = JSONContent | string;

/**
 * A sanitized ProseMirror/Tiptap node.
 */
type SanitizedProseMirrorNode = JSONContent | null;

export type { EditorTemplateProps, HandleMediaUploadArgs, HandleMediaUrlSubmitArgs, LessonContent, SanitizedProseMirrorNode };