import { useState } from "react"

const usePageTemplate = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [rightSideBarOpen, setRightSideBarOpen] = useState(false)

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    const closeSidebar = () => setSidebarOpen(false)

    const openSidebar = () => setSidebarOpen(true)

    const toggleRightSideBar = () => setRightSideBarOpen(!rightSideBarOpen)

    const closeRightSideBar = () => setRightSideBarOpen(false)

    const openRightSideBar = () => setRightSideBarOpen(true)

    return { sidebarOpen, toggleSidebar, closeSidebar, openSidebar, rightSideBarOpen, toggleRightSideBar, closeRightSideBar, openRightSideBar }
}


export default usePageTemplate