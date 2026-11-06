import { StyledTab } from '../../settings/settings.styles';
import useSettings from '../../settings/useSettings';

const Tab = ({ label, isActive = false }: { label: string; isActive?: boolean }) => {
    
    const { handleTabChange } = useSettings();

    return (
        <StyledTab role="tab" aria-selected={isActive} aria-controls={label} onClick={() => handleTabChange(label)}>
            {label}
        </StyledTab>
    );
};

export default Tab;
