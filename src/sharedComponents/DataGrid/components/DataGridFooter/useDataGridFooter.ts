import { useEffect, useRef, useState } from "react"
import type { KeyboardEvent } from "react"

/** ==================================================================================
 * Custom hook for managing the state and behavior of the DataGrid footer, including 
 * column visibility and action menus.
 * @returns An object containing the state and functions for managing the DataGrid footer.
 ** ================================================================================== */
const useDataGridFooter = () => {

const [showColumnMenu, setShowColumnMenu] = useState(false)
const [showActionMenu, setShowActionMenu] = useState(false)
const actionMenuRef = useRef<HTMLDivElement | null>(null)
const actionTriggerRef = useRef<HTMLButtonElement | null>(null)
const actionMenuListRef = useRef<HTMLUListElement | null>(null)

/** ---------------------------------------------------------------------------------
 * Handles closing the action menu when clicking outside of it.
 * @param event - The mouse event that triggered the action menu to be closed.
 ** --------------------------------------------------------------------------------- */
    useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const container = actionMenuRef.current
      if (!container) {
        return
      }
      if (event.target instanceof Node && !container.contains(event.target)) {
        setShowActionMenu(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [])

  /** ---------------------------------------------------------------------------------
   * Focuses the next or previous menu item in the action menu.
   * @param direction - The direction to move focus (1 for next, -1 for previous).
   * @param startFromEdge - Whether to start from the first or last item.
   ** --------------------------------------------------------------------------------- */
  const focusMenuItem = (direction: 1 | -1, startFromEdge = false) => {
    const items = actionMenuListRef.current?.querySelectorAll<HTMLButtonElement>(".dropdown-item button") ?? []
    if (!items.length) {
      return
    }

    if (startFromEdge) {
      const targetIndex = direction > 0 ? 0 : items.length - 1
      items[targetIndex]?.focus()
      return
    }

    const currentIndex = [...items].findIndex((item) => item === document.activeElement)
    const nextIndex =
      currentIndex === -1
        ? direction > 0
          ? 0
          : items.length - 1
        : (currentIndex + direction + items.length) % items.length

    items[nextIndex]?.focus()
  }

  /** ---------------------------------------------------------------------------------
   * Opens the action menu.
   ** --------------------------------------------------------------------------------- */
  const openActionMenu = () => setShowActionMenu(true)

  /** ---------------------------------------------------------------------------------
   * Closes the action menu.
   ** --------------------------------------------------------------------------------- */
  const closeActionMenu = () => setShowActionMenu(false)

  /** ---------------------------------------------------------------------------------
   * Handles key down events on the action menu trigger button.
   * @param event - The keyboard event.
   ** --------------------------------------------------------------------------------- */
  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      openActionMenu()
      requestAnimationFrame(() => focusMenuItem(1, true))
      return
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      openActionMenu()
      requestAnimationFrame(() => focusMenuItem(-1, true))
      return
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setShowActionMenu((prev) => !prev)
      if (!showActionMenu) {
        requestAnimationFrame(() => focusMenuItem(1, true))
      }
    }
  }

  /** ---------------------------------------------------------------------------------
   * Handles key down events on the action menu items.
   * @param event - The keyboard event.
   ** --------------------------------------------------------------------------------- */
  const handleMenuKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      focusMenuItem(1)
      return
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      focusMenuItem(-1)
      return
    }

    if (event.key === "Home") {
      event.preventDefault()
      focusMenuItem(1, true)
      return
    }

    if (event.key === "End") {
      event.preventDefault()
      focusMenuItem(-1, true)
      return
    }

    if (event.key === "Escape") {
      event.preventDefault()
      closeActionMenu()
      actionTriggerRef.current?.focus()
      return
    }

    if (event.key === "Tab") {
      closeActionMenu()
    }
  }

  return {
    showColumnMenu,
    setShowColumnMenu,
    showActionMenu,
    setShowActionMenu,
    actionMenuRef,
    actionTriggerRef,
    actionMenuListRef,
    handleTriggerKeyDown,
    handleMenuKeyDown
  }
  
}

export default useDataGridFooter