import styled from "styled-components";
import type { CSSProperties } from "react";

const StyledMiniEditor = styled.div<{
  $height: CSSProperties["height"];
  $labelPlacement: "top" | "start";
}>`
  display: ${({ $labelPlacement }) => ($labelPlacement === "start" ? "grid" : "block")};
  grid-template-columns: ${({ $labelPlacement }) =>
    $labelPlacement === "start" ? "5rem minmax(0, 1fr)" : "minmax(0, 1fr)"};
  column-gap: ${({ $labelPlacement }) => ($labelPlacement === "start" ? "0.5rem" : "0")};
  grid-template-rows: auto;
  min-inline-size: 0;
  border: ${({ $labelPlacement }) =>
    $labelPlacement === "start" ? "none" : "1px solid var(--editor-border-strong, #cbd5e1)"};
  border-radius: 0.5rem;
  background: ${({ $labelPlacement }) =>
    $labelPlacement === "start" ? "transparent" : "var(--editor-surface, #fff)"};
  color: var(--editor-text, #1f2937);

  .mini-editor__body {
    display: grid;
    grid-template-rows: auto auto;
    grid-column: ${({ $labelPlacement }) => ($labelPlacement === "start" ? "2" : "1")};
    grid-row: 1;
    min-inline-size: 0;
    border: ${({ $labelPlacement }) =>
      $labelPlacement === "start" ? "1px solid var(--editor-border-strong, #cbd5e1)" : "none"};
    border-radius: 0.5rem;
    background: var(--editor-surface, #fff);
  }

  .mini-editor__label {
    display: block;
    width: max-content;
    min-width: 5rem;
    margin: ${({ $labelPlacement }) =>
      $labelPlacement === "start" ? "0" : "0.75rem 0 0.35rem"};
    padding-top: ${({ $labelPlacement }) => ($labelPlacement === "start" ? "0.35rem" : "0")};
    color: var(--editor-text, #1f2937);
    font-size: inherit;
    font-weight: inherit;
    cursor: pointer;
    grid-column: 1;
    grid-row: 1;
    align-self: start;
  }

  .mini-editor__toolbar {
    grid-column: 1;
    grid-row: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: 0.35rem;
    padding: 0.35rem;
    background: var(--editor-surface-muted, #f3f4f6);
    border-bottom: 1px solid var(--editor-border, #d1d5db);
  }

  .mini-editor__group {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 0.2rem 0.28rem;
    border: 1px solid var(--editor-border, #d1d5db);
    border-radius: 0.3rem;
    background: var(--editor-surface-subtle, #f9fafb);
  }

  .mini-editor__group-label {
    color: var(--editor-text-muted, #6b7280);
    font-size: 0.64rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .mini-editor__group-items {
    display: flex;
    align-items: flex-end;
    gap: 0.2rem;
  }

  .mini-editor__surface {
    grid-column: 1;
    grid-row: 2;
    height: ${({ $height }) => typeof $height === "number" ? `${$height}px` : $height ?? "240px"};
    min-height: 4rem;
    overflow: auto;
  }

  .mini-editor__surface > div {
    height: 100%;
  }

  .mini-editor__surface .ProseMirror {
    height: 100%;
    min-height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 0.75rem;
    outline: none;
    color: inherit;
    line-height: 1.6;
  }

  .mini-editor__surface .ProseMirror p {
    margin: 0 0 0.75rem;
  }

  .mini-editor__surface .ProseMirror:focus {
    box-shadow: inset 0 0 0 1px var(--clr-primary-light, #60a5fa);
  }
`;

export { StyledMiniEditor };
