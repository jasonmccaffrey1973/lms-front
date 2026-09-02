import type { ReactNode } from "react";
import type { SVGIconName } from "../SVG/SVGIcon";


export interface ButtonDropDownProps {
  label: string;
  icon?: SVGIconName;
  value?: string;
  isActive?: boolean;
  /** Primary action when clicking the main button area (e.g., apply current color) */
  onPrimaryAction?: (value?: string) => void;
  /** Custom dropdown content (e.g., ColorPicker, LinkForm, MenuList) */
  children: ReactNode;
}