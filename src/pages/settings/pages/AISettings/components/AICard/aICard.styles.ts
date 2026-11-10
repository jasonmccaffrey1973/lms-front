import styled from "styled-components";

const StyledAICard = styled.div`

display: grid;
grid-template-rows: auto minmax(0, 0fr) auto;
grid-template-areas:
    "ai-card-header"
    "ai-card-content"
    "ai-card-footer";
grid-template-columns: 1fr;
border: 1px solid var(--editor-border);
border-radius: 0.25rem;
margin-block-end: 0.5rem;
overflow: clip;
transition: grid-template-rows 300ms ease;

&[data-expanded="true"] {
    grid-template-rows: auto minmax(0, 1fr) auto;
}

* > {
    padding: 0.5rem;
}



header {
    grid-area: ai-card-header;
    display: flex;
    gap: 1rem;
    border: 1px solid var(--editor-border);
    background: var(--editor-surface-muted);

    button {
        --_color: var(--app-text);
        border: 1px solid transparent;
        background: none;
        cursor: pointer;
        outline: none;
        color: var(--_color);
        
        &:focus-within {
            border: 1px solid var(--app-link-hover);
        }

        &:hover {
            --_color: var(--app-text-muted);
        }
    }

    .title {
        flex: 1;
        justify-content: flex-start;
        width: 100%;

          &:active:not(:disabled) {
            transform: none;
        }
    }

    .edit-button {
        svg {
            height: 70%;
            aspect-ratio: 1 / 1;
            fill: currentcolor;
        }      
    }

}

.content {
    grid-area: ai-card-content;
    min-block-size: 0;
    overflow: hidden;
    padding-inline: 0.5rem;
    padding-block: 0;
    opacity: 0;
    visibility: hidden;
    transition: padding-block 300ms ease, opacity 200ms ease, visibility 0s linear 300ms;

    &[aria-expanded="true"] {
        padding-block: 0.5rem;
        opacity: 1;
        visibility: visible;
        transition-delay: 0s;
    }
}

footer {
    grid-area: ai-card-footer;
}

`;

export default StyledAICard;


