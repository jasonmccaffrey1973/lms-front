import { useEffect, useRef, useState } from "react"
import type { KeyboardEvent } from "react"
import Button from "../../../Button/Button"
import Render from "../../../Render"
import SVGIcon from "../../../SVG/SVGIcon"
import type { DataGridFooterProps } from "./dataGridFooter.types"

const DataGridFooter = <TData extends Record<string, unknown>,>({
  recordLabel,
  totalCount,
  filteredCount,
  selectedCount,
  actions,
  onActionClick,
  isActionDisabled,
  enableColumnVisibilityToggle = false,
  columns,
  visibleColumnKeys,
  onToggleColumn,
}: DataGridFooterProps<TData>) => {
  const [showColumnMenu, setShowColumnMenu] = useState(false)
  const [showActionMenu, setShowActionMenu] = useState(false)
  const actionMenuRef = useRef<HTMLDivElement | null>(null)
  const actionTriggerRef = useRef<HTMLButtonElement | null>(null)
  const actionMenuListRef = useRef<HTMLUListElement | null>(null)

  const hasData = totalCount > 0
  const hasFilteredData = filteredCount > 0 && filteredCount !== totalCount
  const selectedLabel = selectedCount === 1 ? "1 selected" : `${selectedCount} selected`

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

  const openActionMenu = () => setShowActionMenu(true)
  const closeActionMenu = () => setShowActionMenu(false)

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

  return (
    <>
      <div className="data-grid-footer-left-column">
        <Render if={enableColumnVisibilityToggle}>
          <div className="column-visibility-menu">
            <Button type="button" color="transparent" onClick={() => setShowColumnMenu((prev) => !prev)}>
              Columns
            </Button>
            {showColumnMenu ? (
              <div className="column-visibility-popover">
                {columns.map((column) => (
                  <label key={column.key}>
                    <input
                      type="checkbox"
                      checked={visibleColumnKeys.includes(column.key)}
                      onChange={() => onToggleColumn(column.key)}
                    />
                    {column.header ?? column.key}
                  </label>
                ))}
              </div>
            ) : null}
          </div>
        </Render>
      </div>
      <div className="data-grid-footer-center-column">
        <Render if={hasData}>
          <Render if={hasFilteredData}>
            <span className="filtered-count">{filteredCount} of </span>
          </Render>
          {totalCount} {recordLabel}
        </Render>
        <Render if={selectedCount > 0}>
          <span className="selected-count">{selectedLabel}</span>
        </Render>
      </div>

      <div className="data-grid-footer-right-column">
        <Render if={actions.length > 0}>
          <div className="action-menu" ref={actionMenuRef}>
            <Button
              ref={actionTriggerRef}
              type="button"
              color="transparent"
              className="action-menu-trigger"
              onClick={() => setShowActionMenu((prev) => !prev)}
              onKeyDown={handleTriggerKeyDown}
              aria-label="Open row actions"
              aria-controls="datagrid-action-menu"
              aria-haspopup="menu"
              aria-expanded={showActionMenu}
            >
              Actions
              <SVGIcon icon="chevronDown" />
            </Button>
            <ul
              id="datagrid-action-menu"
              ref={actionMenuListRef}
              className="dropdown-wrapper"
              role="menu"
              aria-label="Data grid actions"
              aria-expanded={showActionMenu}
            >
              {actions.map((action) => (
                <li key={action.id} className="dropdown-item">
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      onActionClick(action)
                      setShowActionMenu(false)
                      actionTriggerRef.current?.focus()
                    }}
                    onKeyDown={handleMenuKeyDown}
                    disabled={isActionDisabled(action)}
                  >
                    {action.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </Render>
        <Render if={actions.length === 0 && selectedCount > 0}>
          <Button type="button" color="transparent" disabled>
            No actions
          </Button>
        </Render>
      </div>
    </>
  )
}

export default DataGridFooter