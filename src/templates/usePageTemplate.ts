import { useCallback, useState, type ReactNode } from "react"

const usePageTemplate = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [rightSideBarOpen, setRightSideBarOpen] = useState(false)
    const [rightSidebarComponent, setRightSidebarComponent] = useState<ReactNode | null>(null)

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    const closeSidebar = () => setSidebarOpen(false)

    const openSidebar = () => setSidebarOpen(true)

    const toggleRightSideBar = () => setRightSideBarOpen((isOpen) => !isOpen)

    const closeRightSideBar = () => setRightSideBarOpen(false)

    const openRightSideBar = () => setRightSideBarOpen(true)

    const setRightSidebarContent = useCallback((component: ReactNode | null) => {
        setRightSidebarComponent(component)
        if (component === null) setRightSideBarOpen(false)
    }, [])

    const hasRightSidebar = rightSidebarComponent !== null

    return { 
        sidebarOpen,
        toggleSidebar,
        closeSidebar,
        openSidebar,
        rightSideBarOpen,
        toggleRightSideBar,
        closeRightSideBar,
        openRightSideBar,
        rightSidebarComponent,
        setRightSidebarContent,
        hasRightSidebar
    }
}


export default usePageTemplate
