import localMediaAdapter from "./adapters/localMediaAdapter";
import type { MediaStorageAdapter } from "./storageAdapter";
import type {
  MediaInsertPayload,
  MediaItem,
  MediaKind,
  MediaUploadOptions,
  MediaUrlOptions,
} from "./types";
import {
  fileToDataUrl,
  guessNameFromUrl,
  isValidMediaUrl,
  normalizeMediaUrl,
  validateMediaFile,
} from "./media.utils";

const toPayload = (item: MediaItem): MediaInsertPayload => ({
  id: item.id,
  kind: item.kind,
  url: item.url,
  name: item.name,
  altText: item.altText,
  mimeType: item.mimeType,
  size: item.size,
});

export type MediaService = {
  listMedia: () => Promise<MediaItem[]>;
  addUploadMedia: (
    kind: MediaKind,
    file: File,
    options?: MediaUploadOptions,
  ) => Promise<MediaInsertPayload>;
  addUrlMedia: (
    kind: MediaKind,
    url: string,
    options?: MediaUrlOptions,
  ) => Promise<MediaInsertPayload>;
  deleteMedia: (ids: string[]) => Promise<void>;
};

export const createMediaService = (
  adapter: MediaStorageAdapter = localMediaAdapter,
): MediaService => ({
  listMedia: async () => adapter.list(),

  addUploadMedia: async (kind, file, options) => {
    const validation = validateMediaFile(kind, file);
    if (!validation.valid) {
      throw new Error(validation.message || "Invalid file.");
    }

    const dataUrl = await fileToDataUrl(file);
    const saved = await adapter.saveFromDataUrl({
      kind,
      dataUrl,
      name: options?.name || file.name || (kind === "image" ? "Image" : "Video"),
      altText: options?.altText,
      mimeType: file.type,
      size: file.size,
    });

    return toPayload(saved);
  },

  addUrlMedia: async (kind, url, options) => {
    const normalizedUrl = normalizeMediaUrl(url);
    if (!isValidMediaUrl(normalizedUrl)) {
      throw new Error("Please provide a valid media URL.");
    }

    const saved = await adapter.saveFromUrl({
      kind,
      url: normalizedUrl,
      name: options?.name || guessNameFromUrl(normalizedUrl, kind),
      altText: options?.altText,
    });

    return toPayload(saved);
  },

  deleteMedia: async (ids) => {
    await adapter.remove(ids);
  },
});

export default createMediaService;
