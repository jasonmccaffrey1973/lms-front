import SVGIcon, { type SVGIconName } from "../../../../../sharedComponents/buttons/SVG/SVGIcon";
import Render from "../../../../../sharedComponents/Render";
import { StyledEditorRibbonItem } from "../Ribbon.styles";

interface RibbonItemProps {
  icon: SVGIconName;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

const RibbonItem = ({ icon, label, onClick, isActive = false }: RibbonItemProps) => {

  return (
    <StyledEditorRibbonItem $isActive={isActive} onClick={onClick} role="button" tabIndex={0} aria-label={label} aria-pressed={isActive}>
      <div className="item-wrapper">
        <Render if={!!icon}>
          <SVGIcon icon={icon} />
        </Render>
        <Render if={!icon}>
          <span className="ribbon-item-placeholder" />
        </Render>
        <span className="ribbon-item-label">{label}</span>
      </div>
    </StyledEditorRibbonItem>
  );
};

export default RibbonItem;