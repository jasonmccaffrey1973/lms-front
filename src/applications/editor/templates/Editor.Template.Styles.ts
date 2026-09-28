import styled from "styled-components";

/** 
 * get height of header and footer to help eliminate overflow issues in the editor template
 */
// const headerHeight = document.querySelector(".header-wrapper")?.clientHeight || 0;
// const footerHeight = document.querySelector(".footer-content")?.parentElement?.clientHeight || 0; 

const StyledEditorTemplate = styled.div`
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  grid-template-areas:
    'template-ribbon'
    'template-editor-shell';
  flex: 1 1 auto;
  min-block-size: 0;
  min-inline-size: 0;
  gap: 0.5rem;
  background: var(--editor-surface);
  border: 1px solid var(--editor-border-strong);
  border-radius: 0.75rem;

  .editor-shell {
    grid-area: template-editor-shell;
    background: var(--editor-surface);
    block-size: 100%;
    overflow-x: auto;
    overflow-y: auto;
    scrollbar-gutter: stable;

    > div {
      block-size: 100%;
    }
  }

  .editor-shell__content,
  .ProseMirror {
    inline-size: 100%;
    block-size: 100%;
    zoom: var(--editor-zoom, 1);
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

  .ProseMirror ins[data-track-change="insertion"],
  .ProseMirror .track-change-insertion {
    background-color: rgba(40, 167, 69, 0.15);
    color: #1e7e34;
    text-decoration: underline;
    border-bottom: 2px solid #28a745;
  }

  .ProseMirror del[data-track-change="deletion"],
  .ProseMirror .track-change-deletion {
    background-color: rgba(220, 53, 69, 0.15);
    color: #bd2130;
    text-decoration: line-through;
    opacity: 0.8;
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
