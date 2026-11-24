import StyledDataGrid from "./dataGrid.styles"
import type { DataGridProps } from "./dataGrid.types"
import useDataGrid from "./useDataGrid"
import DataGridHeader from "./components/DataGridHeader/DataGridHeader"
import DataGridFooter from "./components/DataGridFooter/DataGridFooter"
import SVGIcon from "../SVG/SVGIcon"

const DataGrid = <TData extends Record<string, unknown>,>({
  initialData,
  pageSize,
  fetchPage,
  filterableFields,
  columns,
  rowIdKey,
  emptyMessage,
  title,
  selectionMode,
  enableColumnVisibilityToggle,
  footerActions,
}: DataGridProps<TData>) => {
  const {
    searchValue,
    setSearchValue,
    rows,
    totalCount,
    filteredCount,
    sort,
    toggleSort,
    loading,
    error,
    hasNextPage,
    loadMoreRef,
    activeFilterCount,
    resolvedColumns,
    allColumns,
    visibleColumnKeys,
    toggleColumnVisibility,
    selectedRowIds,
    selectedRows,
    toggleRowSelection,
    allRowsSelected,
    toggleSelectAll,
    footerActions: resolvedFooterActions,
    runFooterAction,
    isFooterActionDisabled,
    openFilters,
    newRecord,
    selectionMode: resolvedSelectionMode,
    rowIdKey: resolvedRowIdKey,
    enableColumnVisibilityToggle: canToggleColumns,
  } = useDataGrid<TData>({
    initialData,
    pageSize,
    fetchPage,
    filterableFields,
    columns,
    rowIdKey,
    emptyMessage,
    selectionMode,
    enableColumnVisibilityToggle,
    footerActions,
  })

  return (
    <StyledDataGrid>
      <div className="grid-header">
        <DataGridHeader
          title={title}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          openFilters={openFilters}
          activeFilterCount={activeFilterCount}
          newRecord={newRecord}
        />
      </div>
      <div className="grid-body">
        {error ? <p className="grid-state">{error}</p> : null}
        {!error && rows.length === 0 && !loading ? <p className="grid-state">{emptyMessage}</p> : null}
        {rows.length > 0 ? (
          <table>
            <thead>
              <tr>
                {resolvedSelectionMode !== "none" ? (
                  <th className="selection-cell">
                    {resolvedSelectionMode === "multiple" ? (
                      <input
                        type="checkbox"
                        aria-label="Select all rows"
                        checked={allRowsSelected}
                        onChange={toggleSelectAll}
                      />
                    ) : null}
                  </th>
                ) : null}
                {resolvedColumns.map((column) => (
                  <th key={column.key}>
                    {column.sortable ? (
                      <button
                        type="button"
                        className="sort-button"
                        onClick={() => toggleSort(column.key)}
                        aria-label={`Sort by ${column.header ?? column.key}`}
                      >
                        {column.header ?? column.key}
                        <span className="sort-indicator" aria-hidden="true">
                          {sort?.field === column.key ? (
                            sort.direction === "asc" ? (
                              <SVGIcon icon="chevronUp" />
                            ) : (
                              <SVGIcon icon="chevronDown" />
                            )
                          ) : (
                            <SVGIcon icon="chevronDown" />
                          )}
                        </span>
                      </button>
                    ) : (
                      column.header ?? column.key
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => {
                const rowIdCandidate = row[resolvedRowIdKey]
                const fallbackId = `${resolvedRowIdKey}-${index}`
                const rowId = typeof rowIdCandidate === "string" ? rowIdCandidate : fallbackId

                return (
                  <tr key={rowId}>
                    {resolvedSelectionMode !== "none" ? (
                      <td className="selection-cell">
                        <input
                          type="checkbox"
                          aria-label={`Select row ${index + 1}`}
                          checked={selectedRowIds.includes(rowId)}
                          onChange={() => toggleRowSelection(rowId)}
                        />
                      </td>
                    ) : null}
                    {resolvedColumns.map((column) => (
                      <td key={`${rowId}-${column.key}`}>
                        {column.render ? column.render(row) : String(row[column.key] ?? "")}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : null}
        {hasNextPage ? <div ref={loadMoreRef} className="grid-load-sentinel" aria-hidden="true" /> : null}
        {loading ? <p className="grid-state">Loading…</p> : null}
      </div>
      <div className="grid-footer">
        <DataGridFooter
          totalCount={totalCount}
          filteredCount={filteredCount}
          recordLabel={title ?? "records"}
          actions={resolvedFooterActions}
          selectedCount={selectedRows.length}
          onActionClick={runFooterAction}
          isActionDisabled={isFooterActionDisabled}
          enableColumnVisibilityToggle={canToggleColumns}
          columns={allColumns}
          visibleColumnKeys={visibleColumnKeys}
          onToggleColumn={toggleColumnVisibility}
        />
      </div>
    </StyledDataGrid>
  )
}

export default DataGrid