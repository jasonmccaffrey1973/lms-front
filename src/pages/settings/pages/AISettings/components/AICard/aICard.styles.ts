import styled from 'styled-components';

const StyledAICard = styled.article`
  border: 1px solid var(--app-border);
  border-radius: 0.3rem;
  margin-block-end: 0.65rem;
  overflow: hidden;

  header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem;
    background: var(--editor-surface-muted);
    transition: background 300ms ease;

    &:hover {
      background: var(--app-hover);
    }

  }

  .title {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    justify-content: flex-start;
    text-align: left;
    text-transform: none;
    letter-spacing: normal;
    border: none;

    &:active:not(:disabled) {
      transform: none;
    }

    .chevron-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: var(--app-text-muted);
      transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms ease;

      svg {
        display: block;
        width: 1.1rem;
        height: 1.1rem;
        fill: currentColor;
      }
    }

    &:hover .chevron-icon {
      color: var(--app-text);
    }

    &[aria-expanded='true'] .chevron-icon {
      transform: rotate(90deg);
      color: currentColor;
    }

    .connection {
      display: grid;
      gap: 0.2rem;
    }
    
    small {
      color: var(--app-text-muted);
    }
  
  }

  .action-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    .status {
      --_background: var(--app-surface);
      background: var(--_background);
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      text-transform: uppercase;
      border: 1px solid var(--app-border);
      letter-spacing: 0.033em;

      &[data-status='active'] {
        --_background: var(--app-surface-success);
      }
      &[data-status='inactive'] {
        --_background: var(--app-surface-warning);
      }
      &[data-status='error'] {
        --_background: var(--app-surface-danger);
      }
    }

    button {
      display: flex;
      align-items: center;
      gap: 0.33rem;

      .icon-wrapper {
        --_border_color: rgb(from currentColor r g b / 0.4);
        display: block;
        border-inline-end: 1px solid var(--_border_color);

        svg {
          display: block;
          height: 1.25rem;
          aspect-ratio: 1 / 1;
        }
      }

    }
  }

  .content {
    display: grid;
    grid-template-rows: 0fr;
    padding-block: 0;
    padding-inline: 0.75rem;
    transition: grid-template-rows 300ms cubic-bezier(0.4, 0, 0.2, 1),
                padding-block 300ms cubic-bezier(0.4, 0, 0.2, 1);

    dt {
      color: var(--app-text-muted);
      font-size: 0.8rem;
    }
  
    dd {
      overflow-wrap: anywhere;
      margin: 0.2rem 0 0;
    }

    dl {
      min-height: 0;
      overflow: hidden;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.75rem;
      margin: 0;
      opacity: 0;
      transition: opacity 200ms ease;

      & > * {
        min-width: 0;
      }
    }

    &[aria-expanded='true'] {
      grid-template-rows: 1fr;
      padding-block: 0.75rem;

      dl {
        opacity: 1;
        transition: opacity 250ms ease 80ms;
      }
    }
  }

  @media (max-width: 900px) {
    header {
      flex-wrap: wrap;
    }

    dl {
      grid-template-columns: 1fr;
    }
  }
`;

export default StyledAICard;
