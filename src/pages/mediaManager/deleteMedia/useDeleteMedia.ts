import { useState } from "react";
import type { MediaItem } from "../../../applications/media";
import type { useDeleteItemProps } from "./deleteMedia.types";

const useDeleteMedia = ({ items, onDelete, controls }: useDeleteItemProps) => {
    
    const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);

    const [deleteList, setDeleteList] = useState(items);

    const { closeDialog } = controls;

    const handleDelete = async () => {
        setDeleteButtonDisabled(true);
        await onDelete(deleteList.map((item) => item.id));
        setDeleteList([]);
        setDeleteButtonDisabled(false);
        closeDialog();
    };

    const removeFromDeleteList = (id: MediaItem["id"]) => {
        setDeleteList((previousItems) => previousItems.filter((item) => item.id !== id));
        if (deleteList.length <= 1) {
            closeDialog();
        }
    };

    return {
        deleteButtonDisabled,
        handleDelete,
        deleteList,
        removeFromDeleteList,
    };

};

export default useDeleteMedia;
