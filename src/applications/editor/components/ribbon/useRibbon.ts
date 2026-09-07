import type { Editor } from "@tiptap/core";

import type { EditorTab } from "../../../../constants/types";

import {
  executeRibbonAction,
  isRibbonItemActive,
} from "./RibbonActions";

import type { FileDialogType } from "../fileDialog/fileDialog.types";
import type { RibbonMenuItem } from "./Ribbon.types";
import { getRibbonItemValue, useEditorState } from "../../EditorState";

const useRibbon = (
  editor: Editor | null,
  openFileDialog: (type: FileDialogType) => void,
) => {
  const { selection, activeTab, setActiveTab } = useEditorState();

  const handleRibbonTabChange = (tab: EditorTab) => {
    setActiveTab(tab);
  };

  const handleRibbonItemClick = (item: RibbonMenuItem) => {
    if (!editor) {
      return;
    }

    const enrichedItem =
      item.action === "setFontFamily" || item.action === "setFontSize"
        ? {
            ...item,
            ...(item.action === "setFontFamily" ? { fontFamily: item.value } : {}),
            ...(item.action === "setFontSize" ? { fontSize: item.value } : {}),
          }
        : item;

    executeRibbonAction(editor, enrichedItem, {
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

    getItemValue: (item: RibbonMenuItem) =>
      getRibbonItemValue(item, selection),
  };
};

export default useRibbon;