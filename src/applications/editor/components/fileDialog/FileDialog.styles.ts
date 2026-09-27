import styled from "styled-components";

const StyledFileDialog = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 50rem;
  max-width: 65rem;
  width: 100%;

  h3 {
    font-size: 1.125rem;
    margin-block: 0.33rem;
    font-weight: 600;
  }

  .dialog-main input,
  .search-wrapper input {
    background-color: var(--editor-surface);
    border: 0.125rem solid var(--editor-border);
    border-radius: 0.375rem;
    padding: 0.625rem 0.875rem;
    font-size: 1rem;
    transition: all 0.2s ease;

    &:focus {
      border-color: var(--clr-primary-light);
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
      outline: none;
    }
  }

  .input-wrapper input {
    font-weight: 500;
    letter-spacing: -0.01em;
  }

  .dialog-main {
    display: grid;
    grid-template-columns: minmax(20rem, 1fr) 2fr;
    grid-template-rows: 1fr auto;
    grid-template-areas:
      "main-left main-right"
      "file-name main-right";
    gap: 0.75rem;

    .main-left {
      grid-area: main-left;
      display: flex;
      flex-direction: column;

      .search-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        padding-block-end: 0.75rem;;
        border-block-end: 0.125rem solid var(--editor-border);

        .search-label {
          font-size: 1.125rem;
          margin-block: 0.33rem;
          font-weight: 600;
        }

        input {
          padding: 0.25rem 0.5rem;
          font-size: 1rem;
          width: 100%;
        }
      }

      .file-list {
        margin-top: 0.5rem;
        flex: 1;
        max-height: 18rem;
        overflow-y: auto;
        background-color: var(--editor-surface);
        border-radius: 0.375rem;
        list-style: none;
        block-size: 100%;
        padding: 0.25rem;

        &::before {
          content: "Recent Files";
          display: block;
          font-size: 1.125rem;
          margin-block: 0.33rem;
          font-weight: 600;
        }

        li {
          padding: 0.5rem 0.75rem;
          border-radius: 0.375rem;
          transition: all 0.15s ease;

          &:hover {
            cursor: pointer;
            background-color: var(--editor-surface-hover);
            padding-left: 1rem;
          }

          &.selected,
          &:focus {
            background-color: var(--clr-primary-light, #e6f2ff);
            color: var(--clr-primary-dark, #004085);
            outline: none;
          }
        }
      }
    }

    .main-right {
      grid-area: main-right;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      border-inline-start: 1px solid var(--editor-border);
      inline-size: min(42rem, 100vw - 24rem);
      padding-inline-start: 1rem;
      overflow: hidden;
    }

    .document-preview {
      margin: auto;
      inline-size: 100%;
      padding: 1rem;
      background-color: var(--editor-surface);
      aspect-ratio: 16 / 9;
      max-inline-size: 100%;
      overflow: hidden;
      
      
      &[data-orentation="portrait"] {
        aspect-ratio: 9 / 16;
      }
      
      .preview-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        overflow: hidden;
      }
    }

    .document-meta-list {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 0.5rem 1rem;
      font-size: 0.875rem;

      label {
        font-weight: 600;
        text-transform: uppercase;
      }

      .metadata-data {
        font-weight: 400;
      }
    }

    .input-wrapper {
      grid-area: file-name;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      border-block-start: 1px solid var(--editor-border);

      
      label {
        font-size: 1.125rem;
        margin-block: 0.33rem;
        font-weight: 600;
      }
      

      input {
        padding: 0.375rem 0.5rem;
        font-size: 1rem;
        width: 100%;
      }
    }
  }
`;

export { StyledFileDialog };