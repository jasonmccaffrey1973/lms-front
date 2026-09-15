import styled from "styled-components";

const StyledDialog = styled.dialog`
  border: 1px solid var(--editor-border, #ccc);
  inline-size: fit-content;
  max-inline-size: 90%;
  overflow: hidden;
  border-radius: 0.5rem;
  padding: 0;

  .dialog-wrapper {
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-areas: "header" "body" "footer";
    gap: 0.33rem;
    min-inline-size: 19rem;
    
    & > * {
        display: flex;
        padding: 0.5rem;
    }
    
    & .dialog-header {
        --_button-size: 1.5rem;
        grid-area: header;
        position: relative;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
        padding-inline-end: calc(var(--_button-size) + 0.33rem);

      h2 {
        margin: 0;
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: capitalize;
      }

      button {
        --_hover-color: inherit;
        --_hover-bg: var(--clr-danger, red);
        cursor: pointer;
        background-color: transparent;
        margin: 0;
        border: none;
        position: absolute;
        top: 0;
        right: 0;
        color: inherit;
        inline-size: var(--_button-size);
        block-size: var(--_button-size);
        border-radius: 0.25rem;
        transition: 250ms color, 250ms background-color ;
        svg {
            fill: currentColor;
            height: 90%;
            width: 90%;
        }
        &:hover {
          color: var(--_hover-color, inherit);
          background-color: var(--_hover-bg, transparent);
        }
      }

    }
    & .dialog-body {
      grid-area: body;
      border-block: 1px solid var(--editor-border, #ccc);
    }
    & .dialog-footer {
      grid-area: footer;
      display: flex;
      gap: 0.66rem;
      justify-content: flex-end;
    }
  }


  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
    
  }
`;

export { StyledDialog };
