import { TABS } from './settings.constants';
import useSettings from './useSettings';
import { AISettings, GeneralSettings } from './pages';
import Render from '../../sharedComponents/Render';
import Ribbon from './components/Ribbon';
import { StyledSettingsWrapper } from './settings.styles';
import Button from '../../sharedComponents/Button/Button';
import SVGIcon from '../../sharedComponents/SVG/SVGIcon';

const Settings = () => {
  const { activeTab, handleTabChange, isAISettingsActive, aiSettings } = useSettings();
  const { isFormOpen, startNewConnection, connections, editConnection, deleteConnection } = aiSettings;

  return (
    <StyledSettingsWrapper>
      <Ribbon activeTab={activeTab} handleTabChange={handleTabChange}>
        {isAISettingsActive && !isFormOpen && (
          <Button type="button" color="success" onClick={startNewConnection}>
            <SVGIcon icon="plus" /> Add Connection
          </Button>
        )}
      </Ribbon>
      <Render if={isAISettingsActive}>
        <AISettings
          connections={connections}
          isFormOpen={isFormOpen}
          isLoading={aiSettings.isLoading}
          loadError={aiSettings.loadError}
          operationError={aiSettings.operationError}
          startNewConnection={startNewConnection}
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
