import { useEditor as useTiptapEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";

const useEditor = () =>
  useTiptapEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Underline,
      TextStyle,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: "<p>Start writing here...</p>",
    editorProps: {
      attributes: {
        class: "editor-shell__content",
      },
    },
  });

export default useEditor;