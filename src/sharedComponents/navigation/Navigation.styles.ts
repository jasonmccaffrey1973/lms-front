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
        padding-block: 0.125rem;

        &:not(:last-child) {
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        a {
            text-decoration: none;
            color: ${props => props.linkColor || "inherit"};
            padding: 0.5rem 1rem;
            min-inline-size: 15rem;
            display: block;

            &:hover {
                background-color: ${props => props.hoverBgColor || "hsla(0 0% 0% / 0.10)"};
            }
        }
    }
`

export default StyledNavigationList
    