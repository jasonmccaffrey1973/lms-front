import styled from "styled-components"

const StyledDataGrid = styled.div`
display: grid;
grid-template-rows: auto 1fr auto;
grid-template-columns: 1fr;
grid-template-areas: 
  "header"
  "body"
  "footer";
block-size: 100%;
inline-size: 100%;
overflow: auto;
border: 1px solid var(--app-border);

  .grid-header {
    grid-area: header;
    display: grid;
    grid-template-columns:auto 1fr auto;
    grid-template-areas: "data-header-left data-header-search data-header-right";
    background-color: var(--app-surface-muted);
    padding: 0.5rem;

    .data-header-left-wrapper {
      grid-area: data-header-left;
      display: flex;
      align-items: center;


      .data-grid-title {
        font-size: 0.9rem;
        text-transform: uppercase;
        font-weight: 500;
        margin: 0;
        display: flex;
        align-items: center;
        
        

        svg {
          width: 0.8em;
          aspect-ratio: 1/1;
        }

        a {
          border-block-end: 1px solid transparent;
          text-decoration: none;
          color: inherit;
          transition: border-block-end-color 0.2s ease-in-out;
          padding: 0.25rem;
  
          &:hover {
            outline: none;
            border-block-end-color: rgb(from currentColor r g b / 0.5);
          }
  
          &:focus-within {
            outline: 1px solid var(--clr-primary);
          }
  
        }

        .current-page {
          font-weight: 700;
          margin-inline-start: 0.25rem;
          letter-spacing: 0.05em;
          font-size: 1.1rem;
        }
      }

    }
    .data-header-search-wrapper {
        --search-icon-size: 1em;

        grid-area: data-header-search;
        display: flex;
        justify-content: center;
        align-items: center;

        form {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            position: relative;    
        
        label {
            display: flex;
            align-items: center;
            height: 100%;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            padding-inline: calc(var(--search-icon-size) / 2);

            svg {
                width: var(--search-icon-size);
                aspect-ratio: 1 / 1;
                fill: currentColor;
            }
        }

        input[type="search"] {
            padding-left: calc(var(--search-icon-size) * 2);
            display: flex;
            align-items: center;
            font-size: 1rem;
            min-width: 18rem;
            overflow: clip;
            outline: none;
            border: 1px solid var(--app-border);

            &:focus-within {
                border-color: rgb( from var(--app-text) r g b / 0.5);
            }
        }
      }
    }

    .data-header-right-wrapper {
      grid-area: data-header-right;
      display: flex;
      gap: 0.5rem;

      button[class*='new-'] {
        display: flex;
        flex-direction: row;
        align-items: center; 
        padding-block: 0;
        block-size: calc(100%);

        .icon-wrapper {
          display: flex;
          align-items: center;
          border-inline-end: 1px solid rgb(from currentColor r g b / 0.5);
          block-size: 100%;
          padding-inline-end: 0.5rem;
          margin-inline-end: 0.5rem;

        }

        svg {
          width: 1rem;
          aspect-ratio: 1/1;
        }
      }

      .data-filter-button {
        position: relative;
        border: 1px solid transparent;
        color: var(--clr-text-light);

        svg {
          fill: currentColor;
        }

        &:hover, &:focus-within {
          border-color: rgb( from var(--app-text) r g b / 0.5);
          background-color: rgb(0 0 0 / 0.25);
        }

        .filter-count {
          position: absolute;
          top: 0.25rem;
          right: 0.25rem;
          inline-size: 0.5rem;
          block-size: 0.5rem;
          border-radius: 999px;
          background: var(--clr-primary);
        }
      }
    }
  }

  .grid-body {
    grid-area: body;
    overflow: auto;

    table {
      inline-size: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }

    th,
    td {
      border-bottom: 1px solid var(--app-border);
      padding: 0.5rem;
      text-align: left;
      vertical-align: middle;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    th {
      position: sticky;
      top: 0;
      background: var(--app-surface);
      z-index: 1;

      .sort-button {
        background: transparent;
        border: 0;
        color: inherit;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        font: inherit;
        padding: 0;

        .sort-indicator {
          display: inline-flex;
          align-items: center;

          svg {
            inline-size: 0.8rem;
          }
        }
      }
    }

    .selection-cell {
      inline-size: 2.5rem;
      text-align: center;

      input[type="checkbox"] {
        margin: 0;
      }
    }

    .grid-state {
      margin: 0.75rem;
      color: var(--app-text-muted);
    }

    .grid-load-sentinel {
      block-size: 1px;
    }
  }

  .grid-footer {
    grid-area: footer;
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-areas: "data-grid-footer-left data-grid-footer-center data-grid-footer-right";
    max-block-size: 3rem;
    background-color: var(--app-surface-muted);
    padding: 0.5rem;
    border-block-start: 1px solid var(--app-border);


    .data-grid-footer-left-column {
      grid-area: data-grid-footer-left;
      display: flex;
      align-items: center; 
      justify-content: flex-start;

      .column-visibility-menu {
        position: relative;
      }

      .column-visibility-popover {
        position: absolute;
        bottom: calc(100% + 0.25rem);
        left: 0;
        background: var(--app-surface);
        border: 1px solid var(--app-border);
        border-radius: 0.25rem;
        padding: 0.5rem;
        display: grid;
        gap: 0.25rem;
        min-width: 12rem;
        z-index: 2;
      }
    }

    .data-grid-footer-center-column {
      grid-area: data-grid-footer-center;
      display: flex;
      align-items: center; 
      justify-content: center;
      text-align: center;
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: 0.033rem;
      font-size: 1.2rem;
      color: var(--app-text-muted);
      gap: 0.5rem;

      .selected-count {
        font-size: 0.75rem;
        letter-spacing: normal;
      }
    }
    
    .data-grid-footer-right-column {
      grid-area: data-grid-footer-right;
      display: flex;
      align-items: center; 
      justify-content: flex-end;
      gap: 0.5rem;

      .action-menu {
        position: relative;
      }

      .action-menu-trigger {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;

        svg {
          width: 0.9rem;
          aspect-ratio: 1 / 1;
        }
      }

      .dropdown-wrapper {
        position: absolute;
        z-index: 1000;
        right: 0;
        bottom: calc(100% + 0.25rem);
        margin: 0;
        padding: 0;
        list-style: none;
        min-inline-size: 11rem;
        background-color: var(--app-surface);
        border: 1px solid var(--app-border);
        box-shadow: var(--app-shadow);
        transform-origin: bottom;
        transition: transform 200ms ease, opacity 200ms ease, visibility 200ms ease;

        &[aria-expanded="true"] {
          transform: scaleY(1);
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }

        &[aria-expanded="false"] {
          transform: scaleY(0);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }
      }

      .dropdown-item button {
        inline-size: 100%;
        border: 0;
        background: transparent;
        text-align: left;
        padding: 0.5rem 0.75rem;
        color: var(--app-text);

        &:hover,
        &:focus-visible {
          outline: none;
          cursor: pointer;
          background: var(--clr-primary);
          color: var(--clr-text-light);
        }

        &:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
      }
    }
  }
`

export default StyledDataGrid