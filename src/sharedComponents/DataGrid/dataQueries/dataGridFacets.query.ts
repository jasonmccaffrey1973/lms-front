import { gql } from "@apollo/client"
import type { TypedDocumentNode } from "@apollo/client"
import type { DataGridFacetOption, DataGridFilter } from "../dataGrid.types"

type DataGridFacetsQueryData = {
  dataGridFacets: Array<{
    field: string
    options: DataGridFacetOption[]
    totalCount: number
    hasMore: boolean
  }>
}

type DataGridFacetsQueryVars = {
  fields: string[]
  search?: string
  filters?: DataGridFilter[]
  facetSearch?: string
  limit: number
  offset: number
  resource?: string
}

const DATA_GRID_FACETS_QUERY = gql`
  query DataGridFacets(
    $fields: [String!]!
    $search: String
    $filters: [DataGridFilterInput!]
    $facetSearch: String
    $limit: Int = 50
    $offset: Int = 0
    $resource: String = "users"
  ) {
    dataGridFacets(
      fields: $fields
      search: $search
      filters: $filters
      facetSearch: $facetSearch
      limit: $limit
      offset: $offset
      resource: $resource
    ) {
      field
      totalCount
      hasMore
      options {
        value
        label
        count
      }
    }
  }
` as TypedDocumentNode<DataGridFacetsQueryData, DataGridFacetsQueryVars>

export { DATA_GRID_FACETS_QUERY }
export type { DataGridFacetsQueryData, DataGridFacetsQueryVars }
