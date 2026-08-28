export type FileDialogType =
  | "newDocument"
  | "openDocument"
  | "saveDocument"
  | "saveDocumentAs";

export interface FileDialogProps {
  type: FileDialogType;
  open: boolean;
  popover?: boolean;
  onClose: () => void;
}

export interface FileDialogState {
  isOpen: boolean;
}