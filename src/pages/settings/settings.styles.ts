import styled from 'styled-components';

const StyledSettingsWrapper = styled.div`
  width: 100%;
  margin-block-start: -1rem;
`;


const StyledTabWrapper = styled.ul`
  list-style: none;
  padding: 0px;
  display: flex;
  background-color: var(--app-surface);
  border-block-end: 1px solid var(--app-border);
  padding-block-start: 0.5rem;
  gap: 0.5rem;
  align-items: flex-end;

  .tab-actions {
    display: flex;
    align-items: center;
    margin-inline-start: auto;
    padding: 0 0.5rem 0.25rem;
    list-style: none;

    button {
      display: flex;
      gap: 0.5rem;

      svg {
        width: 1.5em;
        aspect-ratio: 1 / 1;
      }
    }
  }
  `;

  const StyledTab = styled.li`
  --_bottom-tab-border: transparent;
  --_background-color: var(--app-surface);    
  --_bottom-tab-border: var(--app-border);
    padding: 0.5rem 1rem;
    cursor: pointer;
    border: 1px solid var(--app-border);
    border-block-end: 2px solid var(--_bottom-tab-border);
    border-radius: 0.25rem 0.25rem 0 0;
    pointer-events: auto;
    background-color: var(--_background-color);
    transition: background-color 250ms ease-in-out, border 250ms ease-in-out;
    &:first-of-type {
      margin-inline-start: 0.5rem;
    }

    &:hover {
      --_bottom-tab-border: var(--clr-info);
      --_background-color: var(--editor-item-hover);
    }
    
    &[aria-selected='true'] {
      --_bottom-tab-border: var(--clr-primary);
      --_background-color: var(--editor-item-hover);
      pointer-events: none;
    };
  `;

const StyledSettingsPageWrapper = styled.div`
  padding-inline: 1rem;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: var(--_background-color);
  color: var(--app-text);

  .ai-settings-heading { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
  .ai-settings-heading h1 { margin-block: 0.75rem 0.25rem; font-size: 1.4rem; }
  .ai-settings-heading p { margin-block: 0 0.75rem; color: var(--app-text-muted); }
  @media (max-width: 540px) { .ai-settings-heading { align-items: flex-start; flex-direction: column; } }
`;

export {StyledSettingsWrapper, StyledTab, StyledTabWrapper, StyledSettingsPageWrapper};
