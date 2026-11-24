import { useApolloClient } from "@apollo/client/react"
import { useCallback } from "react"
import type { DataGridFetchPage, DataGridSort } from "../../sharedComponents/DataGrid/dataGrid.types"
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

  return {
    fetchPage,
  }
}

export default useAdminUsers