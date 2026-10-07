import styled from 'styled-components';

const StyledVideoProductionPage = styled.div`
width: 100%;
margin-block-start: -0.83rem;

ul[role="tablist"] {
    list-style: none;
    padding: 0;
    display: flex;
    border-bottom: 1px solid var(--app-border);
    background-color: var(--app-surface);
    padding-block-start: 1rem;
    padding-inline: 0.5rem;
    gap: 0.33rem;

    a {
        text-decoration: none;
        color: inherit;
    }
}

li[role="tab"] {
--_border-color: 'transparent';
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    button{
        cursor: pointer;
        border-radius: 0.33rem 0.33rem 0 0;
        cursor: pointer;
        background-color: var(--app-surface);
        border: 1px solid var(--app-border);
        border-block-end: 2px solid var(--_border-color);
        color: var(--app-text);

        &:hover {
            background-color: var(--editor-item-hover);
        }
    }
    
    &[aria-selected="true"] {
        --_border-color: var(--clr-primary);
        pointer-events: none;
        button{
            background-color: var(--editor-item-hover);
        }
    }
}

.page-body {
    padding: 0 1rem;
}

`;

export { StyledVideoProductionPage };