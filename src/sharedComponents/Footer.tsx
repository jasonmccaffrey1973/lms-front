import styled from "styled-components"

type FooterProps = {
    contentLocation?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly"
}

const Footer = ({ contentLocation = "center", children }: React.PropsWithChildren<FooterProps>) => (
    <StyledFooter $contentLocation={contentLocation}>
        {children} 
    </StyledFooter>
)

export default Footer

const StyledFooter = styled.footer<{ $contentLocation: NonNullable<FooterProps["contentLocation"]> }>`
    display: flex;
    justify-content: ${(props) => props.$contentLocation};
    padding: 1rem;
`