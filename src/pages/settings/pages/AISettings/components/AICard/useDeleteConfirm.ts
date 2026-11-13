import { useRef } from 'react';
import useDialog from '../../../../../../sharedComponents/dialog/useDialog';

interface UseDeleteConfirmProps {
  connectionName: string;
  onConfirmDelete: () => void;
}

const useDeleteConfirm = ({ connectionName, onConfirmDelete }: UseDeleteConfirmProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const { isDialogOpen, openDialog, closeDialog } = useDialog({ ref: dialogRef });

  const handleConfirmDelete = () => {
    onConfirmDelete();
    closeDialog();
  };

  return {
    dialogRef,
    isDialogOpen,
    openDialog,
    closeDialog,
    handleConfirmDelete,
    connectionName,
  };
};

export default useDeleteConfirm;


