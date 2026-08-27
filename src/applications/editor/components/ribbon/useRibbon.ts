import type { Editor } from "@tiptap/core";
import { useState } from "react";

import {
  EDITOR_TABS,
  type EditorTab,
} from "../../../../constants";

import {
  executeRibbonAction,
  isRibbonItemActive,
} from "./RibbonActions";

import type { FileDialogType } from "../fileDialog/fileDialog.types";
import type { RibbonMenuItem } from "./RibbonTypes";

const DEFAULT_TAB =
  Object.values(EDITOR_TABS)[0]?.value as EditorTab;

const useRibbon = (
  editor: Editor | null,
  openFileDialog: (type: FileDialogType) => void,
) => {
  const [activeTab, setActiveTab] =
    useState<EditorTab>(DEFAULT_TAB);

  const handleRibbonTabChange = (tab: EditorTab) => {
    setActiveTab(tab);
  };

  const handleRibbonItemClick = (item: RibbonMenuItem) => {
    if (!editor) {
      return;
    }

    executeRibbonAction(editor, item, {
      newDocument: () => {
        openFileDialog("newDocument");
      },

      openDocument: () => {
        openFileDialog("openDocument");
      },

      saveDocument: () => {
        openFileDialog("saveDocument");
      },

      saveDocumentAs: () => {
        openFileDialog("saveDocumentAs");
      },
    });
  };

  return {
    activeTab,
    handleRibbonTabChange,
    handleRibbonItemClick,

    isItemActive: (item: RibbonMenuItem) =>
      isRibbonItemActive(editor, item),
  };
};

export default useRibbon;