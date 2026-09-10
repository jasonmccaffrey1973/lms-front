import styled from "styled-components";

const StyledMediaDialogOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: grid;
  place-items: center;
  z-index: 50;
`;

const StyledMediaDialog = styled.section`
  inline-size: min(44rem, calc(100vw - 2rem));
  max-block-size: calc(100vh - 2rem);
  overflow: auto;
  border: 1px solid var(--editor-border-strong);
  border-radius: 0.75rem;
  background: var(--editor-surface);
  color: var(--editor-text);
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.25);
  padding: 1rem;

  .dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.75rem;
  }

  h2 {
    margin: 0;
    font-size: 1.1rem;
  }

  .helper {
    margin: 0 0 0.75rem;
    font-size: 0.9rem;
    opacity: 0.85;
  }

  .mode-row,
  .source-row,
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .field {
    display: grid;
    gap: 0.35rem;
    margin-bottom: 0.75rem;
  }

  label {
    font-size: 0.9rem;
    font-weight: 600;
  }

  input[type="url"],
  input[type="text"] {
    border: 1px solid var(--editor-border);
    border-radius: 0.5rem;
    padding: 0.5rem 0.6rem;
    background: var(--editor-tab-active);
    color: inherit;
  }

  .file-label {
    font-size: 0.85rem;
    opacity: 0.8;
  }

  .error {
    color: hsl(0, 70%, 45%);
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
  }
`;

export { StyledMediaDialogOverlay, StyledMediaDialog };
