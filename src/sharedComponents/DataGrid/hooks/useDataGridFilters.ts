import { useCallback, useMemo, useState } from "react"
import type { DataGridFilter } from "../dataGrid.types"

const useDataGridFilters = () => {
  const [filters, setFilters] = useState<DataGridFilter[]>([])

  const setFilter = useCallback((field: string, value: string) => {
    setFilters((prev) => {
      const next = prev.filter((item) => item.field !== field)
      const trimmedValue = value.trim()
      if (!trimmedValue) {
        return next
      }
      return [...next, { field, value: trimmedValue }]
    })
  }, [])

  const clearFilters = useCallback(() => {
    setFilters([])
  }, [])

  const removeFilter = useCallback((field: string) => {
    setFilters((prev) => prev.filter((item) => item.field !== field))
  }, [])

  const activeFilterCount = useMemo(() => filters.length, [filters])

  return {
    filters,
    setFilter,
    clearFilters,
    removeFilter,
    activeFilterCount,
  }
}

export default useDataGridFilters
