import { createElement, useCallback, useEffect, useMemo, useState } from "react"
import useRightSidebar from "../../templates/useRightSidebar"
import FiltersPanel from "./components/FiltersPanel"
import type { DataGridColumn, DataGridFooterAction, DataGridProps, RowId } from "./dataGrid.types"
import useDataGridController from "./hooks/useDataGridController"

const DEFAULT_EMPTY_MESSAGE = "No rows found."
const DEFAULT_ROW_ID_KEY = "id"

const useDataGrid = <TData extends Record<string, unknown>,>({
  initialData = [],
  pageSize = 50,
  fetchPage,
  filterableFields,
  columns,
  rowIdKey = DEFAULT_ROW_ID_KEY as Extract<keyof TData, string>,
  emptyMessage = DEFAULT_EMPTY_MESSAGE,
  selectionMode = "none",
  enableColumnVisibilityToggle = false,
  footerActions = [],
}: DataGridProps<TData>) => {
  const { setRightSidebarContent, openRightSideBar } = useRightSidebar()
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
    filters,
    setFilter,
    clearFilters,
    removeFilter,
    activeFilterCount,
    availableFilterFields,
  } = useDataGridController<TData>({
    initialData,
    pageSize,
    fetchPage,
    filterableFields,
  })

  const resolvedColumns = useMemo(() => {
    if (columns && columns.length > 0) {
      return columns
    }
    const firstRow = rows[0]
    if (!firstRow) {
      return [] as DataGridColumn<TData>[]
    }

    const fallbackColumns: DataGridColumn<TData>[] = (Object.keys(firstRow) as Array<
      Extract<keyof TData, string>
    >).map((key) => ({
      key,
      header: key,
    }))

    return fallbackColumns
  }, [columns, rows])
  const [columnVisibilityOverrides, setColumnVisibilityOverrides] = useState<Record<string, boolean>>({})

  const visibleColumnKeys = useMemo(
    () =>
      resolvedColumns
        .filter((column) => {
          const override = columnVisibilityOverrides[column.key]
          return override ?? (column.visible !== false)
        })
        .map((column) => column.key),
    [columnVisibilityOverrides, resolvedColumns]
  )

  const visibleColumns = useMemo(
    () => resolvedColumns.filter((column) => visibleColumnKeys.includes(column.key)),
    [resolvedColumns, visibleColumnKeys]
  )

  const toggleColumnVisibility = useCallback((key: string) => {
    setColumnVisibilityOverrides((prev) => {
      const current = prev[key]
      const defaultIsVisible =
        resolvedColumns.find((column) => column.key === key)?.visible !== false
      return {
        ...prev,
        [key]: current === undefined ? !defaultIsVisible : !current,
      }
    })
  }, [resolvedColumns])

  const resolvedRowIdKey = rowIdKey
  const resolveRowId = useCallback(
    (row: TData, index: number) => {
      const rowIdCandidate = row[resolvedRowIdKey]
      if (typeof rowIdCandidate === "string") {
        return rowIdCandidate
      }
      return `${resolvedRowIdKey}-${index}`
    },
    [resolvedRowIdKey]
  )

  const [selectedRowIds, setSelectedRowIds] = useState<RowId[]>([])

  const selectedRows = useMemo(
    () => rows.filter((row, index) => selectedRowIds.includes(resolveRowId(row, index))),
    [resolveRowId, rows, selectedRowIds]
  )

  const toggleRowSelection = useCallback(
    (rowId: RowId) => {
      if (selectionMode === "none") {
        return
      }
      setSelectedRowIds((prev) => {
        const hasRow = prev.includes(rowId)
        if (selectionMode === "single") {
          return hasRow ? [] : [rowId]
        }
        return hasRow ? prev.filter((item) => item !== rowId) : [...prev, rowId]
      })
    },
    [selectionMode]
  )

  const allRowIds = useMemo(() => rows.map((row, index) => resolveRowId(row, index)), [resolveRowId, rows])
  const allRowsSelected = allRowIds.length > 0 && allRowIds.every((rowId) => selectedRowIds.includes(rowId))

  const toggleSelectAll = useCallback(() => {
    if (selectionMode !== "multiple") {
      return
    }
    setSelectedRowIds((prev) => (allRowsSelected ? prev.filter((id) => !allRowIds.includes(id)) : allRowIds))
  }, [allRowIds, allRowsSelected, selectionMode])

  const resolvedFooterActions = useMemo(() => {
    return footerActions.filter((action) => (action.isVisible ? action.isVisible(selectedRows) : true))
  }, [footerActions, selectedRows])

  const runFooterAction = useCallback(
    (action: DataGridFooterAction<TData>) => {
      void action.onClick(selectedRows)
    },
    [selectedRows]
  )

  const isFooterActionDisabled = useCallback(
    (action: DataGridFooterAction<TData>) => {
      if (!action.isDisabled) {
        return false
      }
      return action.isDisabled(selectedRows)
    },
    [selectedRows]
  )

  const sidebarPanel = useMemo(
    () =>
      createElement(FiltersPanel, {
        fields: availableFilterFields,
        filters,
        setFilter,
        clearFilters,
      }),
    [availableFilterFields, clearFilters, filters, setFilter]
  )

  useEffect(() => {
    setRightSidebarContent(sidebarPanel)
  }, [setRightSidebarContent, sidebarPanel])

  useEffect(() => () => setRightSidebarContent(null), [setRightSidebarContent])

  const newRecord = ({ type }: { type?: string }) => () => {
    console.log(`Creating new record of type: ${type}`)
  }

  return {
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
    filters,
    removeFilter,
    resolvedColumns: visibleColumns,
    allColumns: resolvedColumns,
    visibleColumnKeys,
    toggleColumnVisibility,
    rowIdKey,
    selectionMode,
    selectedRowIds,
    selectedRows,
    toggleRowSelection,
    allRowsSelected,
    toggleSelectAll,
    footerActions: resolvedFooterActions,
    runFooterAction,
    isFooterActionDisabled,
    enableColumnVisibilityToggle,
    emptyMessage,
    openFilters: openRightSideBar,
    newRecord,
  }
}

export default useDataGrid