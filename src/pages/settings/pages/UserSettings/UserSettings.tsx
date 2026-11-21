import { StyledUserSettingsPage } from "./userSettings.styles"
import {
  UserSettingsContent,
  UserSettingsFooter,
  UserSettingsHeader,
  UserSettingsSidebar
} from "./components"
import useUserSettings from "./useUserSettings"

const UserSettings = () => {

  const {userActiveTab, handleTabChange} = useUserSettings()

  return (
    <StyledUserSettingsPage>
      <UserSettingsHeader userActiveTab={userActiveTab} />
      <UserSettingsSidebar userActiveTab={userActiveTab} handleTabChange={handleTabChange} />
      <UserSettingsContent userActiveTab={userActiveTab} />
      <UserSettingsFooter />
    </StyledUserSettingsPage>
  )
}

export default UserSettings