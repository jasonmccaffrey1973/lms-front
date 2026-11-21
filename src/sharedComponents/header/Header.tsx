import { Link } from "react-router-dom"
import Logo from "../logo/Logo"
import StyledHeader from "./Header.styles"
import ProfileMenu from "../menu/ProfileMenu/ProfileMenu"
import SVGButton from "../buttons/SVGButton/SVGButton"
import SVGIcon from "../SVG/SVGIcon"
import ThemeMenu from "../menu/ThemeMenu/ThemeMenu"

const Header = ( { hasRightSideBar, rightSideBarOpen, toggleRightSideBar }: { hasRightSideBar: boolean, rightSideBarOpen: boolean, toggleRightSideBar: () => void} ) => {
	
	return (
		<StyledHeader>
			<Link className="logo-wrapper" to="/">
				<Logo />
			</Link>
			<div className="header-actions">
				<ThemeMenu />
				<ProfileMenu />
				
				<SVGButton
					image={<SVGIcon icon={ rightSideBarOpen ? "arrowRight" : "ellipsisVert"} />}
					className="right-sidebar-toggle"
					data-right-sidebar-toggle
					aria-expanded={rightSideBarOpen}
					aria-label={rightSideBarOpen ? "Close right sidebar" : "Open right sidebar"}
					onClick={toggleRightSideBar}
					style={{ visibility: hasRightSideBar ? "visible" : "hidden" }}
				/>
			</div>
		</StyledHeader>
	)
}

export default Header