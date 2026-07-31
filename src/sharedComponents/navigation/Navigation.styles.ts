import styled from "styled-components"

interface NavigationStylesProps {
    linkColor?: string;
    hoverBgColor?: string;
}

const StyledNavigationList = styled.ul<NavigationStylesProps>`
    list-style: none;
    padding: 0;
    margin: 0;

    .nav-item {

        &:not(:last-child) {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        a {
            text-decoration: none;
            color: ${props => props.linkColor || "inherit"};
            padding: 0.6125rem 1rem;
            min-inline-size: 15rem;
            display: block;

            &:hover {
                background-color: ${props => props.hoverBgColor || "hsla(0 0% 0% / 0.10)"};
            }
        }
    }
`


const StyledCategoryTrigger = styled.button<NavigationStylesProps>`
    --_indicator-rotation: 225deg;
    --_indicator-size: 2px;
    --_transition-duration: 200ms;
    background: inherit;
    border: inherit;
    font: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;    
    color: ${props => props.linkColor || "inherit"};
    padding: 0.6125rem 1rem;
    min-inline-size: 15rem;
    cursor: pointer;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: ${props => props.hoverBgColor || "hsla(0 0% 0% / 0.10)"};
    }

    & > span:last-child {
        display: inline-block;
        transform: rotate(var(--_indicator-rotation));
        transition: transform var(--_transition-duration) ease-in-out;
        aspect-ratio: 1 / 1;
        border-inline-start: var(--_indicator-size) solid currentColor;
        border-block-end: var(--_indicator-size) solid currentColor;
        inline-size: 0.7rem;
    }
    

    &[aria-expanded="true"] {
        --_indicator-rotation: 315deg;
    }
`;


const StyledList = styled.ul`
    --_transition-duration: 300ms;
    display: grid;
    grid-template-rows: 0fr;
    opacity: 0;
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: inherit;
    transition: grid-template-rows var(--_transition-duration) ease-in-out , opacity var(--_transition-duration) ease-in-out;
    
    .list-wrapper {
        overflow-block: hidden;
    }
    
    .nav-item {
        text-indent: 1.2rem;
        padding-block: 0.125rem;
    }

    &[aria-expanded="true"] {
        grid-template-rows: 1fr;
        opacity: 1;
    }

`; 

export { StyledCategoryTrigger, StyledNavigationList, StyledList }
    