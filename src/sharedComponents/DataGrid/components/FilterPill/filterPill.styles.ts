import styled from "styled-components"

const StyledPillWrapper = styled.div`
--_text-color: var(--editor-text-muted);
position: relative;

&:hover {
    --_text-color: hsl(from var(--editor-text-muted) h s calc(l + 10%));
}

    .filter-pill {
        inline-size: 100%;
        border-radius: 5rem;
        color: var(--_text-color);
        cursor: pointer;
        transition: color 0.2s ease;
    }

    .filter-pill-close {
        position: absolute;
        inset-inline-end: 0;
        top: 0;
        transform: translate(33%, -33%) scale(0.92);
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        padding: 0.25rem;
        background-color: var(--editor-surface);
        color: var(--_text-color);
        border: 1px solid var(--app-border);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease, transform 0.2s ease, color 0.2s ease;
        svg {
            fill: currentColor;
        }

        &:hover {
            background-color: hsl(from var(--clr-danger) h s l / 0.5);
        }
    }

    &:hover .filter-pill-close,
    &:focus-within .filter-pill-close {
        opacity: 1;
        pointer-events: auto;
        transform: translate(33%, -33%) scale(1);
    }
`

export { StyledPillWrapper }