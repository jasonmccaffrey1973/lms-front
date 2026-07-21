import styled from "styled-components"


interface LogoStylesProps {
    imageColor?: string;
    textColor?: string;
}


const StyledLogo = styled.svg<LogoStylesProps>`

--_imageColor: ${props => props.imageColor || "hsl(0, 100%, 56.5%)"};
--_textColor: ${props => props.textColor || "hsl(0, 100%, 16.5%)"};

block-size: 100%;
max-block-size: 2.75rem;
aspect-ratio: 54/10;
fill: none;

#logomark {
    path {
        fill: var(--_imageColor);
    }
}

#logotype {
    path {
        fill: var(--_textColor);
    }
}
`

export default StyledLogo