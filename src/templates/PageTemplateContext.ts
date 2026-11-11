import { createContext, type ReactNode } from "react"

export interface PageTemplateContextValue {
    setRightSidebarContent: (content: ReactNode | null) => void
    openRightSideBar: () => void
    rightSideBarOpen: boolean
}

const PageTemplateContext = createContext<PageTemplateContextValue | undefined>(undefined)

export default PageTemplateContext
