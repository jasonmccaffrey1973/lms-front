import styled from "styled-components";

const StyledInsertTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.5rem;
  width: 13.5rem;
  box-sizing: border-box;
  user-select: none;

  .insert-table-header {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--editor-text, inherit);
    text-align: center;
  }

  .insert-table-grid {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 0.25rem;
    background-color: var(--editor-surface, hsl(0, 0%, 100%));
    border: 1px solid var(--editor-border-strong, hsl(214, 15%, 81%));
    border-radius: 0.25rem;
    transition: all 0.1s ease-out;
  }

  .insert-table-row {
    display: flex;
    gap: 3px;
    width: 100%;
  }

  .insert-table-cell {
    flex: 1;
    aspect-ratio: 1;
    border-radius: 2px;
    cursor: pointer;
    background-color: var(--editor-surface-muted, hsl(210, 15%, 95%));
    border: 0.25rem solid transparent;
    transition: background-color 0.05s ease, border-color 0.05s ease;

    &.highlighted {
      background-color: var(--editor-accent, hsl(206, 100%, 42%));
      border-color: var(--editor-accent-border, hsl(206, 100%, 35%));
    }
  }

  .insert-table-divider {
    border: none;
    border-top: 1px solid var(--editor-border, hsla(0, 0%, 100%, 0.10));
    margin: 0.125rem 0;
  }

  .insert-table-manual {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .manual-title {
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--editor-text-muted, hsla(0, 0%, 100%, 0.70));
    }

    form {
      display: flex;
      gap: 0.5rem;
      align-items: flex-end;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      flex: 1;
      font-size: 0.7rem;
      color: var(--editor-text-muted, inherit);

      input {
        width: 100%;
        padding: 0.25rem 0.4rem;
        font-size: 0.8rem;
        background: var(--editor-input-bg, hsla(0, 0%, 0%, 0.20));
        border: 1px solid var(--editor-border, hsla(0, 0%, 100%, 0.20));
        border-radius: 0.25rem;
        color: inherit;
        box-sizing: border-box;

        &:focus {
          outline: none;
          border-color: var(--editor-accent, hsl(206, 100%, 42%));
        }
      }
    }

    button {
      padding: 0.35rem 0.5rem;
      font-size: 0.75rem;
      font-weight: 600;
      border: none;
      border-radius: 0.25rem;
      background-color: var(--editor-accent, hsl(206, 100%, 42%));
      color: #fff;
      cursor: pointer;
      transition: opacity 0.1s ease;

      &:hover {
        opacity: 0.9;
      }

      &:active {
        opacity: 0.8;
      }
    }
  }
`;

export { StyledInsertTableWrapper };
