import { useCallback, useEffect, useRef, useState } from "react"
import type { ChangeEvent, MouseEvent } from "react"
import type { FilterFacetProps, FilterOption } from "./filterFacet.types"

const FACET_PAGE_SIZE = 50
const FACET_SEARCH_DEBOUNCE_MS = 200

const useFilterFacet = ({ name, filters, noneSelected, setFieldFilters, setFacetNoneSelected, search, fetchFacetOptions }: FilterFacetProps) => {
  const [options, setOptions] = useState<FilterOption[]>([])
  const [searchValue, setSearchValue] = useState("")
  const [facetOpen, setFacetOpen] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [loadedCount, setLoadedCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const requestVersion = useRef(0)
  const optionsSearchKey = useRef(JSON.stringify([search, searchValue.trim()]))
  const optionsListRef = useRef<HTMLUListElement | null>(null)
  const loadMoreSentinelRef = useRef<HTMLLIElement | null>(null)

  useEffect(() => {
    if (!facetOpen || !fetchFacetOptions) {
      return
    }

    const version = ++requestVersion.current
    let isCurrent = true
    const searchKey = JSON.stringify([search, searchValue.trim()])

    const timeout = window.setTimeout(() => {
      setLoading(true)
      setLoadingMore(false)
      setError(null)
      setHasMore(false)
      if (optionsSearchKey.current !== searchKey) {
        optionsSearchKey.current = searchKey
        setOptions([])
        setLoadedCount(0)
      }

      void fetchFacetOptions({
        field: name,
        search,
        filters,
        facetSearch: searchValue.trim(),
        limit: FACET_PAGE_SIZE,
        offset: 0,
      }).then((page) => {
        if (!isCurrent || requestVersion.current !== version) return
        setOptions((current) => {
          const merged = new Map(current.map((option) => [option.value, option]))
          page.options.forEach((option) => merged.set(option.value, option))
          return [...merged.values()]
        })
        setHasMore(page.hasMore)
        setTotalCount(page.totalCount)
        setLoadedCount(page.options.length)
      }).catch((caughtError: unknown) => {
        if (!isCurrent || requestVersion.current !== version) return
        setError(caughtError instanceof Error ? caughtError.message : "Failed to load filter options")
      }).finally(() => {
        if (isCurrent && requestVersion.current === version) setLoading(false)
      })
    }, FACET_SEARCH_DEBOUNCE_MS)

    return () => {
      isCurrent = false
      window.clearTimeout(timeout)
      if (requestVersion.current === version) requestVersion.current += 1
    }
  }, [facetOpen, fetchFacetOptions, filters, name, search, searchValue])

  const loadMore = useCallback(async () => {
    if (!fetchFacetOptions || !hasMore || loading || loadingMore) return
    const version = requestVersion.current
    setLoadingMore(true)
    setError(null)

    try {
      const page = await fetchFacetOptions({
        field: name,
        search,
        filters,
        facetSearch: searchValue.trim(),
        limit: FACET_PAGE_SIZE,
        offset: loadedCount,
      })
      if (requestVersion.current !== version) return
      setOptions((current) => [...current, ...page.options])
      setHasMore(page.hasMore)
      setTotalCount(page.totalCount)
      setLoadedCount((current) => current + page.options.length)
    } catch (caughtError) {
      if (requestVersion.current === version) {
        setError(caughtError instanceof Error ? caughtError.message : "Failed to load more filter options")
      }
    } finally {
      if (requestVersion.current === version) setLoadingMore(false)
    }
  }, [fetchFacetOptions, filters, hasMore, loadedCount, loading, loadingMore, name, search, searchValue])

  const fetchAllFacetValues = useCallback(async (facetSearch: string) => {
    if (!fetchFacetOptions) return options.map((option) => option.value)

    const values: string[] = []
    let offset = 0
    let hasNextPage = true
    while (hasNextPage) {
      const page = await fetchFacetOptions({
        field: name,
        search,
        filters,
        facetSearch,
        limit: 200,
        offset,
      })
      values.push(...page.options.map((option) => option.value))
      offset += page.options.length
      hasNextPage = page.hasMore && page.options.length > 0
    }
    return [...new Set(values)]
  }, [fetchFacetOptions, filters, name, options, search])

  useEffect(() => {
    const root = optionsListRef.current
    const sentinel = loadMoreSentinelRef.current
    if (!facetOpen || !hasMore || loading || loadingMore || error || !root || !sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          void loadMore()
        }
      },
      { root, rootMargin: "80px" }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [error, facetOpen, hasMore, loading, loadingMore, loadMore])

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const fieldValues = filters.filter((filter) => filter.field === name).map((filter) => filter.value)
  const isOptionSelected = (option: FilterOption) =>
    !noneSelected && (fieldValues.length === 0 || fieldValues.includes(option.value))

  const toggleOption = async (option: FilterOption) => {
    if (noneSelected) {
      setFacetNoneSelected(name, false)
      setFieldFilters(name, [option.value])
      return
    }

    if (fieldValues.length === 0) {
      setLoadingMore(true)
      setError(null)
      try {
        const allValues = await fetchAllFacetValues("")
        const remainingValues = allValues.filter((value) => value !== option.value)
        setFieldFilters(name, remainingValues)
        setFacetNoneSelected(name, remainingValues.length === 0)
      } catch (caughtError) {
        setError(caughtError instanceof Error ? caughtError.message : "Failed to update filter selection")
      } finally {
        setLoadingMore(false)
      }
      return
    }

    const nextValues = fieldValues.includes(option.value)
      ? fieldValues.filter((value) => value !== option.value)
      : [...fieldValues, option.value]
    setFieldFilters(name, nextValues)
    setFacetNoneSelected(name, nextValues.length === 0)
  }

  const showOnly = (option: FilterOption, event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setFacetNoneSelected(name, false)
    setFieldFilters(name, [option.value])
  }

  const showAll = async () => {
    if (fieldValues.length === 0 && !noneSelected) return
    const version = requestVersion.current
    const query = searchValue.trim().toLowerCase()
    const selectedOutsideSearch = filters
      .filter((filter) => filter.field === name && query && !filter.value.toLowerCase().includes(query))
      .map((filter) => filter.value)

    if (!fetchFacetOptions) {
      setFieldFilters(name, [...selectedOutsideSearch, ...options.map((option) => option.value)])
      return
    }

    setLoadingMore(true)
    setError(null)
    try {
      const allValues = await fetchAllFacetValues(searchValue.trim())

      if (requestVersion.current === version) {
        setFieldFilters(name, [...selectedOutsideSearch, ...allValues])
        setFacetNoneSelected(name, false)
      }
    } catch (caughtError) {
      if (requestVersion.current === version) {
        setError(caughtError instanceof Error ? caughtError.message : "Failed to select all filter options")
      }
    } finally {
      if (requestVersion.current === version) setLoadingMore(false)
    }
  }

  const showNone = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setFieldFilters(name, [])
    setFacetNoneSelected(name, true)
  }

  const clearAllFilters = () => {
    setFieldFilters(name, [])
    setFacetNoneSelected(name, false)
  }

  const matchingSelectedCount = fieldValues.filter((value) =>
    !searchValue.trim() || value.toLowerCase().includes(searchValue.trim().toLowerCase())
  ).length
  const allMatchingOptionsSelected = !noneSelected && (
    fieldValues.length === 0 || (totalCount > 0 && matchingSelectedCount >= totalCount)
  )

  const getOptionAction = (option: FilterOption) => {
    if (allMatchingOptionsSelected) return { label: "Show None", action: showNone }
    if (isOptionSelected(option)) {
      return {
        label: "Show All",
        action: (event: MouseEvent<HTMLButtonElement>) => {
          event.stopPropagation()
          void showAll()
        },
      }
    }
    return { label: "Show Only", action: (event: MouseEvent<HTMLButtonElement>) => showOnly(option, event) }
  }

  const toggleFacetOpen = () => setFacetOpen((previous) => !previous)

  return {
    options,
    searchValue,
    handleSearchChange,
    isOptionSelected,
    toggleOption,
    fieldValues,
    getOptionAction,
    clearAllFilters,
    toggleFacetOpen,
    isFacetOpen: facetOpen,
    hasMore,
    loading,
    loadingMore,
    error,
    loadMore,
    optionsListRef,
    loadMoreSentinelRef,
  }
}

export default useFilterFacet
