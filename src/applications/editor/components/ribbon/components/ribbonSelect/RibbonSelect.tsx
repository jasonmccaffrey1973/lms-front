import Select from "../../../../../../sharedComponents/select/Select";
import { StyledEditorRibbonSelectItem } from "../../Ribbon.styles";
import type { SelectOption } from "../../Ribbon.types";

interface RibbonSelectProps {
  value: string;
  options?: readonly SelectOption[] | SelectOption[];
  onChange?: (val: string) => void;
  label?: string;
}

const RibbonSelect = ({ value, options = [], onChange, label }: RibbonSelectProps) => {
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === "object" && opt !== null && "value" in opt) {
      const optionValue = String(opt.value);
      const optionLabel = String(opt.label ?? opt.value);

      return {
        label:
          label === "Typeface" ? (
            <span style={{ fontFamily: optionValue }}>{optionLabel}</span>
          ) : (
            optionLabel
          ),
        value: optionValue,
        searchText: optionLabel,
      };
    }

    const optionValue = String(opt);

    return {
      label:
        label === "Typeface" ? (
          <span style={{ fontFamily: optionValue }}>{optionValue}</span>
        ) : (
          optionValue
        ),
      value: optionValue,
      searchText: optionValue,
    };
  });

  const sanitizedValue =
    value && normalizedOptions.some((opt) => opt.value === String(value))
      ? String(value)
      : normalizedOptions[0]?.value || "";

  return (
    <StyledEditorRibbonSelectItem key={`${label ?? "control"}-${sanitizedValue}`}>
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
