import Button from "../../../Button/Button"
import SVGIcon from "../../../SVG/SVGIcon"
import type { DataGridColumnsMenuProps } from "./dataGridFooter.types"

const DataGridColumnsMenu = <TData extends Record<string, unknown>>({
  columnMenuRef,
  columnTriggerRef,
  columnMenuListRef,
  handleColumnTriggerKeyDown,
  handleColumnMenuKeyDown,
  showColumnMenu,
  setShowColumnMenu,
  columns,
  visibleColumnKeys,
  onToggleColumn,
}: DataGridColumnsMenuProps<TData>) => (
  <div className="column-menu" ref={columnMenuRef}>
    <Button
      ref={columnTriggerRef}
      type="button"
      color="transparent"
      className="columns-menu-trigger"
      onClick={() => setShowColumnMenu(!showColumnMenu)}
      onKeyDown={handleColumnTriggerKeyDown}
      aria-label="Toggle column visibility"
      aria-controls="columns-menu"
      aria-haspopup="menu"
      aria-expanded={showColumnMenu}
    >
      Columns
      <SVGIcon icon={showColumnMenu ? "chevronUp" : "chevronDown"} />
    </Button>
    <ul
      id="columns-menu"
      ref={columnMenuListRef}
      className="dropdown-wrapper"
      role="menu"
      aria-label="Column visibility"
      aria-expanded={showColumnMenu}
    >
      {columns.map((column) => (
        <li key={column.key} className="dropdown-item">
          <Button
            type="button"
            role="menuitemcheckbox"
            color="transparent"
            aria-checked={visibleColumnKeys.includes(column.key)}

            onClick={() => onToggleColumn(column.key)}
            onKeyDown={handleColumnMenuKeyDown}
          >
            <span className="checkbox-wrapper">
                <SVGIcon icon={visibleColumnKeys.includes(column.key) ? "checkMark" : "empty"} />
            </span>
            <span className="name-wrapper">{column.header ?? column.key}</span>
          </Button>
        </li>
      ))}
    </ul>
  </div>
)

export default DataGridColumnsMenu
