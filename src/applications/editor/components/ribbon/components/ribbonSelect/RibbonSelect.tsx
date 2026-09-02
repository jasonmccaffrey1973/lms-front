import Select from "../../../../../../sharedComponents/select/Select";
import { StyledEditorRibbonSelectItem } from "../../Ribbon.styles";
import type { SelectOption } from "../../Ribbon.types";

interface RibbonSelectProps {
  value: string;
  options?: readonly SelectOption[] | SelectOption[];
  onChange?: (val: string) => void;
  label?: string;
}


interface RibbonSelectProps {
  value: string;
  options?: readonly SelectOption[] | SelectOption[];
  onChange?: (val: string) => void;
  label?: string;
}

const RibbonSelect = ({ value, options = [], onChange, label }: RibbonSelectProps) => {
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === "object" && opt !== null && "value" in opt) {
      return {
        label: String(opt.label ?? opt.value),
        value: String(opt.value),
      };
    }
    return {
      label: String(opt),
      value: String(opt),
    };
  });

  const sanitizedValue =
    value && normalizedOptions.some((opt) => opt.value === String(value))
      ? String(value)
      : normalizedOptions[0]?.value || "";

  return (
    <StyledEditorRibbonSelectItem>
      <Select
        value={sanitizedValue}
        onChange={onChange || (() => {})}
        options={normalizedOptions}
      />
      {label && <span className="ribbon-item-label">{label}</span>}
    </StyledEditorRibbonSelectItem>
  );
};

export default RibbonSelect;
