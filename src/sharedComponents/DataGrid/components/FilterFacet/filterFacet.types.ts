import type { DataGridFetchFacetOptions, DataGridFilter } from "../../dataGrid.types"

interface FilterFacetProps {
  name: string
  filters: DataGridFilter[]
  noneSelected: boolean
  setFieldFilters: (field: string, values: string[]) => void
  setFacetNoneSelected: (field: string, selected: boolean) => void
  search: string
  fetchFacetOptions?: DataGridFetchFacetOptions
}

type FilterOption = {
    value: string
    label: string
    count?: number
}



export type {
  FilterFacetProps,
  FilterOption
}
