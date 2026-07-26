import { StyledNavigationList } from "./Navigation.styles"
import NavigationItem from "./NavigationItem"
import NavigationCategory from "./NavigationCategory"
import { NavigationContextProvider, useNavigation } from "./NavigationContext"

const NavigationContent = () => {
    const { getLinks } = useNavigation();
    const links = getLinks();
    
    return (
        <nav>
            <StyledNavigationList>
                {links.map((item) => (
                    <>
                        {item.path !== undefined ? (
                            <NavigationItem key={item.name} obj={{ name: item.name, path: item.path }} />
                        ) : item.itemList !== undefined && (
                            <NavigationCategory key={item.name} obj={{ name: item.name, itemList: item.itemList }} />
                        )}
                    </>
                ))}
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
