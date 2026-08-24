import Render from "../../../../../sharedComponents/Render";
import { StyledEditorRibbonItem } from "../Ribbon.styles";

interface RibbonItemProps {
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
}

const RibbonItem = ({ icon, label, onClick }: RibbonItemProps) => {
  return (
    <StyledEditorRibbonItem onClick={onClick} role="button" tabIndex={0} aria-label={label}>
      <div className="item-wrapper">
        <Render if={!!icon}>
          <span className="ribbon-item-icon">{icon}</span>
        </Render>
        <span className="ribbon-item-label">{label}</span>
      </div>
    </StyledEditorRibbonItem>
  );
};

export default RibbonItem;