import type { Level } from "@tiptap/extension-heading";

type RibbonGroup =
  | "document"
  | "clipboard"
  | "text"
  | "structure"
  | "insert"
  | "other";

type RibbonMenuItem = {
  label: string;
  value: string;
  action?: string;
  level?: Level;
  fontFamily?: string;
  fontSize?: string;
  group?: RibbonGroup;
};

type RibbonAction = NonNullable<RibbonMenuItem["action"]>;

export type {
  RibbonAction,
  RibbonGroup,
  RibbonMenuItem,
};