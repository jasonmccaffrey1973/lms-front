import type { Level } from "@tiptap/extension-heading";
import type { SVGIconName } from "../../../../sharedComponents/SVG/SVGIcon";

type SelectOption = {
  label: string;
  value: string;
};

type RibbonGroup =
  | "document"
  | "clipboard"
  | "text"
  | "structure"
  | "insert"
  | "layout"
  | "review"
  | "view"
  | "help"
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
  | "unsetLink"
  | "setMargins"
  | "setOrientation"
  | "checkSpellingGrammar"
  | "toggleTrackChanges"
  | "setZoom"
  | "toggleFullScreen"
  | "openHelp"
  | "openAbout";

type RibbonMenuItem = {
  label: string;
  value: string;
  elementType?: "button" | "select" | "checkbox" | "radio" | "link" | "list";
  action?: RibbonAction;
  icon?: SVGIconName;
  level?: Level;
  fontFamily?: string;
  fontSize?: string;
  group?: RibbonGroup;
  options?: readonly SelectOption[] | SelectOption[];
};

type RibbonActionHandlers = {
  newDocument: () => void;
  openDocument: () => void;
  saveDocument: () => void;
  saveDocumentAs: () => void;
};

export type { SelectOption, RibbonGroup, RibbonAction, RibbonMenuItem, RibbonActionHandlers };