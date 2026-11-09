import { Outlet } from "react-router-dom"
import { useMemo } from "react"
import type { PageTemplateProps } from "./pageTemplate.types"
import PageTemplateContext from "./PageTemplateContext"
import StyledPageTemplate from "./PageTemplate.styles"
import Header from "../sharedComponents/header/Header"
import Footer from "../sharedComponents/footer/Footer"
import Navigation from "../sharedComponents/navigation/components/Navigation"
import usePageTemplate from "./usePageTemplate"
import Render from "../sharedComponents/Render"

const PageTemplate = ({ children }: PageTemplateProps) => {

    const {
        sidebarOpen,
        toggleSidebar,
        rightSideBarOpen,
        toggleRightSideBar,
        rightSidebarComponent,
        setRightSidebarContent,
        hasRightSidebar,
    } = usePageTemplate()
    const contextValue = useMemo(() => ({ setRightSidebarContent }), [setRightSidebarContent])


    return (
        <PageTemplateContext.Provider value={contextValue}>
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
                        hasRightSideBar={hasRightSidebar}
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
                    <Render if={hasRightSidebar}>
                        <div className="right-sidebar-wrapper" aria-hidden={!rightSideBarOpen}>
                            {rightSidebarComponent}
                        </div>
                    </Render>
                </section>
                <Footer />
            </StyledPageTemplate>
        </PageTemplateContext.Provider>
    )
}

export default PageTemplate


