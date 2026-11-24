interface DataGridHeaderProps {
  title?: string
  searchValue: string
  setSearchValue: (value: string) => void
  newRecord: (params: { type?: string }) => () => void
  openFilters: () => void
  activeFilterCount: number
}

export type { DataGridHeaderProps }