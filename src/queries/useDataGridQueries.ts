import { gql } from "@apollo/client"
import type { TypedDocumentNode } from "@apollo/client"

export type DataGridFilterInput = {
  field: string
  value: string
}

export type DataGridInput = {
  entity: string
  after?: string | null
  first: number
  search?: string
  filters?: DataGridFilterInput[]
}

export type DataGridPageInfo = {
  endCursor: string | null
  hasNextPage: boolean
}

export type DataGridRow = Record<string, unknown>

export type DataGridResult = {
  items: DataGridRow[]
  pageInfo: DataGridPageInfo
  totalCount: number
}

export type DataGridQueryData = {
  dataGrid: DataGridResult
}

export type DataGridQueryVars = {
  input: DataGridInput
}

export const DATA_GRID_GQL = gql`
  query DataGrid($input: DataGridInput!) {
    dataGrid(input: $input) {
      items
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
` as TypedDocumentNode<DataGridQueryData, DataGridQueryVars>
