import { useState } from "react";
import { EDITOR_TABS } from "../../../../constants";

type EditorTab = (typeof EDITOR_TABS)[keyof typeof EDITOR_TABS]["value"];

const defaultTab = Object.values(EDITOR_TABS)[0]?.value as EditorTab;

const useRibbon = () => {
  const [activeTab, setActiveTab] = useState<EditorTab>(defaultTab);

  const handleRibbonTabChange = (tab: EditorTab) => {
    setActiveTab(tab);
  };

  const handleRibbonItemClick = (itemLabel: string) => {
    console.log(`Ribbon item clicked: ${itemLabel}`);
  };

  return {
    activeTab,
    handleRibbonTabChange,
    handleRibbonItemClick,
  };
};

export default useRibbon;