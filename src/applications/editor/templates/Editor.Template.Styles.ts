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

  .ProseMirror .tableWrapper {
    margin: 0.75rem 0;
    overflow-x: auto;
  }

  .ProseMirror table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;
  }

  .ProseMirror td,
  .ProseMirror th {
    border: 1px solid var(--editor-border-strong);
    box-sizing: border-box;
    min-width: 3rem;
    padding: 0.4rem 0.5rem;
    position: relative;
    vertical-align: top;
  }

  .ProseMirror td > p,
  .ProseMirror th > p {
    margin: 0;
  }

  .ProseMirror th {
    background: var(--editor-surface-hover);
    font-weight: 600;
    text-align: left;
  }

  .ProseMirror .selectedCell::after {
    background: color-mix(in srgb, var(--editor-focus-ring) 20%, transparent);
    content: "";
    inset: 0;
    pointer-events: none;
    position: absolute;
    z-index: 2;
  }

  .ProseMirror .column-resize-handle {
    background-color: var(--editor-focus-ring);
    bottom: -2px;
    pointer-events: none;
    position: absolute;
    right: -2px;
    top: 0;
    width: 4px;
  }
`;

export default StyledEditorTemplate;