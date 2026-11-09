import styled from "styled-components"

const mobileBreakpoint = "1400px"

const StyledPageTemplate = styled.div`
    /* --------------------------------------------------------------------------
     * Base layout
     * -------------------------------------------------------------------------- */
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    grid-template-areas: 'template-header'
                         'template-main'
                         'template-footer';
    block-size: 100dvh;

    /* --------------------------------------------------------------------------
     * Header section
     * -------------------------------------------------------------------------- */
    .header-wrapper {
        grid-area: template-header;
        display: grid;
        inline-size: 100%;
        grid-template-columns: 1fr;
        grid-template-areas: 'template-header';

        .sidebar-menu {
            display: none;
        }

        
        @media (max-width: ${mobileBreakpoint}) {
            grid-template-columns: auto 1fr;
            grid-template-areas: 'template-sidebar-menu template-header';
            
            .sidebar-menu {
                --_color: var(--app-text);
                grid-area: template-sidebar-menu;
                display: flex;
                flex-direction: column;
                justify-content: center;
                block-size: 2rem;
                inline-size: 2rem;
                background-color: transparent;
                margin-inline: 0.5rem;
                margin-block: auto;
                border: none;
                cursor: pointer;
                
                .hamburger-menu {
                    --_offset: 0.5rem;
                    display: block;
                    inline-size: 100%;
                    block-size: 2px;
                    background-color: var(--_color);
                    position: relative;
                    border-radius: 2rem;
                    &::before,
                    &::after {
                        content: '';
                        display: block;
                        inline-size: 100%;
                        block-size: 2px;
                        background-color: var(--_color);
                        position: absolute;
                        border-radius: 2rem;
                        transition: transform 250ms ease-in-out;
                        transform-origin: center center;
                    }
                    &::before {
                        top: calc(var(--_offset) * -1);
                    }
                    &::after {
                        bottom: calc(var(--_offset) * -1);
                    }
                }
    
                &:hover,
                &:focus-visible {
                    --_color: var(--app-text-muted);
                }
    
                &[aria-expanded="true"] {
                    .hamburger-menu {
                        --_offset: 0;
                        background-color: transparent;
        
                        
                        &::before {
                            transform: rotate(45deg);
                        }
                        &::after {
                            transform: rotate(-45deg);
                        }
                    }
                }
            }
        }
    }

    /* --------------------------------------------------------------------------
     * Main content area
     * -------------------------------------------------------------------------- */
    .middle {
        grid-area: template-main;
        display: grid;
        grid-template-columns: auto  1fr;
        position: relative;
        overflow: hidden;
        min-block-size: 0;

        @media (max-width: ${mobileBreakpoint}) {
            grid-template-columns: 1fr;
        }
        
        .sidebar {
            position: sticky;
            top: 0;
            a {
                padding-inline: 1rem;
            }

            @media (max-width: ${mobileBreakpoint}) {
                position: absolute;
                block-size: 100%;
                transform: translateX(-100%);
                transition: transform 0.3s ease-in-out;
                z-index: 100;
                background: var(--app-surface);
                border-inline-end: 1px solid var(--app-border);
                &[aria-hidden="false"] {
                    transform: translateX(0);
                }
            }
        }

        main {
            position: relative;
            display: flex;
            align-items: stretch;
            flex: 1 1 auto;
            inline-size: 100%;
            min-block-size: 0;
            box-shadow: inset 0 0 0 1px var(--app-border);

            &[aria-hidden="true"] {
                animation: slideOut 300ms ease forwards;
            }
            &[aria-hidden="false"] {
                animation: slideIn 300ms ease forwards;
            }
        }

        .right-sidebar-wrapper {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 99999;
            padding-inline: 1rem;
            overflow-y: auto;
            min-width: 20rem;
            max-width: 90vw;
            border-inline-start: 1px solid var(--app-border);
            transform: translateX(100%);
            visibility: hidden;
            pointer-events: none;
            transition: transform 300ms ease-in-out, visibility 300ms ease-in-out;

            &[aria-hidden="false"] {
                transform: translateX(0);
                visibility: visible;
                pointer-events: auto;
            }
        }

    }

    /* --------------------------------------------------------------------------
     * Footer section
     * -------------------------------------------------------------------------- */
    &:last-child {
        grid-area: template-footer;
        .footer-content 
        {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            inline-size: min(80rem, 100% - 2rem);
            margin-inline: auto;
        }

    }

    /* --------------------------------------------------------------------------
     * Animation keyframes
     * -------------------------------------------------------------------------- */
    @keyframes slideIn {
        from {
            transform: translateX(120%);
            display: block;
        }
        to {
            transform: translateX(0);
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(120%);
            display: none;
        }
    }
    
`
export default StyledPageTemplate
