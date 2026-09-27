import type React from "react";

export type FileDialogType =
  | "newDocument"
  | "openDocument"
  | "saveDocument"
  | "saveDocumentAs";

export interface FileDialogDocumentItem {
  id: string;
  title: string;
  updatedAt?: string;
  contentVersion?: number;
  previewText?: string;
}

export interface FileDialogProps {
  type: FileDialogType;
  dialogRef: React.RefObject<HTMLDialogElement>;
  controls: {
    isDialogOpen: boolean;
    toggleDialog: () => void;
    closeDialog: () => void;
  };
  onConfirm: () => void | Promise<void>;
  filename: string;
  setFilename: (value: string) => void;
  searchFileName: string;
  setSearchFileName: (value: string) => void;
  documents?: FileDialogDocumentItem[];
  selectedDocumentId?: string | null;
  setSelectedDocumentId?: (id: string) => void;
}

export interface FileDialogState {
  isOpen: boolean;
}