import { useState } from 'react';
import { TABS } from './settings.constants';
const useSettings = () => {
    
    const [activeTab, setActiveTab] = useState<string>(Object.values(TABS).find(tab => tab.initial)?.path || '');

    const isActiveTab = (tab: string) => activeTab === tab;

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    return {
        isActiveTab,
        handleTabChange,
        activeTab,
    };  
};

export default useSettings;
