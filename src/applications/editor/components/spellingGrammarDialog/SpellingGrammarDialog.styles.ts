import styled from "styled-components";

export const StyledSpellingGrammarDialog = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 480px;
  max-width: 650px;
  color: var(--editor-text, #333);

  .metrics-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: var(--editor-surface-subtle, #f5f7fa);
    border: 1px solid var(--editor-border, #e1e4e8);
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;

    .section-title {
      font-size: 0.85rem;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--editor-text-muted, #666);
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.5rem;
      text-align: center;

      .metric-card {
        background: var(--editor-surface, #ffffff);
        padding: 0.5rem;
        border-radius: 0.35rem;
        border: 1px solid var(--editor-border, #e1e4e8);

        .value {
          font-size: 1.1rem;
          font-weight: bold;
          color: var(--editor-text, #111);
        }

        .label {
          font-size: 0.7rem;
          color: var(--editor-text-muted, #777);
          text-transform: uppercase;
        }
      }
    }

    .readability-summary {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 0.5rem;
      border-top: 1px dashed var(--editor-border, #ccc);
      font-size: 0.85rem;

      .ease-score {
        font-weight: bold;
        color: var(--editor-primary, #0066cc);
      }

      .ease-desc {
        font-style: italic;
        color: var(--editor-text-muted, #555);
      }
    }
  }

  .issues-section {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .count-badge {
        font-size: 0.75rem;
        padding: 0.2rem 0.5rem;
        border-radius: 1rem;
        background-color: var(--editor-surface-subtle, #eeefef);
        font-weight: bold;
      }
    }

    .no-issues {
      text-align: center;
      padding: 1.5rem;
      color: var(--editor-text-muted, #666);
      background-color: var(--editor-surface-subtle, #f9fbfd);
      border-radius: 0.5rem;
      border: 1px dashed var(--editor-border, #ddd);

      svg {
        width: 2rem;
        height: 2rem;
        margin-bottom: 0.5rem;
        color: var(--editor-success, #28a745);
      }
    }

    .issue-card {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      border: 1px solid var(--editor-border, #e1e4e8);
      cursor: pointer;
      transition: transform 150ms ease, box-shadow 150ms ease;

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
      }

      &.spelling {
        border-left: 4px solid var(--editor-danger, #dc3545);
        background-color: rgba(220, 53, 69, 0.03);
      }

      &.grammar {
        border-left: 4px solid var(--editor-warning, #ffc107);
        background-color: rgba(255, 193, 7, 0.03);
      }

      .issue-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .issue-title {
          font-weight: bold;
          font-size: 0.9rem;
        }

        .issue-type {
          font-size: 0.7rem;
          text-transform: uppercase;
          font-weight: bold;
          padding: 0.15rem 0.4rem;
          border-radius: 0.25rem;

          &.spelling {
            background-color: #f8d7da;
            color: #721c24;
          }

          &.grammar {
            background-color: #fff3cd;
            color: #856404;
          }
        }
      }

      .suggestions-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;

        button {
          font-size: 0.8rem;
          padding: 0.25rem 0.6rem;
          border-radius: 0.25rem;
          border: 1px solid var(--editor-border, #ccc);
          background: var(--editor-surface, #fff);
          cursor: pointer;
          transition: background 150ms ease;

          &:hover {
            background: var(--editor-primary-light, #e6f2ff);
            border-color: var(--editor-primary, #0066cc);
          }
        }
      }

      .issue-actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
        margin-top: 0.25rem;
      }
    }
  }
`;

