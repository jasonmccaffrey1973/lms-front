interface RibbonTabProps {
    activeTab: string;
    handleTabChange: (tab: string) => void;
    children?: React.ReactNode;
}

export type { RibbonTabProps };