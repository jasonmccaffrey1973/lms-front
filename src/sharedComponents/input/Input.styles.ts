import styled from "styled-components";

const StyledInputWrapper = styled.div`
  --_border-color: var(--border-color, #ccc);
  --_font-size: 0.875rem;
  --_option-padding: 0.5rem;
  --_block-size: calc(var(--_font-size) + var(--_option-padding) * 2);

  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  label {
    font-size: var(--_font-size);
    font-weight: 500;
  }

  input {
    padding: var(--_option-padding);
    border: 1px solid var(--_border-color);
    border-radius: 4px;
    font-size: var(--_font-size);
    block-size: var(--_block-size);
    box-sizing: border-box;
    font-family: inherit;
    transition: border-color 150ms ease-in-out;

    &:focus {
      outline: none;
      border-color: var(--primary-color, #007bff);
    }

    &:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }

    /* Webkit browsers (Chrome, Safari, Edge) - Remove default autofill background */
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 1000px white inset !important;
      -webkit-text-fill-color: inherit !important;
      caret-color: inherit;
    }

    /* Firefox - delay transition to override autofill */
    &:-moz-autofill {
      transition: background-color 5000s ease-in-out 0s, color 5000s ease-in-out 0s;
    }

    &:-moz-autofill:hover,
    &:-moz-autofill:focus,
    &:-moz-autofill:active {
      transition: background-color 5000s ease-in-out 0s, color 5000s ease-in-out 0s;
    }

    &::placeholder {
      color: #999;
      opacity: 1;
    }
  }
`;

export { StyledInputWrapper };