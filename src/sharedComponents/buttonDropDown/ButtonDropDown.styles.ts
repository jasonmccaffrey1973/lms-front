import styled from "styled-components";

export const StyledButtonDropDownWrapper = styled.div`
  --_wrapper-background-color: transparent;
  --_wrapper-border-color: var(--editor-border, hsl(30, 6%, 88%));
  --_item-hover-background-color: var(--editor-item-hover, rgba(255, 255, 255, 0.08));
  --_item-hover-border-color: hsl(206, 100%, 42%);
  --_item-active-background-color: var(--editor-item-active-bg, rgba(255, 255, 255, 0.15));

  position: relative;
  display: inline-flex;
  align-self: stretch;
  inline-size: 5.5rem;
  box-sizing: border-box;
`;

export const StyledSplitButtonContainer = styled.div<{ $isActive?: boolean }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  background-color: ${({ $isActive }) =>
    $isActive ? "var(--_item-active-background-color)" : "transparent"};
  border: 1px solid
    ${({ $isActive }) =>
      $isActive ? "var(--_item-hover-border-color)" : "transparent"};
  border-radius: 0.25rem;
  box-sizing: border-box;
  overflow: hidden;
  transition: border-color 0.1s ease, background-color 0.1s ease;

  &:hover {
    border-color: var(--_item-hover-border-color);
  }
`;

export const StyledMainActionButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem; /* Matches the 0.25rem gap used in standard ribbon items */
  flex: 1;
  min-width: 0;
  height: 100%;
  padding: 0.25rem 0.1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: inherit;
  transition: background-color 0.1s ease;

  &:hover {
    background-color: var(--_item-hover-background-color);
  }

  &:active {
    background-color: var(--_item-active-background-color);
  }

  svg {
    width: 1.85rem;
    height: 1.85rem;
    flex-shrink: 0;
  }

  .button-label {
    font-size: 0.7rem;
    line-height: 1.2;
    color: inherit;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    margin: 0; /* Ensures no extra margins override the flex gap */
  }
`;

export const StyledCaretButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.15rem;
  background: ${({ $isOpen }) =>
    $isOpen ? "var(--_item-hover-background-color)" : "transparent"};
  border: none;
  cursor: pointer;
  color: inherit;
  transition: background-color 0.1s ease;

  &:hover {
    background-color: var(--_item-hover-background-color);
  }

  &:active {
    background-color: var(--_item-active-background-color);
  }

  svg {
    width: 1.1rem;
    height: 1.1rem;
    flex-shrink: 0;
    transition: transform 0.15s ease;
    transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  }
`;

export const StyledPopoverPanel = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  z-index: 100;
  min-width: 12rem;
  padding: 0.5rem;
  background-color: var(--editor-surface-muted, #1e222d);
  border: 1px solid var(--_wrapper-border-color);
  border-radius: 0.375rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;