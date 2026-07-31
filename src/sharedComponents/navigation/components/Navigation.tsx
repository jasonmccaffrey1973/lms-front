import { Suspense } from "react"
import { StyledNavigationList } from "../Navigation.styles"
import NavigationItem from "./NavigationItem"
import NavigationCategory from "./NavigationCategory"
import { NavigationContextProvider } from "../NavigationContext"
import { buildNavigationRenderModel, type NavigationRenderNode } from "../navigationModel"
import { useAuth } from "../../../auth"
import { useUserLinksSuspense } from "../../../queries/useNavigationQueries"
import Loader from "../../loader/Loader"

const renderNavigationNode = (node: NavigationRenderNode) => {
    if (node.kind === "item") {
        return <NavigationItem key={node.key} obj={node.item} />
    }

    return <NavigationCategory key={node.key} obj={node.category} />
}

const NavigationLoadingFallback = () => {
    return <Loader />
}

const NavigationContent = () => {
    const { token } = useAuth()
    const data = useUserLinksSuspense(token)
    const links = data?.navigation ?? []
    const renderModel = buildNavigationRenderModel(links)
    
    return (
        <nav>
            <StyledNavigationList>
                {renderModel.map(renderNavigationNode)}
            </StyledNavigationList>
        </nav>
    )
}

const Navigation = () => {
    return (
        <NavigationContextProvider>
            <Suspense fallback={<NavigationLoadingFallback />}>
                <NavigationContent />
            </Suspense>
        </NavigationContextProvider>
    )
}

export default Navigation
