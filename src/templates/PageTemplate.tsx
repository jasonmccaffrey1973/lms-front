import { Outlet } from "react-router-dom"
import { useMemo, useRef, useEffect } from "react"
import type { PageTemplateProps } from "./pageTemplate.types"
import PageTemplateContext from "./PageTemplateContext"
import StyledPageTemplate from "./PageTemplate.styles"
import Header from "../sharedComponents/header/Header"
import Footer from "../sharedComponents/footer/Footer"
import Navigation from "../sharedComponents/navigation/components/Navigation"
import usePageTemplate from "./usePageTemplate"

const PageTemplate = ({ children }: PageTemplateProps) => {

    const {
        sidebarOpen,
        toggleSidebar,
        rightSideBarOpen,
        toggleRightSideBar,
        rightSidebarComponent,
        setRightSidebarContent,
        openRightSideBar,
        hasRightSidebar,
        closeRightSideBar,
    } = usePageTemplate()
    const contextValue = useMemo(() => ({ setRightSidebarContent, openRightSideBar, rightSideBarOpen }), [setRightSidebarContent, openRightSideBar, rightSideBarOpen])

    const rightSidebarRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!rightSideBarOpen) return

        const handlePointerDown = (e: PointerEvent) => {
            const clickedInsideSidebar = rightSidebarRef.current?.contains(e.target as Node)
            const clickedToggle = (e.target as Element).closest?.('[data-right-sidebar-toggle]')
            if (!clickedInsideSidebar && !clickedToggle) {
                closeRightSideBar()
            }
        }

        document.addEventListener('pointerdown', handlePointerDown)
        return () => document.removeEventListener('pointerdown', handlePointerDown)
    }, [rightSideBarOpen, closeRightSideBar])


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
                    <div ref={rightSidebarRef} className="right-sidebar-wrapper" aria-hidden={!rightSideBarOpen}>
                        {rightSidebarComponent}
                    </div>
                </section>
                <Footer />
            </StyledPageTemplate>
        </PageTemplateContext.Provider>
    )
}

export default PageTemplate


