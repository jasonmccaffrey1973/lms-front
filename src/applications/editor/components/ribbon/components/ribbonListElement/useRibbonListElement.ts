const useRibbonListElement = () => {
    const handleListItemClick = (action: string, value?: string) => {
        console.log(`Action: ${action}, Value: ${value}`);
    }

    return { handleListItemClick }
};

export default useRibbonListElement;