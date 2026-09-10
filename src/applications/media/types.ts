export type MediaKind = "image" | "video";

export type MediaSource = "upload" | "url";

export type MediaItem = {
  id: string;
  kind: MediaKind;
  name: string;
  url: string;
  mimeType?: string;
  size?: number;
  altText?: string;
  createdAt: string;
};

export type SaveMediaFromDataUrlInput = {
  kind: MediaKind;
  dataUrl: string;
  name: string;
  mimeType?: string;
  size?: number;
  altText?: string;
};

export type SaveMediaFromUrlInput = {
  kind: MediaKind;
  url: string;
  name: string;
  altText?: string;
};

export type MediaUploadOptions = {
  altText?: string;
  name?: string;
};

export type MediaUrlOptions = {
  altText?: string;
  name?: string;
};

export type MediaInsertPayload = {
  id: string;
  kind: MediaKind;
  url: string;
  name: string;
  altText?: string;
  mimeType?: string;
  size?: number;
};
