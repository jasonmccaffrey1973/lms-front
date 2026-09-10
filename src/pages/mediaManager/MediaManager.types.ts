import type { SVGIconName } from "../../sharedComponents/SVG/SVGIcon";

type MediaKind = "image" | "video" | "audio";

type RibbonIcon = {
  icon: SVGIconName;
  label: string;
  action: string;
};

export type { MediaKind, RibbonIcon };