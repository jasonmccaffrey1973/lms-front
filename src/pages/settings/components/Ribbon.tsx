import { TABS } from '../../settings/settings.constants';
import type { RibbonTabProps } from '../../settings/settings.types';
import { StyledTabWrapper } from '../../settings/settings.styles';
import Tab from './Tab';

const Ribbon = ({ activeTab, handleTabChange, children }: RibbonTabProps) => {
    
    const orderedTabs = Object.values(TABS).sort((a, b) => a.tabOrder - b.tabOrder);

    return (
        <div className="ribbon">
            <StyledTabWrapper>
                {orderedTabs.map((tab) => (
                    <Tab key={tab.label} label={tab.label} isActive={activeTab === tab.path} onClick={() => handleTabChange(tab.path)} />
                ))}
                {children && <li className="tab-actions">{children}</li>}
            </StyledTabWrapper>
        </div>
    );
}

export default Ribbon;
