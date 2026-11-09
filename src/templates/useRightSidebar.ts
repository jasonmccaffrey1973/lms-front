import { useContext } from "react"
import PageTemplateContext from "./PageTemplateContext"

const useRightSidebar = () => {
    const context = useContext(PageTemplateContext)

    if (!context) {
        throw new Error("useRightSidebar must be used within a PageTemplate")
    }

    return context
}

export default useRightSidebar
