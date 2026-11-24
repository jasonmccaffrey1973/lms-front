import type { DataGridColumn, DataGridFooterAction } from "../../dataGrid.types"

interface DataGridFooterProps<TData extends Record<string, unknown>> {
  totalCount: number
  filteredCount: number
  recordLabel: string
  selectedCount: number
  actions: DataGridFooterAction<TData>[]
  onActionClick: (action: DataGridFooterAction<TData>) => void
  isActionDisabled: (action: DataGridFooterAction<TData>) => boolean
  enableColumnVisibilityToggle?: boolean
  columns: DataGridColumn<TData>[]
  visibleColumnKeys: string[]
  onToggleColumn: (key: string) => void
}

export type { DataGridFooterProps }