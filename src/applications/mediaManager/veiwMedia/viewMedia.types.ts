import type { MediaItem, MediaKind } from "../../../queries/useMediaQueries";
import type { dialogComponentProps } from "../../../sharedComponents/dialog/dialog.types";
import type React from "react";

interface ViewMediaProps {
    media: MediaItem[];
    type: MediaKind;
    dialogRef: React.RefObject<HTMLDialogElement>;
    controls: dialogComponentProps["controls"];
}

export type { ViewMediaProps };
