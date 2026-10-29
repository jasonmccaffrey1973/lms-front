import { Link } from 'react-router-dom';
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

const StyledCreateProjectSection = styled.section`
    margin-top: 1rem;
    margin-bottom: 1rem;
`;

const StyledProjectForm = styled.form`
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;

    input {
        flex: 1;
        padding: 0.625rem 0.75rem;
        border: 1px solid var(--app-border);
        border-radius: 0.5rem;
        background: var(--app-background);
        color: var(--app-text);
        font: inherit;
    }

    button {
        padding: 0.625rem 0.875rem;
        border: 0;
        border-radius: 0.5rem;
        background: var(--clr-primary, #2563eb);
        color: white;
        cursor: pointer;
    }
`;

const StyledProjectOverview = styled.div`
    margin-top: 1.5rem;
    padding: 1rem;
    border: 1px solid var(--app-border);
    border-radius: 0.75rem;
    background: var(--app-surface);

    .overview-title {
        font-weight: 600;
    }

    .overview-details {
        margin-top: 0.5rem;
        display: grid;
        gap: 0.25rem;
    }

    .scene-tags {
        margin-top: 0.75rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .scene-tag {
        display: inline-flex;
        padding: 0.25rem 0.5rem;
        border-radius: 999px;
        background: rgba(88, 166, 255, 0.12);
        font-size: 0.8rem;
    }
`;

const StyledAssetGrid = styled.div`
    margin-top: 1.5rem;
    display: grid;
    gap: 0.75rem;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
`;

const StyledAssetCard = styled(Link)`
    display: block;
    border: 1px solid var(--app-border);
    border-radius: 0.75rem;
    padding: 1rem;
    text-decoration: none;
    color: inherit;
    background: var(--app-surface);

    strong {
        display: block;
    }

    p {
        margin: 0.5rem 0 0;
        color: var(--app-text-muted);
    }
`;

const StyledAssetSelector = styled.div`
    margin-top: 1rem;
    display: grid;
    gap: 0.75rem;
    max-width: 28rem;

    label {
        display: grid;
        gap: 0.25rem;
    }

    select,
    input {
        width: 100%;
        padding: 0.625rem 0.75rem;
        border: 1px solid var(--app-border);
        border-radius: 0.5rem;
        background: var(--app-background);
        color: var(--app-text);
        font: inherit;
    }
`;

export {
    StyledVideoProductionPage,
    StyledFormItem,
    StyledCreateProjectSection,
    StyledProjectForm,
    StyledProjectOverview,
    StyledAssetGrid,
    StyledAssetCard,
    StyledAssetSelector,
};