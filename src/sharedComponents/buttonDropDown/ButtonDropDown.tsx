
import SVGIcon from "../SVG/SVGIcon";
import {
  StyledButtonDropDownWrapper,
  StyledSplitButtonContainer,
  StyledMainActionButton,
  StyledCaretButton,
  StyledPopoverPanel,
} from "./ButtonDropDown.styles";
import useButtonDropDown from "./useButtonDropDown";
import type { ButtonDropDownProps } from "./ButtonDropDown.types";

const ButtonDropDown = ({
  label,
  icon,
  value,
  isActive,
  onPrimaryAction,
  children,
}: ButtonDropDownProps) => {
  const { isOpen, toggleDropDown, containerRef } = useButtonDropDown();

  return (
    <StyledButtonDropDownWrapper ref={containerRef}>
      <StyledSplitButtonContainer $isActive={isActive}>
        {/* Primary action target */}
        <StyledMainActionButton
          type="button"
          onClick={() => onPrimaryAction?.(value)}
          aria-label={label}
        >
          {icon && <SVGIcon icon={icon} />}
          <span className="button-label">{label}</span>
        </StyledMainActionButton>

        {/* Dropdown toggle indicator */}
        <StyledCaretButton
          type="button"
          onClick={toggleDropDown}
          $isOpen={isOpen}
          aria-label={`${label} options`}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {/* Chevron/Caret icon indicator */}
          <SVGIcon icon="chevronDown" />
        </StyledCaretButton>
      </StyledSplitButtonContainer>

      {/* Popover section rendering the injected component */}
      <StyledPopoverPanel $isOpen={isOpen} role="dialog" aria-label={`${label} menu`}>
        {children}
      </StyledPopoverPanel>
    </StyledButtonDropDownWrapper>
  );
};

export default ButtonDropDown;