import Button from "../../Button/Button";
import Render from "../../Render";
import SVGIcon from "../../SVG/SVGIcon";
import { StyledThemeMenu } from "./themeMenu.styles";
import useThemeMenu from "./useThemeMenu";


const ThemeMenu = () => {
    const {
        menuRef,
        triggerRef,
        menuListRef,
        menuItems,
        handleTriggerClick,
        handleTriggerKeyDown,
        handleMenuKeyDown,
        getTrigger,
        handleMenuChange,
        isMenuOpen,
        selectedTheme,
    } = useThemeMenu();
    
    return (
    <StyledThemeMenu ref={menuRef}>
        <Button
            ref={triggerRef}
            type="button"
            color="transparent"
            textColor="var(--app-text)"
            onClick={handleTriggerClick}
            onKeyDown={handleTriggerKeyDown}
            aria-label="Change Dark and Light Theme"
            title="Change Dark and Light Theme"
            className="theme-trigger"
            aria-controls="theme-menu"
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
        >
            <SVGIcon icon={getTrigger} />
        </Button>
        <ul id="theme-menu" ref={menuListRef} className="dropdown-wrapper" aria-label="Theme menu" aria-expanded={isMenuOpen} role="menu">
        {menuItems.map((item) => (
            <li key={item.label} className="dropdown-item">
                <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={selectedTheme === item.value}
                    tabIndex={isMenuOpen ? 0 : -1}
                    onClick={() => handleMenuChange(item)}
                    onKeyDown={handleMenuKeyDown}
                >
                    <span className="theme-icon-wrapper"><SVGIcon icon={item.icon} /></span>
                    <span className="theme-label-wrapper">{item.label}</span>
                    <span className="theme-check-wrapper">
                        <Render if={selectedTheme === item.value}>
                            <SVGIcon icon="checkMark" />
                        </Render>
                    </span>
                </button>
            </li>
        ))}

        </ul>
    </StyledThemeMenu>        
    );

};

export default ThemeMenu;