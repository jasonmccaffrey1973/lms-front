import styled from "styled-components";

const StyledFileDialog = styled.dialog`

    --_header-background: var(--clr-secondary-dark);
    --_header-text: var(--clr-text-light);

    border: 0.1875rem solid var(--editor-border);
    border-radius: 0.5rem;
    background-color: var(--editor-tab-active);
    box-shadow: -0.5rem -0.5rem 0.5rem hsla(0, 0%, 0%, 0.05);
    inline-size: 100%;
    block-size: 100%;
    margin: 0;
    padding: 0;

    .dialog-wrapper {
        display: grid;
        grid-template-rows: auto 1fr auto;
        grid-template-areas:
            "header"
            "main"
            "footer";
        block-size: 100%;

        & > * {
            padding-block: 0.25rem;
            padding-inline: 0.5rem;
        }
    }

    .dialog-header {
        grid-area: header;
        background-color: var(--_header-background);
        color: var(--_header-text);
        overflow: hidden;
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-areas: "title close";
        justify-content: space-between;
        align-items: center;

        .title {
            grid-area: title;
            padding-block: 0;
            font-size: 1rem;
            font-weight: bold;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }

        .close-button svg {
            block-size: 1.2rem;
            inline-size: 1.2rem;
            fill: var(--_header-text);
            transition: fill 0.2s ease-in-out;
            
        }
    }

    .dialog-main {
        grid-area: main;
        border-block: 0.125rem solid var(--editor-border);
        display: grid;
        grid-template-columns: minmax(60rem, 1fr) 2fr;
        grid-template-rows: 1fr auto;
        grid-template-areas:
            "main-left main-right"
            "file-name main-right";

        .main-left {
            grid-area: main-left;
            padding-block: 0.25rem;
            padding-inline: 0.5rem;
            display: flex;
            flex-direction: column;

            .search-wrapper {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
                .search-label {
                    font-size: 0.875rem;
                }
                input {
                    padding: 0.25rem 0.5rem;
                    font-size: 1.2rem;
                    width: 100%;
                }
            }

            .file-list {
                margin-top: 0.5rem;
                flex: 1;
                overflow-y: auto;
                background-color: var(--editor-surface);
                border: 0.1875rem solid var(--editor-border);
                list-style: none;
                padding: 0.25rem;
                li {
                    padding: 0.25rem 0.5rem;
                    font-size: 1.2rem;
                    &:hover {
                        cursor: pointer;
                        background-color: var(--editor-surface-hover);
                    }
                }

            }
        }

        .main-right {
            grid-area: main-right;
            border-inline-start: 0.1875rem solid var(--editor-border);
            padding: 0.5rem;
        }
        .input-wrapper {
            grid-area: file-name;
            width: 100%;
            padding-block: 0.25rem;
            padding-inline-end: 0.5rem;
            input {
                padding: 0.25rem 0.5rem;
                font-size: 1.2rem;
                width: 100%;
            }
        }
    }

    .dialog-footer {
        grid-area: footer;
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
        button {
            min-block-size: 3rem;
            min-inline-size: 8rem;
            font-weight: 600;
        }   
    }
`;

export { StyledFileDialog };