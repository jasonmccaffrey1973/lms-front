import { TABS } from "./settings.constants";
import useSettings from "./useSettings";
import { AISettings, GeneralSettings } from "./pages"
import Render from "../../sharedComponents/Render";
import Ribbon from "./components/Ribbon";
import {StyledSettingsWrapper} from "./settings.styles";

const Settings = () => {
  const { activeTab, handleTabChange } = useSettings();

  return (
    <StyledSettingsWrapper>
      <Ribbon  activeTab={activeTab} handleTabChange={handleTabChange} />
      <Render if={activeTab === TABS.AI_SETTINGS.path}>
        <AISettings />
      </Render>
      <Render if={activeTab === TABS.GENERAL.path}>
        <GeneralSettings />
      </Render>
    </StyledSettingsWrapper>
  )
}

export default Settings;
