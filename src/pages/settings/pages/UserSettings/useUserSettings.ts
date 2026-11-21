import { useState } from 'react';
import { USER_SETTINGS_TABS } from './userSettings.constants';
import type { UserTabNames } from './userSettings.types';

const useUserSettings = () => {
  const [userActiveTab, setUserActiveTab] = useState(USER_SETTINGS_TABS[0].name);

  const handleTabChange = (tabName: UserTabNames) => {
    setUserActiveTab(tabName);
  };

  return {
    userActiveTab,
    handleTabChange
  };
};

export default useUserSettings;