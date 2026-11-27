import { useCallback, useMemo, useState } from "react"
import type { DataGridFilter } from "../dataGrid.types"

const useDataGridFilters = () => {
  const [filters, setFilters] = useState<DataGridFilter[]>([])
  const [noneSelectedFields, setNoneSelectedFields] = useState<string[]>([])

  const setFieldFilters = useCallback((field: string, values: string[]) => {
    const uniqueValues = [...new Set(values)]
    setFilters((prev) => [
      ...prev.filter((item) => item.field !== field),
      ...uniqueValues.map((value) => ({ field, value })),
    ])
    setNoneSelectedFields((prev) => prev.filter((item) => item !== field))
  }, [])

  const setFacetNoneSelected = useCallback((field: string, selected: boolean) => {
    setNoneSelectedFields((prev) =>
      selected
        ? prev.includes(field) ? prev : [...prev, field]
        : prev.filter((item) => item !== field)
    )
  }, [])

  const clearFilters = useCallback(() => {
    setFilters([])
    setNoneSelectedFields([])
  }, [])

  const removeFilter = useCallback((field: string) => {
    setFilters((prev) => prev.filter((item) => item.field !== field))
    setNoneSelectedFields((prev) => prev.filter((item) => item !== field))
  }, [])

  const activeFilterCount = useMemo(
    () => new Set([...filters.map((filter) => filter.field), ...noneSelectedFields]).size,
    [filters, noneSelectedFields]
  )

  return {
    filters,
    noneSelectedFields,
    setFieldFilters,
    setFacetNoneSelected,
    clearFilters,
    removeFilter,
    activeFilterCount,
  }
}

export default useDataGridFilters
