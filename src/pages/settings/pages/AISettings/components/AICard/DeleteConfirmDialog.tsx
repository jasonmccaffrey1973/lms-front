import Dialog from '../../../../../../sharedComponents/dialog/Dialog';
import type { DeleteConfirmDialogProps } from './deleteConfirmDialog.types';

const DeleteConfirmDialog = ({ connectionName, dialogRef, isDialogOpen, onConfirm, onCancel }: DeleteConfirmDialogProps) => {
  const footerButtons = [
    {
      label: 'Cancel',
      onClick: onCancel,
      color: 'default',
      type: 'button' as const,
    },
    {
      label: 'Delete',
      onClick: onConfirm,
      color: 'danger',
      type: 'button' as const,
    },
  ];

  return (
    <Dialog
      title="Delete AI Connection"
      dialogRef={dialogRef}
      controls={{
        isDialogOpen,
        closeDialog: onCancel,
        toggleDialog: () => {},
      }}
      footerButtons={footerButtons}
    >
      <p>
        Are you sure you want to delete <strong>{connectionName}</strong>?
      </p>
      <p>This action cannot be undone.</p>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
