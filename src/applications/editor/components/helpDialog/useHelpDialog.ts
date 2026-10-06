import { useCallback, useState } from "react";
import { HELP_DIALOG_TABS } from "./constants";

const useHelpDialog = () => {
  const [activeTab, setActiveTab] = useState(HELP_DIALOG_TABS[0].id);
  
  const handleTabClick = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  return {
    HELP_DIALOG_TABS,
    activeTab,
    handleTabClick,
  };
};

export default useHelpDialog;