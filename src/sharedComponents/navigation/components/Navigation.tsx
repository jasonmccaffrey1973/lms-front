import { useMemo } from "react"
import { StyledNavigationList } from "../Navigation.styles"
import NavigationItem from "./NavigationItem"
import NavigationCategory from "./NavigationCategory"
import { NavigationContextProvider, useNavigation } from "../NavigationContext"
import { buildNavigationRenderModel, type NavigationRenderNode } from "../navigationModel"
import { useUserLinksContext } from "../../../auth"
import Loader from "../../loader/Loader"

const NavigationLoadingFallback = () => {
    return <Loader />
}

const NavigationContent = () => {
    const { links, loading } = useUserLinksContext()
    const { toggleCategory, isCategoryOpen } = useNavigation()
    const renderModel = useMemo(() => buildNavigationRenderModel(links), [links])

    const renderNavigationNode = (node: NavigationRenderNode) => {
        if (node.kind === "item") {
            return <NavigationItem key={node.key} obj={node.item} />
        }

        return (
            <NavigationCategory
                key={node.key}
                obj={node.category}
                isOpen={isCategoryOpen(node.category.name)}
                onToggle={toggleCategory}
            />
        )
    }

    if (loading) {
        return <NavigationLoadingFallback />
    }
    
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
            <NavigationContent />
        </NavigationContextProvider>
    )
}

export default Navigation
