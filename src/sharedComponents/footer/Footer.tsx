import StyledFooter from "./Footer.styles"
import type { FooterProps } from "./Footer.types"

const Footer = ({ contentLocation = "center", children }: React.PropsWithChildren<FooterProps>) => (
    <StyledFooter $contentLocation={contentLocation}>
        {children} 
    </StyledFooter>
)

export default Footer

