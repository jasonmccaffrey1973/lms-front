import { useState } from "react"

const useVideoProduction = (initialTab: string) => {
	const [activeTab, setActiveTab] = useState(initialTab ?? 'characters')

    const handleTabChange = (tab: string) => {
        setActiveTab(tab.toLowerCase())
    }

    return {
        activeTab,
        handleTabChange
    }   
}

export default useVideoProduction