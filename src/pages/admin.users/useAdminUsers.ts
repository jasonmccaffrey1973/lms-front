import { useApolloClient } from "@apollo/client/react"
import { useCallback, useMemo } from "react"
import type { DataGridColumn, DataGridFetchFacetOptions, DataGridFetchPage, DataGridFooterAction, DataGridSort } from "../../sharedComponents/DataGrid/dataGrid.types"
import { DATA_GRID_FACETS_QUERY } from "../../sharedComponents/DataGrid/dataQueries/dataGridFacets.query"
import {
  USERS_WITH_META_CONNECTION_QUERY,
  type SortDirection,
  type UserDataGridRow,
  type UsersQueryVars,
  type UsersSortableField,
} from "../../sharedComponents/DataGrid/dataQueries/users.query"

const SORT_FIELD_MAP: Record<string, UsersSortableField> = {
  name: "NAME",
  email: "EMAIL",
}

const mapSort = (sort: DataGridSort | null) => {
  if (!sort) {
    return undefined
  }
  const mappedField = SORT_FIELD_MAP[sort.field]
  if (!mappedField) {
    return undefined
  }
  const direction: SortDirection = sort.direction === "asc" ? "ASC" : "DESC"
  return {
    field: mappedField,
    direction,
  }
}

const useAdminUsers = () => {
  const apolloClient = useApolloClient()

  const fetchPage = useCallback<DataGridFetchPage<UserDataGridRow>>(
    async ({ after, first, search, filters, sort }) => {
      const variables: UsersQueryVars = {
        first,
        after: after ?? undefined,
        search: search || undefined,
        filters: filters.length > 0 ? filters : undefined,
        sort: mapSort(sort),
      }
      const response = await apolloClient.query({
        query: USERS_WITH_META_CONNECTION_QUERY,
        variables,
        fetchPolicy: "network-only",
      })

      const data = response.data
      if (!data) {
        throw new Error("Users query returned no data.")
      }

      const usersConnection = data.users

      return {
        items: usersConnection.edges.map((edge) => edge.node),
        endCursor: usersConnection.pageInfo.endCursor,
        hasNextPage: usersConnection.pageInfo.hasNextPage,
        totalCount: data.usersMeta.totalCount,
        filteredCount: data.usersMeta.filteredCount,
      }
    },
    [apolloClient]
  )

  const fetchFacetOptions = useCallback<DataGridFetchFacetOptions>(
    async ({ field, search, filters, facetSearch, limit, offset }) => {
      const response = await apolloClient.query({
        query: DATA_GRID_FACETS_QUERY,
        variables: {
          fields: [field],
          search: search || undefined,
          filters: filters.length > 0 ? filters : undefined,
          facetSearch: facetSearch || undefined,
          limit,
          offset,
          resource: "users",
        },
        fetchPolicy: "network-only",
      })

      const facet = response.data?.dataGridFacets.find((item) => item.field === field)
      if (!facet) {
        throw new Error(`No facet data returned for ${field}.`)
      }

      return {
        options: facet.options,
        totalCount: facet.totalCount,
        hasMore: facet.hasMore,
      }
    },
    [apolloClient]
  )

  const columns = useMemo<DataGridColumn<UserDataGridRow>[]>(
    () => [
      { key: "id", header: "ID", visible: false, sortable: false },
      { key: "name", header: "Name", sortable: true },
      { key: "email", header: "Email", sortable: true },
      {
        key: "__typename",
        header: "Role",
        sortable: false,
        render: (row) => row.__typename ?? "",
      },
    ],
    []
  )

  const footerActions = useMemo<DataGridFooterAction<UserDataGridRow>[]>(
    () => [
      {
        id: "impersonate-user",
        label: "Impersonate User",
        isVisible: (selectedRows) => selectedRows.length === 1,
        onClick: (selectedRows) => {
          console.log("Impersonate user", selectedRows[0])
        },
        svg: 'profile'
      },
      {
        id: "edit-users",
        label: "Edit",
        isVisible: (selectedRows) => selectedRows.length > 1,
        onClick: (selectedRows) => {
          console.log("Edit users", selectedRows)
        },
        svg: 'edit'
      },
      {
        id: "delete-users",
        label: "Delete",
        isVisible: (selectedRows) => selectedRows.length > 1,
        onClick: (selectedRows) => {
          console.log("Delete users", selectedRows)
        },
        svg: 'trash'
      },
    ],
    []
  )


  return {
    fetchPage,
    fetchFacetOptions,
    columns,
    footerActions,
  }
}

export default useAdminUsers
