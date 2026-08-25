import Render from "../../../../../sharedComponents/Render";
import { StyledEditorRibbonItem } from "../Ribbon.styles";
import { getRibbonIcon } from "../RibbonIcons";

interface RibbonItemProps {
  icon?: string | undefined;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}



const RibbonItem = ({ icon, label, onClick, isActive = false }: RibbonItemProps) => {

  return (
    <StyledEditorRibbonItem $isActive={isActive} onClick={onClick} role="button" tabIndex={0} aria-label={label} aria-pressed={isActive}>
      <div className="item-wrapper">
        <Render if={!!icon}>
          {getRibbonIcon(icon)}
        </Render>
        <span className="ribbon-item-label">{label}</span>
      </div>
    </StyledEditorRibbonItem>
  );
};

export default RibbonItem;