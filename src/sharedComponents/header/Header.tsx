import { Link } from "react-router-dom"
import type { ChangeEvent } from "react"
import Logo from "../logo/Logo"
import StyledHeader from "./Header.styles"
import ProfileMenu from "../menu/ProfileMenu/ProfileMenu"
import { useTheme, type ThemeMode } from "../../theme"
import Render from "../Render"
import SVGButton from "../buttons/SVGButton/SVGButton"

const Header = ( { hasRightSideBar, rightSideBarOpen, toggleRightSideBar }: { hasRightSideBar: boolean, rightSideBarOpen: boolean, toggleRightSideBar: () => void} ) => {
	const { theme, setTheme } = useTheme()

	const handleThemeChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setTheme(event.target.value as ThemeMode)
	}

	return (
		<StyledHeader>
			<Link className="logo-wrapper" to="/">
				<Logo />
			</Link>
			<div className="header-actions">
				<label className="theme-select-wrapper" htmlFor="theme-select">
					<span>Theme</span>
					<select id="theme-select" value={theme} onChange={handleThemeChange}>
						<option value="system">System</option>
						<option value="light">Light</option>
						<option value="dark">Dark</option>
					</select>
				</label>
				<ProfileMenu />
				<Render if={hasRightSideBar}>
					<SVGButton 
						image={rightSideBarOpen ? "arrowLeft" : "ellipsisHroz"}  
						aria-expanded={rightSideBarOpen}
						aria-label={rightSideBarOpen ? "Close right sidebar" : "Open right sidebar"}
						onClick={toggleRightSideBar}
					/>
				</Render>
			</div>
		</StyledHeader>
	)
}

export default Header


