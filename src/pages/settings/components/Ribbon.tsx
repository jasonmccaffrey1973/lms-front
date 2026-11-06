import { TABS } from '../../settings/settings.constants';
import { StyledTabWrapper } from '../../settings/settings.styles';
import Tab from './Tab';

const Ribbon = ({ activeTab, children }: { activeTab: string; children?: React.ReactNode }) => (
    <div className="ribbon">
        <StyledTabWrapper>
            {Object.values(TABS).map((tab) => (
                <Tab key={tab} label={tab} isActive={activeTab === tab} />
            ))}
        </StyledTabWrapper>
        {children}
    </div>
);

export default Ribbon;