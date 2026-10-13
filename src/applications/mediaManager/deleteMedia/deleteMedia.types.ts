import type { dialogComponentProps } from "../../../sharedComponents/dialog/dialog.types";
import type { MediaItem } from "../../../queries/useMediaQueries";


interface DeleteMediaProps {
  dialogRef: dialogComponentProps["dialogRef"];
  controls: dialogComponentProps["controls"];
  items: MediaItem[];
  onDelete: (ids: MediaItem["id"][]) => void | Promise<void>;
}

interface DeleteListItemProps {
    item: MediaItem;
    removeFromDeleteList: (id: MediaItem["id"]) => void;
}

interface useDeleteItemProps {
    items: MediaItem[];
    onDelete: (ids: MediaItem["id"][]) => void | Promise<void>;
    controls: { isDialogOpen: boolean; closeDialog: () => void };
}

type DeleteItem = MediaItem["id"];


export type { DeleteMediaProps, DeleteListItemProps, DeleteItem, useDeleteItemProps };
