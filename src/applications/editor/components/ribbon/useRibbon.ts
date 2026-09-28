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
  openMediaDialog: (mode: "image" | "video") => void,
  openSpellingGrammarDialog?: () => void,
  openTrackChangesDialog?: () => void,
) => {
  const { selection, activeTab, setActiveTab, zoomLevel, setZoomLevel } = useEditorState();

  const handleRibbonTabChange = (tab: EditorTab) => {
    setActiveTab(tab);
  };

  const handleRibbonItemClick = (item: RibbonMenuItem) => {
    if (item.action === "setZoom") {
      const nextZoom = Number(item.value);
      if (Number.isFinite(nextZoom)) {
        setZoomLevel(nextZoom);
      }
      return;
    }

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

      openMediaDialog,
      checkSpellingGrammar: openSpellingGrammarDialog,
      toggleTrackChanges: openTrackChangesDialog,
    });
  };

  return {
    activeTab,
    handleRibbonTabChange,
    handleRibbonItemClick,

    isItemActive: (item: RibbonMenuItem) =>
      isRibbonItemActive(editor, item),

    getItemValue: (item: RibbonMenuItem) =>
      getRibbonItemValue(item, selection, zoomLevel),
  };
};

export default useRibbon;
