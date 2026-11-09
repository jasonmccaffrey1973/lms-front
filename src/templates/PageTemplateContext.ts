import { createContext, type ReactNode } from "react"

export interface PageTemplateContextValue {
    setRightSidebarContent: (content: ReactNode | null) => void
}

const PageTemplateContext = createContext<PageTemplateContextValue | undefined>(undefined)

export default PageTemplateContext
