import styled from "styled-components";

const StyledThemeMenu = styled.div`
    position: relative;

    .dropdown-wrapper {
        position: absolute;
        z-index: 1000;
        top: 2.33rem;
        right: 0;
        margin: 0;
        padding: 0;
        background-color: var(--app-surface);
        list-style: none;
        border: 1px solid var(--editor-border);
        box-shadow: var(--app-shadow);
        min-inline-size: 12rem;
        transform-origin: top;
        transition: transform 200ms ease, opacity 200ms ease, visibility 200ms ease;

        &[aria-expanded="true"] {
            transform: scaleY(1);
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
        }

        &[aria-expanded="false"] {
            transform: scaleY(0);
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }

    }

    .theme-trigger {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--app-text-muted);
        font-size: 0.75rem;
        text-transform: uppercase;

        svg {
            width: 1rem;
            aspect-ratio: 1 / 1;
        }

        &:focus {
            outline: none;
        }

        &:focus-visible, &:hover {
            cursor: pointer;
            outline: 2px solid var(--clr-primary);
            outline-offset: 0;
            box-shadow: none;
        }
    }

    .dropdown-item button {
        display: grid;
        inline-size: 100%;
        grid-template-columns: 2.5rem 1fr 1.75rem;
        grid-template-areas: "icon label check";
        background-color: transparent;
        border: none;
        padding: 0;
        
        & > * {
            display: flex;
            align-items: center;
            block-size: 2.33rem;
        }

        & svg {
            width: 1rem;
            aspect-ratio: 1 / 1;
        }

        &:focus {
            outline: none;
        }

        &:focus-visible, &:hover {
            cursor: pointer;
            outline: none;
            background-color: var(--clr-primary);
            color: var(--clr-text-light);
            
            & > * {
                background-color: var(--clr-primary);
                color: var(--clr-text-light);
            }
        }

        &[aria-checked="true"], :active {
            pointer-events: none;
        }
    }

    .theme-icon-wrapper {
        grid-area: icon;
        border-inline-end: 1px solid var(--editor-border);
        background-color: var(--app-surface-muted);
        justify-content: center;
    }

    .theme-label-wrapper {
        grid-area: label;
        margin-inline-start: 0.5rem;
    }

    .theme-check-wrapper {
        grid-area: check;
    }
`;  

export { StyledThemeMenu }
    
    
    
