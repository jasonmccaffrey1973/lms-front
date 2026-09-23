import type { ViewMediaProps } from "./viewMedia.types";

const useViewMedia = ({media, type, controls}: ViewMediaProps) => {

    const dialogTitle = (() => {
        switch (type) {
            case "image":
                return "View Image";
            case "video":
                return "View Video";
            case "audio":
                return "View Audio";
            default:
                return "View Media";
        }
    }) ();


    const numberOfMediaItems = (() => media.length)();

    const footerButtons = [
        {
            label: "Close",
            onClick: controls.closeDialog,
            color: "primary"
        }
    ] satisfies import("../../../sharedComponents/dialog/dialog.types").dialogFooterButton[];

    return {
        dialogTitle,
        numberOfMediaItems,
        footerButtons,
        controls,
    };
};

export default useViewMedia;
