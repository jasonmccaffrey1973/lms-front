import { useEffect, useState } from "react";
import type { RefObject } from "react";

const useDialog = ({ ref }: { ref: RefObject<HTMLDialogElement> }) => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const openDialog = () => setIsDialogOpen(true);
    const closeDialog = () => setIsDialogOpen(false);
    const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

    useEffect(() => {
        if (isDialogOpen && ref.current) {
        ref.current.showModal();
        } else if (!isDialogOpen && ref.current) {
        ref.current.close();
        }
  }, [isDialogOpen, ref]);

  return {
    isDialogOpen,
    openDialog,
    closeDialog,
    toggleDialog,
  };
};

export default useDialog;