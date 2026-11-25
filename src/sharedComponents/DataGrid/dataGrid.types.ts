import type { ReactNode } from "react"
import type { SVGIconName } from "../SVG/SVGIcon"

type RowId = string
type DataGridSortDirection = "asc" | "desc"

type DataGridFilter = {
  field: string
  value: string
}

type DataGridSort = {
  field: string
  direction: DataGridSortDirection
}

type DataGridFetchParams = {
  after: string | null
  first: number
  search: string
  filters: DataGridFilter[]
  sort: DataGridSort | null
}

type DataGridPage<TData> = {
  items: TData[]
  endCursor: string | null
  hasNextPage: boolean
  totalCount: number
  filteredCount?: number
}

type DataGridFetchPage<TData> = (params: DataGridFetchParams) => Promise<DataGridPage<TData>>

type DataGridColumn<TData> = {
  key: Extract<keyof TData, string>
  header?: string
  visible?: boolean
  sortable?: boolean
  render?: (row: TData) => ReactNode
}

type DataGridSelectionMode = "none" | "single" | "multiple"

type DataGridFooterAction<TData> = {
  id: string
  label: string
  svg?: SVGIconName
  onClick: (selectedRows: TData[]) => void | Promise<void>
  isVisible?: (selectedRows: TData[]) => boolean
  isDisabled?: (selectedRows: TData[]) => boolean
}

interface UseDataGridProps<TData> {
  initialData?: TData[]
  pageSize?: number
  fetchPage?: DataGridFetchPage<TData>
  filterableFields?: Array<Extract<keyof TData, string>>
  selectionMode?: DataGridSelectionMode
  enableColumnVisibilityToggle?: boolean
}

interface DataGridProps<TData extends Record<string, unknown>> extends UseDataGridProps<TData> {
  columns?: DataGridColumn<TData>[]
  rowIdKey?: Extract<keyof TData, string>
  emptyMessage?: string
  title?: string
  footerActions?: DataGridFooterAction<TData>[]
}

export type {
  RowId,
  DataGridFilter,
  DataGridSortDirection,
  DataGridSort,
  DataGridFetchParams,
  DataGridPage,
  DataGridFetchPage,
  DataGridColumn,
  DataGridSelectionMode,
  DataGridFooterAction,
  UseDataGridProps,
  DataGridProps,
}