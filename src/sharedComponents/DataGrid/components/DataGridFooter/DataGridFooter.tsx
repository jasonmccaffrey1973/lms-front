import useDataGridFooter from "./useDataGridFooter"
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

  const hasData = totalCount > 0
  const hasFilteredData = filteredCount > 0 && filteredCount !== totalCount
  const selectedLabel = selectedCount === 1 ? "1 selected" : `${selectedCount} selected`

  const {
    showColumnMenu,
    setShowColumnMenu,
    showActionMenu,
    setShowActionMenu,
    actionMenuRef,
    actionTriggerRef,
    actionMenuListRef,
    handleTriggerKeyDown,
    handleMenuKeyDown
  } = useDataGridFooter()

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
        <Render if={selectedCount > 0}> |
          <span className="selected-count">{selectedLabel}</span>
        </Render>
      </div>

      <div className="data-grid-footer-right-column">
        <Render if={actions.length > 0}>
          <div className="action-menu" ref={actionMenuRef}>
            <Button
              ref={actionTriggerRef}
              type="button"
              color="primary"
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