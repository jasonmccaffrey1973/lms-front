import styled from "styled-components";

const StyledEditorTemplate = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'template-ribbon'
    'template-editor-shell';
  inline-size: 100%;
  block-size: 100%;
  flex: 1 1 auto;
  gap: 0.5rem;
  background: var(--editor-surface);
  border: 1px solid var(--editor-border-strong);
  border-radius: 0.75rem;

  .editor-shell {
    grid-area: template-editor-shell;
    display: flex;
    inline-size: 100%;
    border: 1px solid var(--editor-border-strong);
    border-radius: 0.5rem;
    background: var(--editor-surface);
    overflow: hidden;
    padding: 0.75rem;
  }

  .editor-shell > div {
    inline-size: 100%;
    flex: 1 1 auto;
  }

  .editor-shell__content,
  .ProseMirror {
    inline-size: 100%;
    block-size: 100%;
    padding: 0.75rem;
    outline: none;
    font-size: 1rem;
    line-height: 1.6;
    color: var(--editor-text);
    background: var(--editor-surface);
  }

  .ProseMirror p {
    margin: 0 0 0.75rem;
  }

  .ProseMirror:focus {
    box-shadow: inset 0 0 0 1px var(--editor-focus-ring);
  }
`;

export default StyledEditorTemplate;