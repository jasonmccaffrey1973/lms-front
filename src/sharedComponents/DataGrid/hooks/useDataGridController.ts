import { useEffect, useMemo, useRef, useState } from "react"
import type { DataGridSortDirection, UseDataGridProps } from "../dataGrid.types"
import useDataGridFilters from "./useDataGridFilters"
import useDataGridQuery from "./useDataGridQuery"

const SEARCH_DEBOUNCE_MS = 250

const useDataGridController = <TData extends Record<string, unknown>,>({
  initialData = [] as TData[],
  pageSize = 50,
  fetchPage,
  filterableFields,
}: UseDataGridProps<TData>) => {
  const [searchValue, setSearchValue] = useState("")
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("")
  const [sort, setSort] = useState<{ field: string; direction: DataGridSortDirection } | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const { filters, setFilter, clearFilters, removeFilter, activeFilterCount } = useDataGridFilters()
  const { rows, totalCount, filteredCount, loading, error, hasNextPage, loadNextPage } = useDataGridQuery<TData>({
    initialData,
    pageSize,
    search: debouncedSearchValue,
    filters,
    sort,
    fetchPage,
  })

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearchValue(searchValue.trim())
    }, SEARCH_DEBOUNCE_MS)

    return () => window.clearTimeout(timeout)
  }, [searchValue])

  useEffect(() => {
    if (!hasNextPage) {
      return
    }

    const target = loadMoreRef.current
    if (!target) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          void loadNextPage()
        }
      },
      { rootMargin: "240px" }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [hasNextPage, loadNextPage, rows.length])

  const searchableRows = useMemo(() => {
    if (fetchPage) {
      return rows
    }

    const normalizedSearch = debouncedSearchValue.toLowerCase()
    if (!normalizedSearch) {
      return rows
    }

    return rows.filter((row) =>
      Object.values(row).some((value) => String(value).toLowerCase().includes(normalizedSearch))
    )
  }, [debouncedSearchValue, fetchPage, rows])

  const resolvedTotalCount = fetchPage ? totalCount : rows.length
  const resolvedFilteredCount = fetchPage ? filteredCount : searchableRows.length

  const availableFilterFields = useMemo(() => {
    if (filterableFields && filterableFields.length > 0) {
      return filterableFields
    }

    if (!rows[0]) {
      return [] as Array<Extract<keyof TData, string>>
    }

    return Object.keys(rows[0]) as Array<Extract<keyof TData, string>>
  }, [filterableFields, rows])

  const clearSearch = () => setSearchValue("")
  const toggleSort = (field: string) => {
    setSort((current) => {
      if (!current || current.field !== field) {
        return { field, direction: "asc" }
      }
      if (current.direction === "asc") {
        return { field, direction: "desc" }
      }
      return null
    })
  }

  return {
    searchValue,
    setSearchValue,
    clearSearch,
    rows: searchableRows,
    totalCount: resolvedTotalCount,
    filteredCount: resolvedFilteredCount,
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
  }
}

export default useDataGridController
