import StyledNavigationList from "./Navigation.styles"
import useNavigation from "./useNavigation"

const Navigation = () => {
    const { getLinks } = useNavigation()
    const links = getLinks()

    return (
        <nav>
            <StyledNavigationList>
                {links.map((link) => (
                    <li className="nav-item" key={link.name}>
                        <a href={link.path}>{link.name}</a>
                    </li>
                ))}
            </StyledNavigationList>
        </nav>
    )
}

export default Navigation