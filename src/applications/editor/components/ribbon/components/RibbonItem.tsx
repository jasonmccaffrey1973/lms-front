import { StyledEditorRibbonItem } from "../Ribbon.styles";
import SVGIcon, { type SVGIconName } from "../../../../../sharedComponents/SVG/SVGIcon";
import type { SelectOption } from "../RibbonTypes";
import RibbonSelect from "./ribbonSelect/RibbonSelect";

export interface RibbonItemProps {
  elementType?: "button" | "select" | "checkbox" | "radio" | "link" | "list";
  value: string;
  icon?: SVGIconName;
  label: string;
  action?: (val: string) => void;
  isActive?: boolean;
  options?: readonly SelectOption[] | SelectOption[];
}

const RibbonItem = ({
  elementType = "button",
  value,
  icon,
  label,
  action,
  isActive,
  options,
}: RibbonItemProps) => {
  if (elementType === "select") {
    return (
      <RibbonSelect
        value={value}
        label={label}
        options={options}
        onChange={(val) => action?.(val)}
      />
    );
  }

  return (
    <StyledEditorRibbonItem
      $isActive={isActive}
      onClick={() => action?.(value)}
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
        <span className="ribbon-item-label">{label}</span>
      </div>
    </StyledEditorRibbonItem>
  );
};

export default RibbonItem;