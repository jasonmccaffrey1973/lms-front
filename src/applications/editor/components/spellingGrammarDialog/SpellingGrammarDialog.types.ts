import type React from "react";
import type { Editor } from "@tiptap/core";

export interface SpellingGrammarDialogProps {
  editor: Editor | null;
  dialogRef: React.RefObject<HTMLDialogElement>;
  controls: {
    isDialogOpen: boolean;
    toggleDialog: () => void;
    closeDialog: () => void;
  };
}

