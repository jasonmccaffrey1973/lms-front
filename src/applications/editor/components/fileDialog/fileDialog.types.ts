export type FileDialogType =
  | "newDocument"
  | "openDocument"
  | "saveDocument"
  | "saveDocumentAs";

export interface FileDialogProps {
  type: FileDialogType;
  open: boolean;
  onClose: () => void;
}

export interface FileDialogState {
  isOpen: boolean;
}