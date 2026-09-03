import styled from "styled-components";

const AttachURLWrapper = styled.div`

inline-size: fit-content;
display: grid;
min-inline-size: 20rem;
grid-template-areas:
    "recent-urls"
    "input";
    
.category-label {
    grid-column: 1 / -1;
    display: block;
    width: 100%;
    font-size: 0.7rem;
    line-height: 1.2;
    margin-bottom: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
}

.recent-urls-wrapper, .input-wrapper {
    border-block-end: 1px solid var(--editor-border, hsl(30, 6%, 88%));
    padding-block-end: 0.5rem;
    inline-size: 100%;
}

.recent-urls-wrapper {
    grid-area: recent-urls;
}

.input-wrapper {
    grid-area: input;
}

.recent-urls {
    list-style: none;
    padding: 0.5rem;
    margin: 0.5rem;
    display: flex;
    flex-direction: column;
    background-color: var(--editor-surface-subtle);
    border: 1px solid var(--editor-border);
    border-radius: 0.25rem;
    border-block-end: 1px solid var(--editor-border, hsl(30, 6%, 88%));
    padding-block-end: 0.5rem;

    li {
        padding: 0.25rem 0.5rem;
        font-size: 0.9rem;
        color: var(--editor-text);

        &:hover, &:focus-within {
            background-color: var(--editor-surface-hover);
            cursor: pointer;
            outline: 1px solid var(--clr-primary);
        }
    }

}

form {
    input {
        padding-block: 0.5rem;
        padding-inline: 0.33rem;
        width: 100%;
        border-radius: 0.25rem;
        border: 1px solid var(--editor-border, hsl(30, 6%, 88%));
        outline: none;

        &:focus-within {
            border-color: var(--clr-primary);
        }
    }

    label {
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-weight: 600;
    }

    button {
        margin-block-start: 0.75rem;
        margin-inline-start: auto;
        display: block;
    }
}
`;


export { AttachURLWrapper };