import useDataGridFooter from "./useDataGridFooter"
import Render from "../../../Render"
import type { DataGridFooterProps } from "./dataGridFooter.types"
import DataGridActionMenu from "./DataGridActionMenu"
import DataGridColumnsMenu from "./DataGridColumnsMenu"

const DataGridFooter = <TData extends Record<string, unknown>,>({
  recordLabel,
  totalCount,
  filteredCount,
  selectedCount,
  actions,
  onActionClick,
  isActionDisabled,
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
    handleMenuKeyDown,
    columnMenuRef,
    columnTriggerRef,
    columnMenuListRef,
    handleColumnTriggerKeyDown,
    handleColumnMenuKeyDown,
  } = useDataGridFooter()

  return (
    <>
      <div className="data-grid-footer-left-column">
        <DataGridColumnsMenu
          columnMenuRef={columnMenuRef}
          columnTriggerRef={columnTriggerRef}
          columnMenuListRef={columnMenuListRef}
          handleColumnTriggerKeyDown={handleColumnTriggerKeyDown}
          handleColumnMenuKeyDown={handleColumnMenuKeyDown}
          showColumnMenu={showColumnMenu}
          setShowColumnMenu={setShowColumnMenu}
          columns={columns}
          visibleColumnKeys={visibleColumnKeys}
          onToggleColumn={onToggleColumn}
        />
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
          <DataGridActionMenu<TData>
            actionMenuRef={actionMenuRef}
            actionTriggerRef={actionTriggerRef}
            actionMenuListRef={actionMenuListRef}
            handleTriggerKeyDown={handleTriggerKeyDown}
            handleMenuKeyDown={handleMenuKeyDown}
            showActionMenu={showActionMenu}
            setShowActionMenu={setShowActionMenu}
            actions={actions}
            onActionClick={onActionClick}
            isActionDisabled={isActionDisabled}
          />
        </Render>
      </div>
    </>
  )
}

export default DataGridFooter
