import { useCallback, useEffect, useRef, useState } from 'react';
import { TABS } from './settings.constants';
import useAISettings from './pages/AISettings/useAISettings';
import NewAIForm from './pages/AISettings/components/newAIForm/NewAIForm';
import useRightSidebar from '../../templates/useRightSidebar';

const useSettings = () => {
  const [activeTab, setActiveTab] = useState<string>(Object.values(TABS).find((tab) => tab.initial)?.path ?? '');
  const aiSettings = useAISettings();
  const { setRightSidebarContent, openRightSideBar, rightSideBarOpen } = useRightSidebar();
  const previousSidebarState = useRef(rightSideBarOpen);

  const isAISettingsActive = activeTab === TABS.AI_SETTINGS.path;
  const isActiveTab = useCallback((tab: string) => activeTab === tab, [activeTab]);

  const handleTabChange = useCallback((tab: string) => {
    if (tab !== TABS.AI_SETTINGS.path && aiSettings.isFormOpen) {
      aiSettings.closeForm();
    }
    setActiveTab(tab);
  }, [aiSettings.closeForm, aiSettings.isFormOpen]);

  useEffect(() => {
    if (!isAISettingsActive || !aiSettings.isFormOpen) {
      setRightSidebarContent(null);
      return;
    }

    setRightSidebarContent(
      <NewAIForm
        key={aiSettings.editingConnection?.id ?? 'new'}
        initialConnection={aiSettings.editingConnection}
        onSave={aiSettings.saveConnection}
        onCancel={aiSettings.closeForm}
        isSaving={aiSettings.isSaving}
        saveError={aiSettings.operationError}
      />,
    );
    openRightSideBar();
  }, [aiSettings.closeForm, aiSettings.editingConnection, aiSettings.isFormOpen, aiSettings.isSaving, aiSettings.operationError, aiSettings.saveConnection, isAISettingsActive, openRightSideBar, setRightSidebarContent]);

  useEffect(() => {
    const sidebarWasClosedByUser = previousSidebarState.current && !rightSideBarOpen;
    if (sidebarWasClosedByUser && aiSettings.isFormOpen) {
      aiSettings.closeForm();
    }
    previousSidebarState.current = rightSideBarOpen;
  }, [aiSettings.closeForm, aiSettings.isFormOpen, rightSideBarOpen]);

  useEffect(() => () => setRightSidebarContent(null), [setRightSidebarContent]);

  return {
    activeTab,
    isActiveTab,
    isAISettingsActive,
    handleTabChange,
    aiSettings,
  };
};

export default useSettings;
