import type { SVGIconName } from "../../../../../sharedComponents/SVG/SVGIcon";
import { StyledEditorRibbonItem } from "../Ribbon.styles";
import SVGIcon from "../../../../../sharedComponents/SVG/SVGIcon";

interface RibbonItemProps {
  icon?: SVGIconName;
  label: string;
  onClick: () => void;
  isActive?: boolean;
}

const RibbonItem = ({
  icon,
  label,
  onClick,
  isActive = false,
}: RibbonItemProps) => {
  return (
    <StyledEditorRibbonItem
      $isActive={isActive}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-pressed={isActive}
    >
      <div className="item-wrapper">
        {icon ? (
          <SVGIcon icon={icon} />
        ) : (
          <span className="ribbon-item-placeholder" />
        )}

        <span className="ribbon-item-label">
          {label}
        </span>
      </div>
    </StyledEditorRibbonItem>
  );
};

export default RibbonItem;