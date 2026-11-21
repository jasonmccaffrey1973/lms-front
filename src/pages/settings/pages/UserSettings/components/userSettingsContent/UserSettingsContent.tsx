import DataGrid from "../../../../../../sharedComponents/DataGrid/DataGrid";
import Render from "../../../../../../sharedComponents/Render";
import { USER_SETTINGS_TABS } from "../../userSettings.constants";

const UserSettingsContent = ({ userActiveTab }: { userActiveTab: string }) => {
  return (
    <div className="user-settings-content">
      <Render if={userActiveTab === USER_SETTINGS_TABS[0].name}>
        <></>
      </Render>
      <Render if={userActiveTab === USER_SETTINGS_TABS[1].name}>
        <></>
      </Render>
      <Render if={userActiveTab === USER_SETTINGS_TABS[2].name}>
        <></>
      </Render>
      <DataGrid initialData={[]} />
    </div>
  )
}

export default UserSettingsContent