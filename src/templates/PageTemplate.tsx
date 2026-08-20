
import StyledPageTemplate from "./PageTemplate.styles"
import Header from "../sharedComponents/header/Header"
import Footer from "../sharedComponents/footer/Footer"
import Navigation from "../sharedComponents/navigation/components/Navigation"
import usePageTemplate from "./usePageTemplate"

const PageTemplate = ({ children }: { children: React.ReactNode }) => {


    const { sidebarOpen, toggleSidebar } = usePageTemplate()

    return (
        <StyledPageTemplate>
            <div className="header-wrapper">
                <button
                    className="sidebar-menu"
                    aria-expanded={sidebarOpen}
                    aria-controls="sidebar-navigation"
                    aria-label={sidebarOpen ? "Close navigation sidebar" : "Open navigation sidebar"}
                    onClick={toggleSidebar}
                    type="button"
                >
                    <span className="hamburger-menu"></span>
                </button>
                <Header />
            </div>
            <section className="middle">
                <aside
                    className="sidebar"
                    id="sidebar-navigation"
                    role="navigation"
                    aria-label="Sidebar navigation"
                    aria-hidden={!sidebarOpen}
                >
                    <Navigation />
                </aside>
                <main>
                    {children}
                </main>
            </section>
            <Footer>
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
                </div>
            </Footer>
        </StyledPageTemplate>
    )
}

export default PageTemplate


