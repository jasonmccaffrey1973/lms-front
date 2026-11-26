import { USER_SETTINGS_TABS } from './userSettings.constants';

interface UserTab {
  name: string;
  label: string;
}

type UserTabs = UserTab[];

type UserTabNames = (typeof USER_SETTINGS_TABS)[number]['name'];

export type { UserTab, UserTabs, UserTabNames }