import styled from "styled-components";

const StyledHelpDialog = styled.div`
--_min-inline-size: 20rem;
  --_max-inline-size: 100vw - 2rem;
  display: flex;
  inline-size: clamp(var(--_min-inline-size, 10rem), 118rem, var(--_max-inline-size, 100vw - 2rem));
  max-inline-size: calc(100vw - 2rem);
  block-size: calc(100% + 1rem);
  max-block-size: calc(100dvh - 2rem);
  overflow-block: auto;
  margin-inline-start: -0.5rem; // Overlap the container padding
  margin-block-start: -0.5rem; // Overlap the container padding

  .tab-wrapper {
    --_tab-border-color: transparent;
    background-color: var(--editor-surface-subtle);
    box-shadow: inset -0.125rem 0.125rem 0.125rem hsla(0, 0%, 0%, 0.10);
    padding-block-start: 0.5rem;

    .tabs {
      list-style: none;
      padding: 0;
      margin: 0;
      block-size: 100%;
      
    }

    .tab {
      cursor: pointer;
      border-block-end: 2px solid var(--_tab-border-color);
      transition: background-color 250ms ease;
      padding-inline-start: 0.5rem;
      
      button {
        inline-size: 100%;
        block-size: calc(100% + 1rem);
        white-space: nowrap;
        text-transform: uppercase;
        font-size: 0.875rem;
        font-weight: 300;
        padding-block: 0.83rem;
        padding-inline: 1.33rem;
        border-color: transparent;
        place-items: end;
      }
      
      &[aria-selected="true"] {
        --_tab-border-color: var(--clr-primary);
        background-color: var(--editor-tab-active);
        pointer-events: none;
        padding-inline-start: 0;
        margin-inline-start: 0.5rem;

        button {
          font-weight: 600;
        }
      }

      &:hover {
        background-color: var(--editor-tab-hover);
      }
    }

  }

  .content-wrapper {
    background-color: var(--editor-tab-active);
    inline-size: 100%;
    padding-inline: 1rem;

    .help-section-header {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-template-areas: "title search";
      gap: 0.75rem;
      border-block-end: 1px solid var(--editor-border);
      inline-size: 100%;

      h3 {
        grid-area: title;
        margin: 0;
        padding-block: 0.5rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-size: 1.15rem;
        flex-shrink: 0;
      }

      .help-search {
        grid-area: search;
        justify-self: end;
      }

      @media (max-width: 600px) {
        grid-template-columns: 1fr;
        grid-template-areas:
          "title"
          "search";
      }
    }

    .help-section-body {
      block-size: 20lh;
      max-block-size: 80dvh;
      overflow-block: auto;
      
    }
    
    .help-section-footer {
      border-block-start: 1px solid var(--editor-border);
    }
  }
`;

const StyledSearchForm = styled.form`
--_border-color: var(--editor-border);

  display: flex;
  flex-grow: 1;
  margin-block: 0.25rem;
  position: relative;
  border: 1px solid var(--_border-color);
  border-radius: 0.5rem;
  overflow: hidden;

  &:focus-within {
    --_border-color: var(--clr-primary);
  }
  
  input[type="search"] {
    inline-size: 100%;
    min-inline-size: 20rem;
    padding: 0.5rem;
    border: 1px solid var(--editor-border);
    border-radius: 0.25rem;
    font-size: 1rem;
    padding-inline-end: 2.5rem; /* to make space for the search button */
  }

  button {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    border: none;
    background: none;
    cursor: pointer;
    block-size: calc(100% + 2px);
    outline: none;
    border-inline-start: 1px solid var(--editor-border);

    &:hover, &:focus-visible {
      background-color: var(--clr-primary);
    }

  }
`;

export { StyledSearchForm, StyledHelpDialog };