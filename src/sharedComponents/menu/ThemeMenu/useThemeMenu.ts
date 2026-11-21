import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { SVGIconName } from "../../SVG/SVGIcon";
import { useTheme, type ThemeMode } from "../../../theme";

type ThemeMenuItem = {
    label: string;
    icon: SVGIconName;
    value: ThemeMode;
}

const useThemeMenu = () => {
    const { theme, setTheme } = useTheme();
    const menuRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const menuListRef = useRef<HTMLUListElement | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const menuItems: ThemeMenuItem[] = useMemo(() => [
        { label: "System", icon: "computer", value: "system" },
        { label: "Light", icon: "sun", value: "light" },
        { label: "Dark", icon: "moon", value: "dark" },
    ], []);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const openMenu = () => setMenuOpen(true);

    const closeMenu = () => setMenuOpen(false);

    const getTrigger: SVGIconName = useMemo(() => {
        const selectedItem = menuItems.find((item) => item.value === theme);
        return selectedItem?.icon ?? "computer";
    }, [menuItems, theme]);

    useEffect(() => {
        if (!menuOpen) return;

        const handleDocumentPointerDown = (event: MouseEvent) => {
            if (menuRef.current?.contains(event.target as Node)) {
                return;
            }
            closeMenu();
        };

        document.addEventListener("mousedown", handleDocumentPointerDown);
        return () => document.removeEventListener("mousedown", handleDocumentPointerDown);
    }, [menuOpen]);
    
    const handleTriggerClick = () => {
        toggleMenu();
    };

    const focusMenuItem = (direction: 1 | -1, startFromEdge = false) => {
        const items = menuListRef.current?.querySelectorAll<HTMLButtonElement>(".dropdown-item button") ?? [];

        if (!items.length) return;

        if (startFromEdge) {
            const targetIndex = direction > 0 ? 0 : items.length - 1;
            items[targetIndex]?.focus();
            return;
        }

        const currentIndex = [...items].findIndex((item) => item === document.activeElement);
        const nextIndex = currentIndex === -1
            ? (direction > 0 ? 0 : items.length - 1)
            : (currentIndex + direction + items.length) % items.length;

        items[nextIndex]?.focus();
    };

    const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            openMenu();
            requestAnimationFrame(() => focusMenuItem(1, true));
            return;
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            openMenu();
            requestAnimationFrame(() => focusMenuItem(-1, true));
        }
    };

    const handleMenuKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            focusMenuItem(1);
            return;
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            focusMenuItem(-1);
            return;
        }

        if (event.key === "Escape") {
            event.preventDefault();
            closeMenu();
            (event.currentTarget as HTMLButtonElement).blur();
            triggerRef.current?.blur();
            return;
        }

        if (event.key === "Tab") {
            closeMenu();
        }
    };

    const handleMenuChange = (menuItem: ThemeMenuItem) => {
        setTheme(menuItem.value);
        closeMenu();
        triggerRef.current?.focus();
    }

    return {
        menuRef,
        triggerRef,
        menuListRef,
        menuItems,
        handleMenuChange,
        getTrigger,
        isMenuOpen: menuOpen,
        handleTriggerClick,
        handleTriggerKeyDown,
        handleMenuKeyDown,
        selectedTheme: theme,
    };
};

export default useThemeMenu;