// Type definitions extracted from constants.ts for better organization and exportability

import type { EDITOR_TABS } from "../constants";
import type { SVGIconName } from "../sharedComponents/SVG/SVGIcon";

/** ------------------------------------------------------------------------------------
 * Represents a tab in the editor ribbon.
 * ------------------------------------------------------------------------------------- */
type EditorTab = (typeof EDITOR_TABS)[keyof typeof EDITOR_TABS]["value"];

interface RibbonItemProps {
  icon?: SVGIconName;
  label: string;
  onClick: (val?: string) => void; // Allow optional value parameter
  isActive?: boolean;
  elementType?: "button" | "select" | "checkbox" | "radio" | "link" | "list";
  type?: string;
}


export type { EditorTab, RibbonItemProps };