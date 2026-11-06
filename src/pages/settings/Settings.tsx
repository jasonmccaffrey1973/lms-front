import { TABS } from "./settings.constants";
import useSettings from "./useSettings";
import { AISettings } from "./pages"
import Render from "../../sharedComponents/Render";
import Ribbon from "./components/Ribbon";
import {StyledSettingsWrapper} from "./settings.styles";

const Settings = () => {
  const { activeTab } = useSettings();

  return (
    <StyledSettingsWrapper>
      <Ribbon  activeTab={activeTab} />
      <Render if={activeTab === TABS.AI_SETTINGS}>
        <AISettings />

      </Render>
    </StyledSettingsWrapper>
  )
}

export default Settings;