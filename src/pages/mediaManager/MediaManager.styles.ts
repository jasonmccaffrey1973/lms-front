import styled from "styled-components";

const StyledMediaManagerPage = styled.section`

--_tab-height: 1.5rem;

  display: grid;
  padding: 1rem;
  inline-size: 100%;

  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto 1fr auto;
  grid-template-areas:
    "tabbar header"
    "ribbon ribbon"
    "content content"
    "footer footer";
`;

const StyledHeader = styled.header`
    grid-area: header;
    display: flex;
    align-items: center;
    justify-content: center;
    inline-size: 100%;
    font-size: 1.25rem;
    font-weight: bold;
    block-size: var(--_tab-height);
`;


const StyledTabBar = styled.ul`
    grid-area: tabbar;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 0.25rem;
    margin-bottom: 1rem;
    block-size: var(--_tab-height);
    `;

const StyledTab = styled.li`

  --_tab-highlight-color: transparent;

  padding: 0.5rem 1rem;
  border-block-start: 1px solid var(--editor-border);
  border-block-end: 2px solid var(--_tab-highlight-color);
  border-inline-start: 1px solid var(--editor-border);
  border-radius: 0.4rem 0.4rem 0 0;
  background-color: var(--editor-surface-muted);
  block-size: fit-content;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  &:hover, &:focus-within, &:active, &[aria-selected="true"] {
      background-color: var(--editor-tab-active);
    }

    &[aria-selected="true"] {
      --_tab-highlight-color: var(--clr-primary);
    }

    &:last-child {
      border-inline-end: 1px solid var(--editor-border);
    }
`;

const StyledRibbon = styled.ul`
  grid-area: ribbon;
  inline-size: 100%;
  margin: 0;
  margin-block-start: -4px;
  padding: 0.5rem;
  list-style: none;
  background-color: var(--editor-tab-active);
  box-shadow: 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  border: 1px solid var(--editor-border);

  .button-wrapper {
      background-color: var(--editor-surface-subtle);
      border: 1px solid var(--editor-border);
      inline-size: fit-content;
      padding: 0 0.5rem 0.5rem 0.5rem;
      border-radius: 0.5rem;
      position: relative;
      
      label {
        font-size: 0.64rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--editor-text-muted);
    }
    
    .icons {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 0.25rem;
    }

      button {
        border-radius: 0.5rem;
        font-size: 0.6rem;
        text-transform: uppercase;
        letter-spacing: 0.05rem;
        padding: 0.5rem;
        opacity: 0.8;

        svg {
          margin-block-end: 0.75rem;
          height: 2rem;
        }

        &:hover {
          opacity: 1;
        }
      }
  }

  `;

const StyledContent = styled.div`
  grid-area: content;
  inline-size: 100%;
  block-size: 100%;
  overflow-block: auto;
  border: 1px solid var(--editor-border);
  box-shadow: 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  `;

const StyledFooter = styled.footer`
  grid-area: footer;
  inline-size: 100%;
  block-size: 3rem;
  background-color: var(--editor-surface);
  border: 1px solid var(--editor-border);
  border-block-start: none;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
  gap: 1rem;
  box-shadow: 0.25rem 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
`;

export {StyledMediaManagerPage, StyledTabBar, StyledTab, StyledRibbon, StyledContent, StyledHeader, StyledFooter };