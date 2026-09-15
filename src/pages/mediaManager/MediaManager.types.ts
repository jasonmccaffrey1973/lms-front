import type { SVGIconName } from "../../sharedComponents/SVG/SVGIcon";

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
    export type { MediaType, RibbonIcon, RibbonAction, ContextElement };