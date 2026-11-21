const USER_SETTINGS_TABS = [
  { name: 'users', label: 'Users' },
  { name: 'notifications', label: 'Notifications' },
  { name: 'security', label: 'Security' },
]

const HEADLINES = {
  [USER_SETTINGS_TABS[0].name]: "User Settings",
  [USER_SETTINGS_TABS[1].name]: "Notification Settings",
  [USER_SETTINGS_TABS[2].name]: "Security Settings"
}

const DESCRIPTIONS = {
  [USER_SETTINGS_TABS[0].name]: "Select a user to view or edit their settings, or create a new user if none exist.",
  [USER_SETTINGS_TABS[1].name]: "Manage your notification preferences.",
  [USER_SETTINGS_TABS[2].name]: "Update your security settings, including password and two-factor authentication."
}

export  { USER_SETTINGS_TABS, HEADLINES, DESCRIPTIONS };