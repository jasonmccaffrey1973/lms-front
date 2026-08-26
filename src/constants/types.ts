// Type definitions extracted from constants.ts for better organization and exportability

import type { EDITOR_TABS } from "../constants";

/** ------------------------------------------------------------------------------------
 * Represents a tab in the editor ribbon.
 * ------------------------------------------------------------------------------------- */
type EditorTab = (typeof EDITOR_TABS)[keyof typeof EDITOR_TABS]["value"];


export type { EditorTab };