// RibbonItem.tsx
import { StyledEditorRibbonItem } from "../Ribbon.styles";
import SVGIcon, { type SVGIconName } from "../../../../../sharedComponents/SVG/SVGIcon";
import type { SelectOption } from "../Ribbon.types";
import RibbonSelect from "./ribbonSelect/RibbonSelect";
import RibbonListElement from "./ribbonListElement/RibbonListElement";

import type { MenuListItemTypes } from "./ribbonListElement/RibbonListElement.types";
import ButtonDropDown from "../../../../../sharedComponents/buttonDropDown/ButtonDropDown";
import ColorPicker from "../../../../../sharedComponents/colorPicker/ColorPicker";
import AttachURL from "./attachURL/AttachURL";


export interface RibbonItemProps {
  elementType?: "button" | "select" | "checkbox" | "radio" | "link" | "list" | "buttonDropdown";
  value?: string;
  icon?: SVGIconName;
  label: string;
  action?: (val: string) => void;
  isActive?: boolean;
  options?: readonly SelectOption[] | SelectOption[];
  items?: MenuListItemTypes[];
  dropdownContent?: React.ReactNode;
}

const dropdownContent = ({label}: {label: string}) => {
  switch (label) {
    case "Text Color":
      return <ColorPicker value="#000000" onChange={(val) => console.log(val)} />;
    case "Highlight":
      return <ColorPicker value="#ffff00" onChange={(val) => console.log(val)} />;
    case "Link":
      return <AttachURL action={() => console.log("Attach URL action")} recentURLs={["https://example.com", "https://another-example.com"]} />;
      // return <Input value="" onChange={(val) => console.log(val)} placeholder="Enter URL" label="Link" />;
    default:
      return null;
  }
}

const RibbonItem = ({
  elementType = "button",
  value = "",
  icon,
  label,
  action,
  isActive,
  options,
  items,
}: RibbonItemProps) => {
  // 1. Select Dropdowns
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

  // 2. Ribbon List Element (e.g. Word Styles gallery)
  if (elementType === "list" && items) {
    return (
      <RibbonListElement
        label={label}
        items={items}
      />
    );
  }

  // 3. Dropdowns with popovers (e.g. Color Picker)
  if (elementType === "buttonDropdown" && dropdownContent({label})) {
    return (
      <ButtonDropDown
        label={label}
        icon={icon}
        value={value}
        isActive={isActive}
        onPrimaryAction={(val) => action?.(val ?? "")}
      >
        {dropdownContent({label})}
      </ButtonDropDown>
    );
  }

  // 4. Default Action Button
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