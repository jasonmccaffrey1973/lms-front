import type {
  MediaItem,
  SaveMediaFromDataUrlInput,
  SaveMediaFromUrlInput,
} from "./types";

export type MediaStorageAdapter = {
  list: () => Promise<MediaItem[]>;
  saveFromDataUrl: (input: SaveMediaFromDataUrlInput) => Promise<MediaItem>;
  saveFromUrl: (input: SaveMediaFromUrlInput) => Promise<MediaItem>;
  remove: (ids: string[]) => Promise<void>;
};
