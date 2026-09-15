import { ApolloClient } from "@apollo/client"
import {
  LIST_MEDIA_GQL,
  UPLOAD_MEDIA_GQL,
  UPLOAD_MEDIA_FROM_URL_GQL,
  BULK_UPLOAD_MEDIA_GQL,
  DELETE_MEDIA_GQL,
  UPDATE_STORAGE_LOCATION_GQL,
  type MediaItem,
  type MediaKind,
  type ListMediaQueryData,
  type ListMediaQueryVars,
  type UploadMediaMutationData,
  type UploadMediaMutationVars,
  type UploadMediaFromUrlMutationData,
  type UploadMediaFromUrlMutationVars,
  type BulkUploadMediaMutationData,
  type BulkUploadMediaMutationVars,
  type DeleteMediaMutationData,
  type DeleteMediaMutationVars,
  type UpdateStorageLocationMutationData,
  type UpdateStorageLocationMutationVars,
} from "../../queries/useMediaQueries"

export class MediaService {
  constructor(private client: ApolloClient<any>) {}

  async listMedia(variables?: ListMediaQueryVars): Promise<MediaItem[]> {
    try {
      const result = await this.client.query<ListMediaQueryData, ListMediaQueryVars>({
        query: LIST_MEDIA_GQL,
        variables,
      })
      return result.data?.listMedia.items ?? []
    } catch (error) {
      console.error("Failed to list media:", error)
      return []
    }
  }

  async uploadMedia(
    variables: UploadMediaMutationVars
  ): Promise<MediaItem | null> {
    try {
      const result = await this.client.mutate<
        UploadMediaMutationData,
        UploadMediaMutationVars
      >({
        mutation: UPLOAD_MEDIA_GQL,
        variables,
      })
      return result.data?.uploadMedia ?? null
    } catch (error) {
      console.error("Failed to upload media:", error)
      return null
    }
  }

  async uploadMediaFromUrl(
    variables: UploadMediaFromUrlMutationVars
  ): Promise<MediaItem | null> {
    try {
      const result = await this.client.mutate<
        UploadMediaFromUrlMutationData,
        UploadMediaFromUrlMutationVars
      >({
        mutation: UPLOAD_MEDIA_FROM_URL_GQL,
        variables,
      })
      return result.data?.uploadMediaFromUrl ?? null
    } catch (error) {
      console.error("Failed to upload media from URL:", error)
      return null
    }
  }

  async bulkUploadMedia(
    variables: BulkUploadMediaMutationVars
  ): Promise<MediaItem[]> {
    try {
      const result = await this.client.mutate<
        BulkUploadMediaMutationData,
        BulkUploadMediaMutationVars
      >({
        mutation: BULK_UPLOAD_MEDIA_GQL,
        variables,
      })
      return result.data?.bulkUploadMedia ?? []
    } catch (error) {
      console.error("Failed to bulk upload media:", error)
      return []
    }
  }

  async deleteMedia(
    variables: DeleteMediaMutationVars
  ): Promise<{ success: boolean; deletedCount: number }> {
    try {
      const result = await this.client.mutate<
        DeleteMediaMutationData,
        DeleteMediaMutationVars
      >({
        mutation: DELETE_MEDIA_GQL,
        variables,
      })
      return result.data?.deleteMedia ?? { success: false, deletedCount: 0 }
    } catch (error) {
      console.error("Failed to delete media:", error)
      return { success: false, deletedCount: 0 }
    }
  }

  async updateStorageLocation(
    variables: UpdateStorageLocationMutationVars
  ): Promise<{ success: boolean; location: string }> {
    try {
      const result = await this.client.mutate<
        UpdateStorageLocationMutationData,
        UpdateStorageLocationMutationVars
      >({
        mutation: UPDATE_STORAGE_LOCATION_GQL,
        variables,
      })
      return result.data?.updateStorageLocation ?? {
        success: false,
        location: "",
      }
    } catch (error) {
      console.error("Failed to update storage location:", error)
      return { success: false, location: "" }
    }
  }
}

export function createMediaService(client: ApolloClient<any>): MediaService {
  return new MediaService(client)
}
