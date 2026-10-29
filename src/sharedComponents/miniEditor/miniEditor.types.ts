import type { CSSProperties } from "react";

export interface MiniEditorProps {
  /** Optional visible and accessible label for the editable surface. */
  label?: string;
  /** Position of the label relative to the toolbar and editable surface. */
  labelPlacement?: "top" | "start";
  /** HTML value synchronized with the parent-owned textarea. */
  value: string;
  /** Called with the editor's HTML whenever its document changes. */
  onChange: (html: string) => void;
  /** Height of the editable surface. Defaults to 240px. */
  height?: CSSProperties["height"];
}
