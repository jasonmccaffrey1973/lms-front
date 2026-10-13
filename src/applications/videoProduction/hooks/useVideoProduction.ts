const useVideoProduction = (initialTab: string) => {
    const activeTab = (initialTab ?? 'characters').toLowerCase()

    return {
        activeTab
    }   
}

export default useVideoProduction