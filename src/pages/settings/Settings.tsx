import { useEffect, useRef } from 'react';
import { TABS } from './settings.constants';
import useSettings from './useSettings';
import { AISettings, GeneralSettings } from './pages';
import Render from '../../sharedComponents/Render';
import Ribbon from './components/Ribbon';
import { StyledSettingsWrapper } from './settings.styles';
import Button from '../../sharedComponents/Button/Button';
import SVGIcon from '../../sharedComponents/SVG/SVGIcon';
import NewAIForm from './pages/AISettings/components/newAIForm/NewAIForm';
import useAISettings from './pages/AISettings/useAISettings';
import useRightSidebar from '../../templates/useRightSidebar';

const Settings = () => {
  const { activeTab, handleTabChange } = useSettings();
  const { connections, editConnection, deleteConnection, startNewConnection, saveConnection, closeForm, isFormOpen, editingConnection } = useAISettings();
  const { setRightSidebarContent, openRightSideBar, rightSideBarOpen } = useRightSidebar();
  const prevSidebarStateRef = useRef(rightSideBarOpen);

  const isAISettingsActive = activeTab === TABS.AI_SETTINGS.path;

  useEffect(() => {
    if (!isAISettingsActive || !isFormOpen) {
      setRightSidebarContent(null);
      return;
    }

    setRightSidebarContent(
      <NewAIForm
        key={editingConnection?.id ?? 'new'}
        initialConnection={editingConnection}
        onSave={saveConnection}
        onCancel={closeForm}
      />,
    );
    openRightSideBar();
  }, [closeForm, editingConnection, isFormOpen, saveConnection, isAISettingsActive, openRightSideBar, setRightSidebarContent]);

  useEffect(() => {
    const sidebarWasClosedByUser = prevSidebarStateRef.current && !rightSideBarOpen;
    if (sidebarWasClosedByUser && isFormOpen) {
      closeForm();
    }
    prevSidebarStateRef.current = rightSideBarOpen;
  }, [rightSideBarOpen, isFormOpen, closeForm]);

  useEffect(() => () => setRightSidebarContent(null), [setRightSidebarContent]);

  const changeTab = (tab: string) => {
    if (tab !== TABS.AI_SETTINGS.path && isFormOpen) closeForm();
    handleTabChange(tab);
  };

  return (
    <StyledSettingsWrapper>
      <Ribbon activeTab={activeTab} handleTabChange={changeTab}>
        <Render if={isAISettingsActive}>
          <Button type="button" color="success" onClick={startNewConnection}>
            <SVGIcon icon="plus" /> Add Connection
          </Button>
        </Render>
      </Ribbon>
      <Render if={isAISettingsActive}>
        <AISettings
          connections={connections}
          editConnection={editConnection}
          deleteConnection={deleteConnection}
        />
      </Render>
      <Render if={activeTab === TABS.GENERAL.path}>
        <GeneralSettings />
      </Render>
    </StyledSettingsWrapper>
  );
};

export default Settings;
