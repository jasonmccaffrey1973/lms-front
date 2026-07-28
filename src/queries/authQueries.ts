import { gql } from "@apollo/client"
import type { TypedDocumentNode } from "@apollo/client"

export type MeQueryData = {
  me?: {
    id: string
    username: string
    email: string
  }
}

export const ME_GQL = gql`
  query Me {
    me {
      id
      username
      email
    }
  }
` as TypedDocumentNode<MeQueryData, Record<string, never>>