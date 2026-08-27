import type { Level } from "@tiptap/extension-heading";
import type { SVGIconName } from "../../../../sharedComponents/buttons/SVG/SVGIcon";

type RibbonGroup =
  | "document"
  | "clipboard"
  | "text"
  | "structure"
  | "insert"
  | "other";

type RibbonAction =
  | "newDocument"
  | "openDocument"
  | "saveDocument"
  | "saveDocumentAs"
  | "undo"
  | "redo"
  | "copy"
  | "paste"
  | "toggleBold"
  | "toggleItalic"
  | "toggleUnderline"
  | "setTextColor"
  | "toggleHighlight"
  | "setFontFamily"
  | "setFontSize"
  | "toggleStrike"
  | "clearFormatting"
  | "toggleHeading"
  | "setParagraph"
  | "toggleBulletList"
  | "toggleOrderedList"
  | "toggleBlockquote"
  | "toggleCodeBlock"
  | "setTextAlignLeft"
  | "setTextAlignCenter"
  | "setTextAlignRight"
  | "setHorizontalRule"
  | "setHardBreak"
  | "insertImage"
  | "insertTable"
  | "toggleLink"
  | "unsetLink";

type RibbonMenuItem = {
  label: string;
  value: string;
  action?: RibbonAction;
  icon?: SVGIconName;
  level?: Level;
  fontFamily?: string;
  fontSize?: string;
  group?: RibbonGroup;
};

type RibbonActionHandlers = {
  newDocument: () => void;
  openDocument: () => void;
  saveDocument: () => void;
  saveDocumentAs: () => void;
};

export type {
  RibbonAction,
  RibbonGroup,
  RibbonActionHandlers,
  RibbonMenuItem,
};