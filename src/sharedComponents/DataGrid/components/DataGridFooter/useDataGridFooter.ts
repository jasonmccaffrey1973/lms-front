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

  // --- Action menu refs ---
  const actionMenuRef = useRef<HTMLDivElement | null>(null)
  const actionTriggerRef = useRef<HTMLButtonElement | null>(null)
  const actionMenuListRef = useRef<HTMLUListElement | null>(null)

  // --- Column menu refs ---
  const columnMenuRef = useRef<HTMLDivElement | null>(null)
  const columnTriggerRef = useRef<HTMLButtonElement | null>(null)
  const columnMenuListRef = useRef<HTMLUListElement | null>(null)

  /** ---------------------------------------------------------------------------------
   * Closes both menus when clicking outside their containers.
   ** --------------------------------------------------------------------------------- */
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (actionMenuRef.current && event.target instanceof Node && !actionMenuRef.current.contains(event.target)) {
        setShowActionMenu(false)
      }
      if (columnMenuRef.current && event.target instanceof Node && !columnMenuRef.current.contains(event.target)) {
        setShowColumnMenu(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [])

  // ---------------------------------------------------------------------------------
  // Shared focus helper — targets items inside the given list ref
  // ---------------------------------------------------------------------------------
  const focusMenuItemIn = (listRef: React.RefObject<HTMLUListElement | null>, direction: 1 | -1, startFromEdge = false) => {
    const items = listRef.current?.querySelectorAll<HTMLButtonElement>(".dropdown-item button") ?? []
    if (!items.length) return

    if (startFromEdge) {
      items[direction > 0 ? 0 : items.length - 1]?.focus()
      return
    }

    const currentIndex = [...items].findIndex((item) => item === document.activeElement)
    const nextIndex =
      currentIndex === -1
        ? direction > 0 ? 0 : items.length - 1
        : (currentIndex + direction + items.length) % items.length

    items[nextIndex]?.focus()
  }

  // ---------------------------------------------------------------------------------
  // Action menu helpers
  // ---------------------------------------------------------------------------------
  const openActionMenu  = () => setShowActionMenu(true)
  const closeActionMenu = () => setShowActionMenu(false)

  /** Handles key down events on the action menu trigger button. */
  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      openActionMenu()
      requestAnimationFrame(() => focusMenuItemIn(actionMenuListRef, 1, true))
      return
    }
    if (event.key === "ArrowUp") {
      event.preventDefault()
      openActionMenu()
      requestAnimationFrame(() => focusMenuItemIn(actionMenuListRef, -1, true))
      return
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setShowActionMenu((prev) => !prev)
      if (!showActionMenu) requestAnimationFrame(() => focusMenuItemIn(actionMenuListRef, 1, true))
    }
  }

  /** Handles key down events on the action menu items. */
  const handleMenuKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") { event.preventDefault(); focusMenuItemIn(actionMenuListRef, 1); return }
    if (event.key === "ArrowUp")   { event.preventDefault(); focusMenuItemIn(actionMenuListRef, -1); return }
    if (event.key === "Home")      { event.preventDefault(); focusMenuItemIn(actionMenuListRef, 1, true); return }
    if (event.key === "End")       { event.preventDefault(); focusMenuItemIn(actionMenuListRef, -1, true); return }
    if (event.key === "Escape")    { event.preventDefault(); closeActionMenu(); actionTriggerRef.current?.focus(); return }
    if (event.key === "Tab")       { closeActionMenu() }
  }

  // ---------------------------------------------------------------------------------
  // Column menu helpers
  // ---------------------------------------------------------------------------------
  const openColumnMenu  = () => setShowColumnMenu(true)
  const closeColumnMenu = () => setShowColumnMenu(false)
  const toggleColumnMenu = () => setShowColumnMenu((prev) => !prev)

  /** Handles key down events on the column menu trigger button. */
  const handleColumnTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      openColumnMenu()
      requestAnimationFrame(() => focusMenuItemIn(columnMenuListRef, 1, true))
      return
    }
    if (event.key === "ArrowUp") {
      event.preventDefault()
      openColumnMenu()
      requestAnimationFrame(() => focusMenuItemIn(columnMenuListRef, -1, true))
      return
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setShowColumnMenu((prev) => !prev)
      if (!showColumnMenu) requestAnimationFrame(() => focusMenuItemIn(columnMenuListRef, 1, true))
    }
  }

  /** Handles key down events on the column menu items. */
  const handleColumnMenuKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") { event.preventDefault(); focusMenuItemIn(columnMenuListRef, 1); return }
    if (event.key === "ArrowUp")   { event.preventDefault(); focusMenuItemIn(columnMenuListRef, -1); return }
    if (event.key === "Home")      { event.preventDefault(); focusMenuItemIn(columnMenuListRef, 1, true); return }
    if (event.key === "End")       { event.preventDefault(); focusMenuItemIn(columnMenuListRef, -1, true); return }
    if (event.key === "Escape")    { event.preventDefault(); closeColumnMenu(); columnTriggerRef.current?.focus(); return }
    if (event.key === "Tab")       { closeColumnMenu() }
  }

  return {
    // Action menu
    showActionMenu,
    setShowActionMenu,
    actionMenuRef,
    actionTriggerRef,
    actionMenuListRef,
    handleTriggerKeyDown,
    handleMenuKeyDown,
    // Column menu
    showColumnMenu,
    setShowColumnMenu,
    columnMenuRef,
    columnTriggerRef,
    columnMenuListRef,
    handleColumnTriggerKeyDown,
    handleColumnMenuKeyDown,
    toggleColumnMenu,
    openColumnMenu,
    closeColumnMenu,
  }
}

export default useDataGridFooter