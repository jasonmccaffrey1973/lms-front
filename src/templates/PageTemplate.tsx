
import { Outlet } from "react-router-dom"
import StyledPageTemplate from "./PageTemplate.styles"
import Header from "../sharedComponents/header/Header"
import Footer from "../sharedComponents/footer/Footer"
import Navigation from "../sharedComponents/navigation/components/Navigation"
import usePageTemplate from "./usePageTemplate"
import Render from "../sharedComponents/Render"

const PageTemplate = ({ rightSideBarComponent, children }: { rightSideBarComponent?: React.ReactNode, children?: React.ReactNode }) => {

    const { sidebarOpen, toggleSidebar, rightSideBarOpen, toggleRightSideBar } = usePageTemplate()

    const hasRightSideBar = rightSideBarComponent !== undefined


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

                <Header 
                    hasRightSideBar={hasRightSideBar}
                    rightSideBarOpen={rightSideBarOpen}
                    toggleRightSideBar={toggleRightSideBar} 
                />
                
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
                    {children ?? <Outlet />}
                </main>
                <Render if={hasRightSideBar}>
                    <div className="right-sidebar-wrapper" aria-hidden={!rightSideBarOpen} >
                        {rightSideBarComponent}
                    </div>
                </Render>
            </section>
            <Footer />
        </StyledPageTemplate>
    )
}

export default PageTemplate


