import styled from "styled-components";

interface StyledSelectProps {
  $isOpen?: boolean;
}

const StyledSelect = styled.div<StyledSelectProps>`
  --_border-color: var(--border-color, #ccc);
  --_menu-bg: var(--app-bg, #fff);
  --_option-padding: 0.5rem;
  --_font-size: 0.875rem;
  --_block-size: calc(var(--_font-size) + var(--_option-padding) * 2);
  --_menu-items: 3;

  /* Layout & Sizing */
  inline-size: fit-content;
  max-width: 12rem;
  border: 1px solid var(--_border-color);
  position: relative;
  block-size: var(--_block-size);
  box-sizing: border-box;

  &:focus-within {
    border-color: var(--primary-color, #007bff);
  }

  /* Chevron Indicator (Replaces ::after using original aspect ratio & size logic) */
  &::after {
    --__size: calc(var(--_block-size) / 4);

    content: "";
    position: absolute;
    right: 0.5rem;
    top: calc((var(--_block-size) - var(--__size)) / 2.25);
    display: inline-block;
    aspect-ratio: 1 / 1;
    inline-size: var(--__size);
    border-block-start: 0.125rem solid var(--_border-color);
    border-inline-end: 0.125rem solid var(--_border-color);
    pointer-events: none;
    
    /* Rotate 45deg when closed, 135deg when open */
    transform: rotate(${({ $isOpen }) => ($isOpen ? "135deg" : "45deg")});
    transition: transform 250ms ease-in-out;
  }

  /* Input Styling */
  input[type="text"] {
    width: 100%;
    border: none;
    outline: none;
    font-size: var(--_font-size);
    block-size: 100%;
    padding-inline: var(--_option-padding);
    padding-inline-end: 1.75rem; /* Reserve space for arrow */
    box-sizing: border-box;
    background: transparent;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-transform: capitalize;

    &::placeholder {
      font-family: inherit;
      color: inherit;
      opacity: 1;
    }
  }

  /* Dropdown Menu List */
  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 0 -1px;
    inline-size: calc(100% + 2px);
    background: var(--_menu-bg, #fff);
    border: 1px solid var(--_border-color);
    border-block-start: none;
    position: absolute;
    top: 100%;
    left: 0;
    max-block-size: calc(var(--_block-size) * var(--_menu-items, 3));
    overflow-y: auto;
    z-index: 100;

    /* Transition & Visibility control */
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translateY(-1px) scaleY(0);
    transform-origin: top;
    transition: transform 250ms ease-in-out, opacity 250ms ease-in-out, visibility 250ms;

    &.is-open {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      transform: translateY(-1px) scaleY(1);
    }
  }

  /* List Items & Option Styling */
  li.option-item {
    cursor: pointer;
    padding-inline: var(--_option-padding);
    block-size: var(--_block-size);
    font-size: var(--_font-size);
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;

    /* Mouse Hover and Keyboard Active focus states */
    &:hover,
    &.is-active {
      background-color: var(--_border-color);
      color: var(--_menu-bg);
    }

    &.is-selected {
      font-weight: 600;
    }

    &.is-selected::after {
      content: "✓";
      margin-inline-start: 0.5rem;
    }
  }

  /* Empty State Styling */
  .no-options {
    padding-inline: var(--_option-padding);
    block-size: var(--_block-size);
    font-size: var(--_font-size);
    display: flex;
    align-items: center;
    color: #888;
  }
`;

export default StyledSelect;