import { StyledMenu, StyledMenuTrigger, StyledMenuWrapper, StyledMenuItem } from "./DropDownMenu.styles";
import useDropDownMenu from "./useDropDownMenu";

type MenuItem = {
  action?: () => void;
  href?: string;
  label: string;
};

type DropDownMenuProps = {
  menuItems: MenuItem[];
  trigger: React.ReactNode;
};

const DropDownMenu = ({ menuItems, trigger }: DropDownMenuProps) => {
  const {
    isOpen,
    menuRef,
    triggerRef,
    toggleMenu,
    closeMenu,
    handleTriggerKeyDown,
    handleMenuKeyDown,
  } = useDropDownMenu();

  return (
    <StyledMenuWrapper onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
        closeMenu();
      }
    }}>
      <StyledMenuTrigger
        ref={triggerRef}
        type="button"
        onClick={toggleMenu}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="dropdown-menu"
      >
        {trigger}
      </StyledMenuTrigger>
      <StyledMenu
        id="dropdown-menu"
        ref={menuRef}
        aria-expanded={isOpen}
        aria-hidden={!isOpen}
        role="menu"
      >
        {menuItems.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            <StyledMenuItem
              role="menuitem"
              tabIndex={isOpen ? 0 : -1}
              onClick={item.action}
              href={item.href}
              onKeyDown={handleMenuKeyDown}
            >
              {item.label}
            </StyledMenuItem>
          </li>
        ))}
      </StyledMenu>
    </StyledMenuWrapper>
  );
};

export default DropDownMenu;