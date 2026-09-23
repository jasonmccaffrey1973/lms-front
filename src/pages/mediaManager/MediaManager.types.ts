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

type RibbonGroups = "Upload" | "Selected";
  
interface RibbonIcon {
      icon: SVGIconName;
      action: RibbonAction;
      group: RibbonGroups;
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
  "dialogRef" | "controls"
> & {
  closeDialog: () => void;
  isBulkUpload: boolean;
  selectedTab: string;
  ACCEPT_BY_TYPE: Record<string, import("react-dropzone").Accept>;
  uploadSingleFileHandler: (
    file: File,
    onProgress: (pct: number) => void,
    signal: AbortSignal
  ) => Promise<unknown>;
  onAllUploadsComplete: () => void;
};

type MediaTab = keyof typeof RIBBON_ICONS;
interface RibbonIcon {
    icon: SVGIconName;
    action: RibbonAction;
    group: RibbonGroups;
}

type GroupedRibbonIcons = Partial<
    Record<RibbonGroups, RibbonIcon[]>
>;
  
type GroupedRibbonActions = Record<
    string,
    Record<string, RibbonAction[]>
>;
    
export type { 
  MediaType,
  GroupedRibbonIcons,
  GroupedRibbonActions,
  RibbonIcon,
  RibbonAction,
  RibbonGroups,
  ContextElement,
  MediaTabProps,
  NoMediaUploadedProps,
  MediaManagerUploadDialogProps,
  MediaTab,
};
