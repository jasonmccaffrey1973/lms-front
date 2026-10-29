import styled from 'styled-components';

export const StyledScenesPage = styled.section`
  display: grid;
  gap: 1rem;
  padding: 1rem 0;

  .scene-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .scene-form {
    display: grid;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid var(--app-border);
    border-radius: 0.75rem;
    background: var(--app-surface);
  }

  .field {
    display: grid;
    gap: 0.5rem;

    label {
      font-weight: 600;
    }

    input,
    textarea,
    select {
      width: 100%;
      padding: 0.625rem 0.75rem;
      border: 1px solid var(--app-border);
      border-radius: 0.5rem;
      background: var(--app-background);
      color: var(--app-text);
      font: inherit;
    }

    textarea {
      min-height: 7rem;
      resize: vertical;
    }
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }

  .status {
    display: inline-flex;
    align-items: center;
    border-radius: 999px;
    padding: 0.25rem 0.625rem;
    background: rgba(88, 166, 255, 0.12);
    color: var(--app-text);
    font-size: 0.8rem;
    font-weight: 600;
  }
`;
