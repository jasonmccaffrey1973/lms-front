import { StyledTab } from '../../settings/settings.styles';

const Tab = ({ label, isActive = false, onClick }: { label: string; isActive?: boolean; onClick?: () => void }) => {
    

    return (
        <StyledTab role="tab" aria-selected={isActive} aria-controls={label} onClick={onClick}>
            {label}
        </StyledTab>
    );
};

export default Tab;
