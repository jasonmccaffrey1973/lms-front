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

type DataGridFacetOption = {
  value: string
  label: string
  count: number
}

type DataGridFacetOptionsPage = {
  options: DataGridFacetOption[]
  totalCount: number
  hasMore: boolean
}

type DataGridFetchFacetOptions = (params: {
  field: string
  search: string
  filters: DataGridFilter[]
  facetSearch: string
  limit: number
  offset: number
}) => Promise<DataGridFacetOptionsPage>

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
  fetchFacetOptions?: DataGridFetchFacetOptions
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
  DataGridFacetOption,
  DataGridFacetOptionsPage,
  DataGridFetchFacetOptions,
  DataGridColumn,
  DataGridSelectionMode,
  DataGridFooterAction,
  UseDataGridProps,
  DataGridProps,
}
