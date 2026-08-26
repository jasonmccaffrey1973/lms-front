import styled from 'styled-components';

const selectedTabBackgroundColor = 'var(--editor-tab-active)';
const minTabWidth = '8rem';

interface StyledEditorRibbonTabProps {
    isActive?: boolean;
}       

const StyledEditorRibbon = styled.div`
    display: flex;
    flex-direction: column;
    inline-size: 100%;
    background-color: var(--editor-surface-muted);
    border: 1px solid var(--editor-border);
    border-bottom: none;
    border-radius: 0.5rem 0.5rem 0 0;
`;

const StyledEditorRibbonTabs = styled.ul`
    position: relative;
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    background-color: var(--editor-surface-muted);
    border-bottom: 1px solid var(--editor-border);

    &::marker {
        content: "";
    }
`;

const StyledEditorRibbonTab = styled.li<StyledEditorRibbonTabProps>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    list-style-type: none;
    min-inline-size: ${minTabWidth};
    padding-block: 0.5rem 0.4rem;
    cursor: pointer;
    border-right: 1px solid var(--editor-border);
    border-bottom: 0.125rem solid transparent;
    outline: none;
    transition: background-color 0.15s ease;

    &::marker {
        content: "";
    }
    
    &:hover, &:focus-within {
        background-color: var(--editor-tab-hover);
    }

    &[aria-selected="true"] {
        background-color: ${selectedTabBackgroundColor};
        border-block-end: 0.125rem solid var(--editor-tab-active-border);
        box-shadow: inset 2px 2px 0 0 rgba(0, 0, 0, 0.08), inset -2px -2px 0 0 rgba(255, 255, 255, 0.05);
    }
    `;

const StyledEditorRibbonTabLabel = styled.span`
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    font-size: 0.75rem;
    color: var(--editor-text);
    `;

const StyledEditorRibbonTabItemsWrapper = styled.div`
    position: relative;
    inline-size: 100%;
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0.4rem 0.55rem;
    margin: 0;
    background-color: ${selectedTabBackgroundColor};
    border-bottom: 1px solid var(--editor-border);
    `;

const StyledEditorRibbonGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    padding: 0.2rem 0.28rem;
    background: var(--editor-surface-subtle);
    border: 1px solid var(--editor-border);
    border-radius: 0.3rem;
    `;

const StyledEditorRibbonGroupLabel = styled.span`
    font-size: 0.64rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--editor-text-muted);
    `;

const StyledEditorRibbonGroupItems = styled.ul`
    list-style: none;
    list-style-type: none;
    display: flex;
    gap: 0.2rem;
    padding: 0;
    margin: 0;

    &::marker {
        content: "";
    }
    `;

const StyledEditorRibbonItem = styled.li<{ $isActive?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    list-style: none;
    list-style-type: none;
    margin: 0;
    padding: 0.4rem 0.5rem;
    cursor: pointer;
    border-radius: 0.3rem;
    background: ${({ $isActive }) => ($isActive ? "var(--editor-item-active-bg)" : "transparent")};
    border: 1px solid ${({ $isActive }) => ($isActive ? "var(--editor-item-active-border)" : "transparent")};
    color: var(--editor-text);

    &::marker {
        content: "";
    }

    &:hover {
        background-color: var(--editor-item-hover);

        svg {
            opacity: 1;
        }
    }

    .item-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.2rem;
        block-size: fit-content;
        min-block-size: 2rem;
    }

    svg {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        fill: currentColor;
        opacity: 0.7;
        transition: opacity 0.15s ease;
        height: 2rem;
    }

    .ribbon-item-label {
        font-size: 0.7rem;
        line-height: 1.2;
    }
    `;

export { StyledEditorRibbon, StyledEditorRibbonTabs, StyledEditorRibbonItem, StyledEditorRibbonTab, StyledEditorRibbonTabLabel, StyledEditorRibbonTabItemsWrapper, StyledEditorRibbonGroup, StyledEditorRibbonGroupLabel, StyledEditorRibbonGroupItems };

