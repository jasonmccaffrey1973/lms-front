import type React from "react"
import type { Dispatch, SetStateAction } from "react"
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

interface DataGridActionMenuProps<TData extends Record<string, unknown>> {
  actionMenuRef: React.RefObject<HTMLDivElement | null>
  actionTriggerRef: React.RefObject<HTMLButtonElement | null>
  actionMenuListRef: React.RefObject<HTMLUListElement | null>
  handleTriggerKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void
  handleMenuKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void
  showActionMenu: boolean
  setShowActionMenu: Dispatch<SetStateAction<boolean>>
  actions: DataGridFooterAction<TData>[]
  onActionClick: (action: DataGridFooterAction<TData>) => void
  isActionDisabled: (action: DataGridFooterAction<TData>) => boolean
}

interface DataGridColumnsMenuProps<TData extends Record<string, unknown>> {
  columnMenuRef: React.RefObject<HTMLDivElement | null>
  columnTriggerRef: React.RefObject<HTMLButtonElement | null>
  columnMenuListRef: React.RefObject<HTMLUListElement | null>
  handleColumnTriggerKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void
  handleColumnMenuKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void
  showColumnMenu: boolean
  setShowColumnMenu: Dispatch<SetStateAction<boolean>>
  columns: DataGridColumn<TData>[]
  visibleColumnKeys: string[]
  onToggleColumn: (key: string) => void
}
export type { DataGridFooterProps, DataGridActionMenuProps, DataGridColumnsMenuProps }