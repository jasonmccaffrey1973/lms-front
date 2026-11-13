import type React from 'react';

export interface DeleteConfirmDialogProps {
  connectionName: string;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  isDialogOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}
