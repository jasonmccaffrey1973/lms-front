import styled from 'styled-components';



const StyledUserSettingsPage = styled.div`
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: auto 1fr;
    grid-template-areas: 'user-settings-sidebar user-settings-header' 'user-settings-sidebar user-settings-content' 'user-settings-footer user-settings-footer';
    block-size: calc(100% - 6rem); // Adjust the block size to account for header/footer height/spacing
    margin-inline: 1px;
    background-color: var(--app-bg);
    color: var(--app-text);

    .user-settings-header {
        grid-area: user-settings-header;
        padding: 0.5rem 1rem;
        background-color: var(--app-surface);
        border-bottom: 1px solid var(--app-border);
    }
    .user-settings-sidebar {
        grid-area: user-settings-sidebar;
        overflow-block: auto;
        display: flex;
        flex-direction: column;
        min-inline-size: 12rem;
        padding-block: 1rem;

        button {
            display: flex;
            border: none;
            background-color: transparent;
            cursor: pointer;
            text-align: left;
            align-items: center;
            block-size: 3rem;
            inline-size: 100%; 
            padding-inline: 1rem;
            color: var(--app-text);
            border: transparent 1px solid;
            border-radius: 0rem;
            transition: background-color 300ms, border-bottom 100ms;

            &:focus-within, &:hover  {
                background-color: var(--app-surface-muted);
            }

            &:focus {
                outline: none;
            }

            &:focus-visible {
                outline: 2px solid var(--editor-focus-ring);
                outline-offset: -2px;
            }

            &.active {
                pointer-events: none;
                background-color: var(--app-surface-muted-active);
                border-bottom: 2px solid var(--clr-primary);
            }
        }
    }
    .user-settings-content {
        grid-area: user-settings-content;
        overflow-block: auto;
        background-color: var(--app-surface);
        padding: 1rem;
    }
    .user-settings-footer {
        grid-area: user-settings-footer;
    }
`;

export { StyledUserSettingsPage };