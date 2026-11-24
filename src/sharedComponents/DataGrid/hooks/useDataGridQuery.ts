import { useCallback, useEffect, useMemo, useState } from "react"
import type { DataGridFetchPage, DataGridFilter, DataGridSort } from "../dataGrid.types"

type UseDataGridQueryProps<TData> = {
  initialData: TData[]
  pageSize: number
  search: string
  filters: DataGridFilter[]
  sort: DataGridSort | null
  fetchPage?: DataGridFetchPage<TData>
}

const useDataGridQuery = <TData,>({
  initialData,
  pageSize,
  search,
  filters,
  sort,
  fetchPage,
}: UseDataGridQueryProps<TData>) => {
  const [rows, setRows] = useState<TData[]>(initialData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [endCursor, setEndCursor] = useState<string | null>(null)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [totalCount, setTotalCount] = useState(initialData.length)
  const [filteredCount, setFilteredCount] = useState(initialData.length)

  const filterKey = useMemo(() => JSON.stringify(filters), [filters])
  const sortKey = useMemo(() => JSON.stringify(sort), [sort])

  useEffect(() => {
    if (!fetchPage) {
      return
    }

    let isCancelled = false

    const run = async () => {
      setLoading(true)
      setError(null)
      try {
        const page = await fetchPage({
          after: null,
          first: pageSize,
          search,
          filters,
          sort,
        })

        if (isCancelled) {
          return
        }

        setRows(page.items)
        setEndCursor(page.endCursor)
        setHasNextPage(page.hasNextPage)
        setTotalCount(page.totalCount)
        setFilteredCount(page.filteredCount ?? page.totalCount)
      } catch (caughtError) {
        if (isCancelled) {
          return
        }
        setError(caughtError instanceof Error ? caughtError.message : "Failed to load data")
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    void run()

    return () => {
      isCancelled = true
    }
  }, [fetchPage, pageSize, search, filterKey, filters, sortKey, sort])

  const loadNextPage = useCallback(async () => {
    if (!fetchPage || loading || !hasNextPage) {
      return
    }

    setLoading(true)
    setError(null)
    try {
      const page = await fetchPage({
        after: endCursor,
        first: pageSize,
        search,
        filters,
        sort,
      })

      setRows((prev) => [...prev, ...page.items])
      setEndCursor(page.endCursor)
      setHasNextPage(page.hasNextPage)
      setTotalCount(page.totalCount)
      setFilteredCount(page.filteredCount ?? page.totalCount)
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Failed to load more rows")
    } finally {
      setLoading(false)
    }
  }, [endCursor, fetchPage, filters, hasNextPage, loading, pageSize, search, sort])

  return {
    rows: fetchPage ? rows : initialData,
    totalCount: fetchPage ? totalCount : initialData.length,
    filteredCount: fetchPage ? filteredCount : initialData.length,
    loading,
    error,
    hasNextPage,
    loadNextPage,
  }
}

export default useDataGridQuery
