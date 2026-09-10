import type { MediaStorageAdapter } from "../storageAdapter";
import type {
  MediaItem,
  SaveMediaFromDataUrlInput,
  SaveMediaFromUrlInput,
} from "../types";

const MEDIA_STORAGE_KEY = "editor-media-library-v1";

const parseStoredItems = (value: string | null): MediaItem[] => {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((item) => {
      if (!item || typeof item !== "object") {
        return false;
      }

      const typedItem = item as Partial<MediaItem>;
      return (
        typeof typedItem.id === "string" &&
        (typedItem.kind === "image" || typedItem.kind === "video") &&
        typeof typedItem.name === "string" &&
        typeof typedItem.url === "string" &&
        typeof typedItem.createdAt === "string"
      );
    }) as MediaItem[];
  } catch {
    return [];
  }
};

const readItems = (): MediaItem[] => {
  if (typeof window === "undefined") {
    return [];
  }

  return parseStoredItems(window.localStorage.getItem(MEDIA_STORAGE_KEY));
};

const writeItems = (items: MediaItem[]) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(items));
};

const createId = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const createFromDataUrl = (input: SaveMediaFromDataUrlInput): MediaItem => ({
  id: createId(),
  kind: input.kind,
  name: input.name,
  url: input.dataUrl,
  mimeType: input.mimeType,
  size: input.size,
  altText: input.altText,
  createdAt: new Date().toISOString(),
});

const createFromUrl = (input: SaveMediaFromUrlInput): MediaItem => ({
  id: createId(),
  kind: input.kind,
  name: input.name,
  url: input.url,
  altText: input.altText,
  createdAt: new Date().toISOString(),
});

export const localMediaAdapter: MediaStorageAdapter = {
  list: async () => readItems(),

  saveFromDataUrl: async (input) => {
    const items = readItems();
    const mediaItem = createFromDataUrl(input);
    const nextItems = [mediaItem, ...items];

    writeItems(nextItems);
    return mediaItem;
  },

  saveFromUrl: async (input) => {
    const items = readItems();
    const mediaItem = createFromUrl(input);
    const nextItems = [mediaItem, ...items];

    writeItems(nextItems);
    return mediaItem;
  },

  remove: async (ids: string[]) => {
    if (!ids.length) {
      return;
    }

    const idSet = new Set(ids);
    const items = readItems();
    const nextItems = items.filter((item) => !idSet.has(item.id));

    writeItems(nextItems);
  },
};

export { MEDIA_STORAGE_KEY };
export default localMediaAdapter;
