import type React from "react";
import type { Editor } from "@tiptap/core";

export interface TrackedChangeItem {
  id: string;
  type: "insertion" | "deletion";
  author: string;
  createdAt: string;
  text: string;
  from: number;
  to: number;
}

export interface TrackChangesDialogProps {
  editor: Editor | null;
  dialogRef: React.RefObject<HTMLDialogElement>;
  controls: {
    isDialogOpen: boolean;
    toggleDialog: () => void;
    closeDialog: () => void;
  };
  currentUser?: {
    name: string;
    id?: string;
  };
}

