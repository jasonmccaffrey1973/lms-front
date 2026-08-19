import { useCallback, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

const useDropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const focusMenuItem = useCallback((direction: 1 | -1) => {
    const items = menuRef.current?.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]') ?? [];

    if (!items.length) return;

    const currentIndex = [...items].findIndex((item) => item === document.activeElement);
    const nextIndex = currentIndex === -1
      ? (direction > 0 ? 0 : items.length - 1)
      : (currentIndex + direction + items.length) % items.length;

    items[nextIndex]?.focus();
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const openMenu = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleTriggerKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " " || event.key === "Spacebar" || event.code === "Space") {
      event.preventDefault();
      if (isOpen) {
        closeMenu();
        return;
      }

      openMenu();
      requestAnimationFrame(() => focusMenuItem(1));
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      openMenu();
      requestAnimationFrame(() => focusMenuItem(1));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      openMenu();
      requestAnimationFrame(() => focusMenuItem(-1));
    }
  }, [closeMenu, focusMenuItem, isOpen, openMenu]);

  const handleMenuKeyDown = useCallback((event: KeyboardEvent<HTMLAnchorElement>) => {
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
      triggerRef.current?.focus();
      return;
    }

    if (event.key === "Tab") {
      closeMenu();
    }
  }, [closeMenu, focusMenuItem]);

  return {
    isOpen,
    menuRef,
    triggerRef,
    toggleMenu,
    openMenu,
    closeMenu,
    focusMenuItem,
    handleTriggerKeyDown,
    handleMenuKeyDown,
  };
};

export default useDropdownMenu;
