import styled from 'styled-components';

const StyledVideoProductionPage = styled.div`
width: 100%;
margin-block-start: -0.83rem;

ul[role="tablist"] {
    list-style: none;
    padding: 0;
    display: flex;
    background-color: var(--app-surface);
    border-bottom: 1px solid var(--app-border);
    
    .left-area {
        flex: 1;
        display: flex;
        padding-block-start: 1rem;
        padding-inline: 0.5rem;
        gap: 0.33rem;
    
        a {
            text-decoration: none;
            color: inherit;
        }
    }

    .right-area {
        display: flex;
        align-items: center;
        padding-inline: 0.5rem;
        gap: 0.33rem;

        button {
            display: flex;
            align-items: center;

            svg {
                width: 1.33rem;
                height: 1.33rem;
                margin-inline-end: 0.33rem;
            }
        }


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

const StyledFormItem = styled.div`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-areas: "label input";
    gap: 0.5rem;
    width: 100%;
    min-width: 20rem;
    margin-block: 0.75rem;

    label {
        grid-area: label;
        width: max-content;
        min-width: 5rem;
    }
    input {
        grid-area: input;
        flex: 1 1 0%;
        padding: 0.33rem 0.625rem;
        font-size: 1rem;
        border-radius: 0;
        border: 1px solid var(--app-border);
    }
`;

export { StyledVideoProductionPage, StyledFormItem };