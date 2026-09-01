import type { ReactNode } from "react";
import { useId } from "react";
import StyledSelect from "./Select.styles";
import type { SelectProps } from "./Select.types";
import useSelect from "./useSelect";

export const SelectItem = ({
  id,
  value,
  label,
  isSelected,
  isActive,
  onSelect,
  onMouseEnter,
}: {
  id: string;
  value: string;
  label: ReactNode;
  isSelected: boolean;
  isActive: boolean;
  onSelect: (val: string) => void;
  onMouseEnter: () => void;
}) => {
  return (
    <li
      id={id}
      role="option"
      aria-selected={isSelected}
      className={`option-item ${isActive ? "is-active" : ""} ${isSelected ? "is-selected" : ""}`}
      onMouseDown={(e) => {
        e.preventDefault(); // Prevents input from losing focus before option click resolves
        onSelect(value);
      }}
      onMouseEnter={onMouseEnter}
    >
      {label}
    </li>
  );
};

const Select = ({ value, onChange, options, label, disabled }: SelectProps) => {
  const baseId = useId();
  const inputId = `${baseId}-input`;
  const listboxId = `${baseId}-listbox`;

  const {
    selectOpen,
    openSelect,
    handleClick,
    handleBlur,
    handleKeyDown,
    filteredOptions,
    handleSearchChange,
    handleSelectOption,
    searchTerm,
    selectedLabelText,
    selectedFontFamily,
    activeIndex,
    setActiveIndex,
    listboxRef,
  } = useSelect({ options, value, onChange });

  const activeOptionId =
    activeIndex >= 0 && filteredOptions[activeIndex]
      ? `${baseId}-option-${filteredOptions[activeIndex].value}`
      : undefined;

  return (
    <div className="select-container">
      {label && <label htmlFor={inputId}>{label}</label>}
      <StyledSelect $isOpen={selectOpen} onBlur={handleBlur} tabIndex={-1}>
        <input
          id={inputId}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={selectOpen}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-activedescendant={activeOptionId}
          placeholder={selectedLabelText || "Select..."}
          style={{ fontFamily: selectedFontFamily }}
          value={searchTerm}
          onFocus={openSelect}
          onClick={handleClick}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        <ul
          id={listboxId}
          ref={listboxRef}
          role="listbox"
          aria-label={label || "Options"}
          tabIndex={-1}
          className={selectOpen ? "is-open" : ""}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => {
              const optionId = `${baseId}-option-${option.value}`;
              const isSelected = option.value === value;
              const isActive = index === activeIndex;

              return (
                <SelectItem
                  key={option.value}
                  id={optionId}
                  value={option.value}
                  label={option.label}
                  isSelected={isSelected}
                  isActive={isActive}
                  onSelect={handleSelectOption}
                  onMouseEnter={() => setActiveIndex(index)}
                />
              );
            })
          ) : (
            <li className="no-options" role="presentation">
              No matches found
            </li>
          )}
        </ul>
      </StyledSelect>
    </div>
  );
};

export default Select;