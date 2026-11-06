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
`;

export {StyledSettingsWrapper, StyledTab, StyledTabWrapper, StyledSettingsPageWrapper};