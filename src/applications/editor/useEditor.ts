import { useEditor as useTiptapEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const useEditor = () =>
  useTiptapEditor({
    extensions: [StarterKit],
    content: "<p>Start writing here...</p>",
    editorProps: {
      attributes: {
        class: "editor-shell__content",
      },
    },
  });

export default useEditor;