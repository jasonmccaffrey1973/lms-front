import StyledFooter from "./Footer.styles"
import type { FooterProps } from "./Footer.types"

const Footer = ({ contentLocation = "center", children }: React.PropsWithChildren<FooterProps>) => (
    <StyledFooter $contentLocation={contentLocation}>
        {children ? 
            children :
            <div className="footer-content">
                <div className="footer-logo">
                    Logo
                </div>
                <div className="footer-link-column">
                    links 1
                </div>
                <div className="footer-link-column">
                    links 2
                </div>
            </div>} 
    </StyledFooter>
)

export default Footer

