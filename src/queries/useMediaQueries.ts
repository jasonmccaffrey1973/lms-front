import { gql } from "@apollo/client"
import type { TypedDocumentNode } from "@apollo/client"

// Types
export type MediaKind = "image" | "video" | "audio"

export type MediaItem = {
  id: string
  kind: MediaKind
  name: string
  url: string
  mimeType: string
  size: number
  altText?: string
  createdAt: string
}

export type ListMediaQueryData = {
  listMedia: {
    items: MediaItem[]
    total: number
  }
}

export type ListMediaQueryVars = {
  kind?: MediaKind
  limit?: number
  offset?: number
}

export type UploadMediaMutationData = {
  uploadMedia: MediaItem
}

export type UploadMediaMutationVars = {
  kind: MediaKind
  file: File
  altText?: string
  storageLocation?: string
}

export type UploadMediaFromUrlMutationData = {
  uploadMediaFromUrl: MediaItem
}

export type UploadMediaFromUrlMutationVars = {
  kind: MediaKind
  url: string
  altText?: string
  storageLocation?: string
}

export type BulkUploadMediaMutationData = {
  bulkUploadMedia: MediaItem[]
}

export type BulkUploadMediaMutationVars = {
  kind: MediaKind
  files: File[]
  altText?: string
  storageLocation?: string
}

export type DeleteMediaMutationData = {
  deleteMedia: {
    success: boolean
    deletedCount: number
  }
}

export type DeleteMediaMutationVars = {
  ids: string[]
}

export type UpdateStorageLocationMutationData = {
  updateStorageLocation: {
    success: boolean
    location: string
  }
}

export type UpdateStorageLocationMutationVars = {
  location: string
}

// GraphQL Documents
export const LIST_MEDIA_GQL = gql`
  query ListMedia($kind: String, $limit: Int, $offset: Int) {
    listMedia(kind: $kind, limit: $limit, offset: $offset) {
      items {
        id
        kind
        name
        url
        mimeType
        size
        altText
        createdAt
      }
      total
    }
  }
` as TypedDocumentNode<ListMediaQueryData, ListMediaQueryVars>

export const UPLOAD_MEDIA_GQL = gql`
  mutation UploadMedia($kind: String!, $file: Upload!, $altText: String, $storageLocation: String) {
    uploadMedia(kind: $kind, file: $file, altText: $altText, storageLocation: $storageLocation) {
      id
      kind
      name
      url
      mimeType
      size
      altText
      createdAt
    }
  }
` as TypedDocumentNode<UploadMediaMutationData, UploadMediaMutationVars>

export const UPLOAD_MEDIA_FROM_URL_GQL = gql`
  mutation UploadMediaFromUrl($kind: String!, $url: String!, $altText: String, $storageLocation: String) {
    uploadMediaFromUrl(kind: $kind, url: $url, altText: $altText, storageLocation: $storageLocation) {
      id
      kind
      name
      url
      mimeType
      size
      altText
      createdAt
    }
  }
` as TypedDocumentNode<UploadMediaFromUrlMutationData, UploadMediaFromUrlMutationVars>

export const BULK_UPLOAD_MEDIA_GQL = gql`
  mutation BulkUploadMedia($kind: String!, $files: [Upload!]!, $altText: String, $storageLocation: String) {
    bulkUploadMedia(kind: $kind, files: $files, altText: $altText, storageLocation: $storageLocation) {
      id
      kind
      name
      url
      mimeType
      size
      altText
      createdAt
    }
  }
` as TypedDocumentNode<BulkUploadMediaMutationData, BulkUploadMediaMutationVars>

export const DELETE_MEDIA_GQL = gql`
  mutation DeleteMedia($ids: [String!]!) {
    deleteMedia(ids: $ids) {
      success
      deletedCount
    }
  }
` as TypedDocumentNode<DeleteMediaMutationData, DeleteMediaMutationVars>

export const UPDATE_STORAGE_LOCATION_GQL = gql`
  mutation UpdateStorageLocation($location: String!) {
    updateStorageLocation(location: $location) {
      success
      location
    }
  }
` as TypedDocumentNode<UpdateStorageLocationMutationData, UpdateStorageLocationMutationVars>
