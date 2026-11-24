import { gql } from "@apollo/client"
import type { TypedDocumentNode } from "@apollo/client"

export type UserDataGridRow = {
  id: string
  name: string
  email: string
  __typename?: string
}

export type UsersFilterInput = {
  field: string
  value: string
}

export type UsersSortableField = "NAME" | "EMAIL" | "USERNAME" | "CREATED_AT"
export type SortDirection = "ASC" | "DESC"

export type UsersSortInput = {
  field: UsersSortableField
  direction: SortDirection
}

type UsersMetaData = {
  usersMeta: {
    totalCount: number
    filteredCount: number
  }
}

type UsersQueryData = {
  users: {
    edges: Array<{
      cursor: string
      node: UserDataGridRow
    }>
    pageInfo: {
      hasNextPage: boolean
      endCursor: string | null
    }
  }
}

type UsersQueryVars = {
  first: number
  after?: string
  search?: string
  filters?: UsersFilterInput[]
  sort?: UsersSortInput
}

type UsersWithMetaQueryData = UsersQueryData & UsersMetaData
export type { UsersWithMetaQueryData, UsersQueryData, UsersQueryVars }

export const USERS_CONNECTION_QUERY = gql`
  query GetUsers($first: Int!, $after: String, $search: String, $filters: [UsersFilter!], $sort: UsersSortInput) {
    users(first: $first, after: $after, search: $search, filters: $filters, sort: $sort) {
      edges {
        cursor
        node {
          id
          name
          email
          __typename
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
` as TypedDocumentNode<UsersQueryData, UsersQueryVars>

export const USERS_META_QUERY = gql`
  query GetUsersMeta($search: String, $filters: [UsersFilter!], $sort: UsersSortInput) {
    usersMeta(search: $search, filters: $filters, sort: $sort) {
      totalCount
      filteredCount
    }
  }
` as TypedDocumentNode<UsersMetaData, Pick<UsersQueryVars, "search" | "filters" | "sort">>

export const USERS_WITH_META_CONNECTION_QUERY = gql`
  query GetUsersWithMeta($first: Int!, $after: String, $search: String, $filters: [UsersFilter!], $sort: UsersSortInput) {
    users(first: $first, after: $after, search: $search, filters: $filters, sort: $sort) {
      edges {
        cursor
        node {
          id
          name
          email
          __typename
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
    usersMeta(search: $search, filters: $filters, sort: $sort) {
      totalCount
      filteredCount
    }
  }
` as TypedDocumentNode<UsersWithMetaQueryData, UsersQueryVars>