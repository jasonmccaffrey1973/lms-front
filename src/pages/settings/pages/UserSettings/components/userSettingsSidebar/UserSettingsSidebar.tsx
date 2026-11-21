import { USER_SETTINGS_TABS } from '../../userSettings.constants'


const UserSettingsSidebar = ({userActiveTab, handleTabChange}: {userActiveTab: string, handleTabChange: (tabName: string) => void}) => {
    
  return (
    <div className="user-settings-sidebar">
      {USER_SETTINGS_TABS.map(tab => (
        <button
          key={tab.name}
          className={userActiveTab === tab.name ? 'active' : ''}
          onClick={() => handleTabChange(tab.name)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default UserSettingsSidebar