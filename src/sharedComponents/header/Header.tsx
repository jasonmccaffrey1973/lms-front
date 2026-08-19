import { Link } from "react-router-dom"
import Logo from "../logo/Logo"
import StyledHeader from "./Header.styles"
import ProfileMenu from "../menu/ProfileMenu/ProfileMenu"

const Header = () => {
	return (
		<StyledHeader>
			<Link className="logo-wrapper" to="/">
				<Logo />
			</Link>
			<ProfileMenu />
		</StyledHeader>
	)
}

export default Header


