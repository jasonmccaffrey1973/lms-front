import { HEADLINES, DESCRIPTIONS } from "../../userSettings.constants";

const UserSettingsHeader = ({ userActiveTab }: { userActiveTab: string }) => {
  return (
    <div className="user-settings-header">
      <h2>{HEADLINES[userActiveTab]}</h2>
      <p>{DESCRIPTIONS[userActiveTab]}</p>
    </div>
  )
}

export default UserSettingsHeader