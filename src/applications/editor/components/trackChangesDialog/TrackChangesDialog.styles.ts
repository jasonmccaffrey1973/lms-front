import styled from "styled-components";

export const StyledTrackChangesDialog = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 520px;
  max-width: 680px;
  color: var(--editor-text, #333);

  .controls-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--editor-surface-subtle, #f5f7fa);
    border: 1px solid var(--editor-border, #e1e4e8);
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;

    .user-info {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;

      .user-label {
        font-size: 0.75rem;
        color: var(--editor-text-muted, #666);
        text-transform: uppercase;
        font-weight: bold;
      }

      .user-name {
        font-size: 0.95rem;
        font-weight: bold;
      }
    }

    .bulk-actions {
      display: flex;
      gap: 0.5rem;
    }
  }

  .changes-list-section {
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

    .no-changes {
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

    .change-card {
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

      &.insertion {
        border-left: 4px solid var(--editor-success, #28a745);
        background-color: rgba(40, 167, 69, 0.03);
      }

      &.deletion {
        border-left: 4px solid var(--editor-danger, #dc3545);
        background-color: rgba(220, 53, 69, 0.03);
      }

      .change-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .change-author {
          font-weight: bold;
          font-size: 0.85rem;
        }

        .change-type {
          font-size: 0.7rem;
          text-transform: uppercase;
          font-weight: bold;
          padding: 0.15rem 0.4rem;
          border-radius: 0.25rem;

          &.insertion {
            background-color: #d4edda;
            color: #155724;
          }

          &.deletion {
            background-color: #f8d7da;
            color: #721c24;
          }
        }
      }

      .change-content {
        font-size: 0.9rem;
        padding: 0.35rem 0.5rem;
        background: var(--editor-surface, #fff);
        border-radius: 0.25rem;
        border: 1px solid var(--editor-border, #eee);
        word-break: break-word;

        &.insertion {
          text-decoration: underline;
          color: #155724;
        }

        &.deletion {
          text-decoration: line-through;
          color: #721c24;
        }
      }

      .change-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.25rem;

        .change-time {
          font-size: 0.75rem;
          color: var(--editor-text-muted, #777);
        }

        .change-actions {
          display: flex;
          gap: 0.4rem;
        }
      }
    }
  }
`;

