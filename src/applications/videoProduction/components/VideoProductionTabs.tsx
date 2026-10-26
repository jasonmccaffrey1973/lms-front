import { Link } from "react-router-dom";
import Button from "../../../sharedComponents/Button/Button";
import { TABS } from "../constants";
import SVGIcon from "../../../sharedComponents/SVG/SVGIcon";

/** -------------------------------------------------------------------------------
 * @param activeTab The currently active tab.
 * @returns A list of tabs with the currently active tab highlighted.
 * @example 
 * <VideoProductionTabs activeTab="overview" />
 ** ------------------------------------------------------------------------------- */
const VideoProductionTabs = ({ activeTab, onAddClick } : { activeTab: string; onAddClick: () => void }) => {

    const activeTabSingular = activeTab[activeTab.length - 1] !== "s" ? activeTab : activeTab.slice(0, -1);

    /** ------------------------------------------------------------------------------- 
     * A functional component that renders a list item representing a tab.
     * @param tab The tab identifier.
     * @param label The label to display for the tab.
     * @param active A boolean indicating if the tab is currently active.
     * @returns A list item representing a tab with a button to switch tabs.
     ** ------------------------------------------------------------------------------- */ 
    const Tab = ({ tab, label, active }: { tab: string, label: string, active: boolean  }) => (
        <li role="tab" key={tab} aria-selected={active}>
            <Button color={active ? "primary" : "transparent"}>
                {label}
            </Button>
        </li>
    );

    return (
        <ul role="tablist">
            <span className="left-area">
                {Object.entries(TABS).map(([tab, { label, link }]) => (
                    <Link key={tab} to={link}>
                        <Tab tab={tab} label={label} active={activeTab.toLowerCase() === tab.toLowerCase()} />
                    </Link>
                ))}
            </span>
            <span className="right-area">
                <Button color="success" onClick={onAddClick}>
                    <SVGIcon icon="plus" /> Add New {activeTabSingular || ""}
                </Button>

            </span>
        </ul>
    )
}

export default VideoProductionTabs
