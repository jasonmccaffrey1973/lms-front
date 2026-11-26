import Button from "../../../Button/Button"
import SVGIcon from "../../../SVG/SVGIcon"
import Render from "../../../Render"
import type { DataGridActionMenuProps } from "./dataGridFooter.types"

const DataGridActionMenu = <TData extends Record<string, unknown>>({ 
  actionMenuRef,
  actionTriggerRef,
  actionMenuListRef,
  handleTriggerKeyDown,
  handleMenuKeyDown,
  showActionMenu,
  setShowActionMenu,
  actions,
  onActionClick,
  isActionDisabled
} : DataGridActionMenuProps<TData>) => {

    return (
          <div className="action-menu" ref={actionMenuRef}>
            <Button
              ref={actionTriggerRef}
              type="button"
              color="primary"
              className="action-menu-trigger"
              onClick={() => setShowActionMenu(!showActionMenu)}
              onKeyDown={handleTriggerKeyDown}
              aria-label="Open row actions"
              aria-controls="datagrid-action-menu"
              aria-haspopup="menu"
              aria-expanded={showActionMenu}
            >
              Actions
              <SVGIcon icon={showActionMenu ? "chevronUp" : "chevronDown"} />
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
                  <Button
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
                    <span className="action-menu-svg-wrapper">
                      <Render if={Boolean(action.svg)}>
                        <SVGIcon icon={action.svg ?? "empty"} />
                      </Render>
                    </span>
                    <span className="action-menu-label">
                      {action.label}
                    </span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
    )
}

export default DataGridActionMenu