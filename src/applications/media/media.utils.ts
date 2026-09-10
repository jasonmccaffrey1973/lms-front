import type { MediaKind } from "./types";

export const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;
export const MAX_VIDEO_SIZE_BYTES = 50 * 1024 * 1024;

const MEDIA_MIME_PREFIX: Record<MediaKind, string> = {
  image: "image/",
  video: "video/",
};

export const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        resolve(result);
        return;
      }

      reject(new Error("Unable to read file as data URL."));
    };

    reader.onerror = () => reject(new Error("Unable to read file."));
    reader.readAsDataURL(file);
  });

export const normalizeMediaUrl = (url: string): string => url.trim();

export const isValidMediaUrl = (url: string): boolean => {
  const normalized = normalizeMediaUrl(url);
  if (!normalized) {
    return false;
  }

  if (normalized.startsWith("data:") || normalized.startsWith("blob:")) {
    return true;
  }

  try {
    const parsed = new URL(normalized);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
};

export const validateMediaFile = (
  kind: MediaKind,
  file: File,
): { valid: boolean; message?: string } => {
  const maxBytes = kind === "image" ? MAX_IMAGE_SIZE_BYTES : MAX_VIDEO_SIZE_BYTES;
  const mimePrefix = MEDIA_MIME_PREFIX[kind];

  if (!file.type || !file.type.startsWith(mimePrefix)) {
    return {
      valid: false,
      message: `Please select a valid ${kind} file.`,
    };
  }

  if (file.size > maxBytes) {
    const maxMB = Math.round(maxBytes / (1024 * 1024));
    return {
      valid: false,
      message: `${kind === "image" ? "Image" : "Video"} is too large. Max size is ${maxMB}MB.`,
    };
  }

  return { valid: true };
};

export const guessNameFromUrl = (url: string, kind: MediaKind): string => {
  try {
    const parsed = new URL(url);
    const pathName = parsed.pathname.split("/").filter(Boolean).pop();
    if (pathName) {
      return decodeURIComponent(pathName);
    }
  } catch {
    // Ignore URL parsing failure and fall back.
  }

  return kind === "image" ? "Image" : "Video";
};
