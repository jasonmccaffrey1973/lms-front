import { ApolloClient } from "@apollo/client"
import { print } from "graphql"
import { getAuthToken } from "../../auth/tokenStore"
import {
  LIST_MEDIA_GQL,
  UPLOAD_MEDIA_GQL,
  UPLOAD_MEDIA_FROM_URL_GQL,
  BULK_UPLOAD_MEDIA_GQL,
  DELETE_MEDIA_GQL,
  UPDATE_STORAGE_LOCATION_GQL,
  type MediaItem,
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

export interface UploadOptions {
  signal?: AbortSignal
  onProgress?: (percentage: number) => void
}

/**
 * Sends a GraphQL mutation with file uploads using the GraphQL multipart request spec:
 * https://github.com/jaydenseric/graphql-multipart-request-spec
 */
async function uploadMultipartGraphQL<TData>(
  endpoint: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryDoc: any,
  variables: Record<string, unknown>,
  fileMap: Array<{ variablePath: string; file: File }>,
  options?: UploadOptions
): Promise<TData> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open("POST", endpoint)

    const token = getAuthToken()
    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`)
    }

    const formData = new FormData()

    // 1. Prepare operations object where mapped file paths are set to null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const operationsVariables: any = { ...variables }
    Object.keys(operationsVariables).forEach((key) => {
      if (operationsVariables[key] === undefined) {
        delete operationsVariables[key]
      }
    })
    fileMap.forEach(({ variablePath }) => {
      const parts = variablePath.split(".")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let curr = operationsVariables
      for (let i = 0; i < parts.length - 1; i++) {
        const p = parts[i]
        if (!(p in curr)) {
          curr[p] = /^\d+$/.test(parts[i + 1]) ? [] : {}
        }
        curr = curr[p]
      }
      curr[parts[parts.length - 1]] = null
    })

    formData.append(
      "operations",
      JSON.stringify({
        query: typeof queryDoc === "string" ? queryDoc : print(queryDoc),
        variables: operationsVariables,
      })
    )

    // 2. Prepare map: {"0": ["variables.file"], "1": ["variables.files.0"], ...}
    const mapObj: Record<string, string[]> = {}
    fileMap.forEach(({ variablePath }, idx) => {
      mapObj[String(idx)] = [`variables.${variablePath}`]
    })
    formData.append("map", JSON.stringify(mapObj))

    // 3. Attach binary files: "0": File, "1": File, ...
    fileMap.forEach(({ file }, idx) => {
      formData.append(String(idx), file, file.name)
    })

    if (options?.onProgress) {
      xhr.upload.onprogress = (evt) => {
        if (evt.lengthComputable) {
          const pct = Math.round((evt.loaded / evt.total) * 100)
          options.onProgress?.(pct)
        }
      }
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const json = JSON.parse(xhr.responseText)
          if (json.errors && json.errors.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            reject(new Error(json.errors.map((e: any) => e.message).join("; ")))
          } else {
            resolve(json.data as TData)
          }
        } catch {
          reject(new Error("Invalid JSON response from GraphQL server"))
        }
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}: ${xhr.statusText}`))
      }
    }

    xhr.onerror = () => reject(new Error("Network error during GraphQL file upload"))

    if (options?.signal) {
      if (options.signal.aborted) {
        xhr.abort()
        reject(new Error("Upload aborted"))
        return
      }
      options.signal.addEventListener("abort", () => {
        xhr.abort()
        reject(new Error("Upload aborted"))
      })
    }

    xhr.send(formData)
  })
}

export class MediaService {
  constructor(
    private client: ApolloClient,
    private endpoint: string = import.meta.env.VITE_GRAPHQL_HTTP_URL || "/graphql"
  ) {}

  async listMedia(variables?: ListMediaQueryVars): Promise<MediaItem[]> {
    try {
      const result = await this.client.query<ListMediaQueryData, ListMediaQueryVars>({
        query: LIST_MEDIA_GQL,
        variables,
        fetchPolicy: "network-only",
      })
      return result.data?.listMedia.items ?? []
    } catch (error) {
      console.error("Failed to list media:", error)
      return []
    }
  }

  async uploadMedia(
    variables: UploadMediaMutationVars,
    options?: UploadOptions
  ): Promise<MediaItem | null> {
    try {
      // Use GraphQL multipart request spec to properly attach the file binary
      const data = await uploadMultipartGraphQL<UploadMediaMutationData>(
        this.endpoint,
        UPLOAD_MEDIA_GQL,
        variables as unknown as Record<string, unknown>,
        [{ variablePath: "file", file: variables.file }],
        options
      )
      return data?.uploadMedia ?? null
    } catch (error) {
      console.error("Failed to upload media:", error)
      throw error
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
    variables: BulkUploadMediaMutationVars,
    options?: UploadOptions
  ): Promise<MediaItem[]> {
    try {
      // Map each file in the files array to its variable path (variables.files.0, variables.files.1, ...)
      const fileMap = variables.files.map((file, idx) => ({
        variablePath: `files.${idx}`,
        file,
      }))

      const data = await uploadMultipartGraphQL<BulkUploadMediaMutationData>(
        this.endpoint,
        BULK_UPLOAD_MEDIA_GQL,
        variables as unknown as Record<string, unknown>,
        fileMap,
        options
      )
      return data?.bulkUploadMedia ?? []
    } catch (error) {
      console.error("Failed to bulk upload media:", error)
      throw error
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

export function createMediaService(client: ApolloClient, endpoint?: string): MediaService {
  return new MediaService(client, endpoint)
}
