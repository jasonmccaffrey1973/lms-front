import styled from 'styled-components';

const selectedTabBackgroundColor = 'var(--_color-ribbon-tab-active, hsl(215, 16%, 85%))';
const minTabWidth = '8rem';

interface StyledEditorRibbonTabProps {
    isActive?: boolean;
}       

const StyledEditorRibbon = styled.ul`
  position: relative;
  display: flex;
  list-style: none;
  padding: 0px;
  margin: 0px;
  background-color: var(--_color-ribbon-background, hsl(0, 0%, 94%));
  border-inline: 1px solid rgba(0, 0, 0, 0.08);
`;

const StyledEditorRibbonTab = styled.li<StyledEditorRibbonTabProps>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    list-style-type: none;
    min-inline-size: ${minTabWidth};
    padding-block: 0.66rem 0.5rem;
    cursor: pointer;
    border-right: 1px solid rgba(0, 0, 0, 0.08);
    border-bottom: 0.125rem solid transparent;
    outline: none;
    transition: background-color 0.15s ease;

    &::marker {
        content: "";
    }
    
    &:hover, &:focus-within {
        background-color: var(--_color-ribbon-tab-hover, hsl(216, 26%, 93%));
    }

    &[aria-selected="true"] {
        background-color: ${selectedTabBackgroundColor};
        border-block-end: 0.125rem solid var(--_color-ribbon-tab-active-border, #2f6feb);
        box-shadow: inset 2px 2px 0 0 rgba(0, 0, 0, 0.08), inset -2px -2px 0 0 rgba(255, 255, 255, 0.05);
    }
    `;

const StyledEditorRibbonTabLabel = styled.span`
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    font-size: 0.8rem;
    `;

const StyledEditorRibbonTabItemsWrapper = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    list-style: none;
    list-style-type: none;
    padding: 0.5rem;
    margin: 0;
    display: flex;
    gap: 0.5rem;
    background-color: ${selectedTabBackgroundColor};
    border: 1px solid rgba(0, 0, 0, 0.08);

    &::marker {
        content: "";
    }
    `;

const StyledEditorRibbonItem = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    list-style: none;
    list-style-type: none;
    margin: 0;
    padding: 0.5rem;
    cursor: pointer;

    &::marker {
        content: "";
    }

    &:hover {
        background-color: var(--_color-ribbon-item-hover, #e0e0e0);
    }

    .item-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
    }

    .ribbon-item-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
    }

    .ribbon-item-label {
        font-size: 0.75rem;
        line-height: 1.2;
    }
    `;

export { StyledEditorRibbon, StyledEditorRibbonItem, StyledEditorRibbonTab, StyledEditorRibbonTabLabel, StyledEditorRibbonTabItemsWrapper };

