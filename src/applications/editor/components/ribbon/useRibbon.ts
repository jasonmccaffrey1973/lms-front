import type { Editor } from "@tiptap/core";
import { useState } from "react";
import { EDITOR_TABS, type EditorTab } from "../../../../constants";
import { executeRibbonAction, isRibbonItemActive } from "./RibbonActions";
import type { RibbonMenuItem } from "./RibbonTypes";

const DEFAULT_TAB = Object.values(EDITOR_TABS)[0]?.value as EditorTab;

const useRibbon = (editor: Editor | null) => {
  const [activeTab, setActiveTab] = useState<EditorTab>(DEFAULT_TAB);

  const handleRibbonTabChange = (tab: EditorTab) => {
    setActiveTab(tab);
  };

  const handleRibbonItemClick = (item: RibbonMenuItem) => {
    if (!editor) {
      return;
    }

    executeRibbonAction(editor, item);
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