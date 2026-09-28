import styled from "styled-components";

const StyledZoomForm = styled.form`
inline-size: 100%;
box-sizing: border-box;
display: grid;
grid-template-columns: minmax(0, 1fr);
grid-template-rows: auto 1fr auto;
grid-template-areas:    "zoom-header"
                        "zoom-body"
                        "zoom-footer";
block-size: min-content;
/* border: 1px solid var(--app-border); */
border-radius: 0.5rem;

    .zoom-header {
        grid-area: zoom-header;
        text-transform: uppercase;
        font-size: 0.75rem;
        padding-inline: 0.5rem;
        padding-block: 0.125rem;
        color: var(--app-text-muted);
    }

    .zoom-body {
        grid-area: zoom-body;
        min-inline-size: 0;
    }

    .zoom-footer {
        grid-area: zoom-footer;
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
        padding: 0.25rem 0.33rem;

        button {
            font-size: 0.66rem;
            padding-inline: 0.5rem; 
            padding-block: 0.33rem; 
        }
    }
`;

const StyledZoomSelector = styled.div`
inline-size: 100%;
box-sizing: border-box;
display: grid;
grid-template-columns: minmax(4.5rem, auto) minmax(0, 1fr);
grid-template-rows: repeat(2, minmax(0, 1fr));
grid-template-areas:    "zoom-reset custom-level" 
                        "zoom-reset standard-levels";
block-size: min-content; 

padding: 0.5rem;
border-block: 1px solid var(--app-border);
gap: 0.33rem;
box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
background-color: var(--app-surface);

    .reset-wrapper {
        grid-area: zoom-reset;
        display: grid;
        place-items: center;
        block-size: 100%;
        padding: 0.5rem 0.5rem 0.5rem 0;

        border-inline-end: 1px solid var(--app-border);
    }

    .zoom-reset {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: var(--app-surface-muted);
        color: var(--app-text-muted);
        box-shadow: 0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.1);
        border: 1px solid var(--app-border);
        block-size: 4rem;

        svg {
            fill: currentColor;
        }

        &:hover {
            background-color: var(--editor-tab-active);
            color: var(--app-text);
            box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.1);
        }
    }

    
    .custom-level-wrapper {
        grid-area: custom-level;
        min-inline-size: 0;
        display: grid;
        grid-template-columns: 2rem 1fr 2rem;
        grid-template-rows: 1fr;
        grid-template-areas: "zoom-out custom-level zoom-in";
        justify-content: center;
        align-items: center;
        inline-size: 100%;
        gap: 0.33rem;

        input[type="range"] {
            grid-area: custom-level;
            inline-size: 100%;
            min-inline-size: 0;
            box-sizing: border-box;
        }

        .zoom-out,
        .zoom-in {
            color: var(--app-text-muted);
            border: 1px solid transparent;
            svg {
                fill: currentColor;
                height: 1.5rem;
            }
            
            &:hover {
                background-color: var(--editor-tab-active);
                color: var(--app-text);
                box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.1);
                border: 1px solid var(--app-border);
            }
        }

        .zoom-out {
            grid-area: zoom-out;
        }

        .zoom-in {
            grid-area: zoom-in;
        }
    }
    .standard-levels {
        grid-area: standard-levels;
        inline-size: 100%;
        min-inline-size: 0;
        display: none;
        block-size: min-content;
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        gap: 0.5rem;
        overflow-x: auto;

        button {
            background-color: var(--app-surface-muted);
            color: var(--app-text-muted);
            box-shadow: 0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.1);
            border: 1px solid transparent;
            font-size: 0.66rem;
            padding: 0.33rem 0.5rem;

            svg {
                fill: currentColor;
                height: 1.5rem;
            }

            &:hover {
                background-color: var(--editor-tab-active);
                color: var(--app-text);
                box-shadow: inset 0 0 0.5rem rgba(0, 0, 0, 0.1);
                border: 1px solid var(--app-border);
            }
        }
    }

`;

export { StyledZoomSelector, StyledZoomForm };
