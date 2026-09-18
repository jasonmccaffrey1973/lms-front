import type { dialogComponentProps } from "../../sharedComponents/dialog/dialog.types";
import type { SVGIconName } from "../../sharedComponents/SVG/SVGIcon";
import type { RIBBON_ICONS } from "./mediaManager.constants";

type MediaType = "image" | "video" | "audio";

type RibbonAction = "Delete" | "Add" | "View" | "Bulk" | "Edit";

type ContextElement = {
  label: string;
  type: string;
  action?: () => void ;
};
  
interface RibbonIcon {
      icon: SVGIconName;
      action: RibbonAction;
}

type MediaTabProps = {
  type: string;
  selectedType?: string;
  action?: () => void;
};

type NoMediaUploadedProps = {
  selectedTab: string;
  performRibbonAction: Record<string, (() => void) | undefined>;
};

type MediaManagerUploadDialogProps = Pick<
  dialogComponentProps,
  "dialogRef" | "closeDialog" | "controls"
> & {
  isBulkUpload: boolean;
  selectedTab: string;
};

type MediaTab = keyof typeof RIBBON_ICONS;
    
export type { 
  MediaType,
  RibbonIcon,
  RibbonAction,
  ContextElement,
  MediaTabProps,
  NoMediaUploadedProps,
  MediaManagerUploadDialogProps,
  MediaTab
};