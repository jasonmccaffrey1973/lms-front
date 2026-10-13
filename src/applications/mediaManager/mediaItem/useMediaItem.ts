import { useState, useMemo } from "react";
import formatDateTime from "../../../helperFunctions/formatDateTime";
import type { MediaItem } from "../../../queries/useMediaQueries";

const spaceCamelCase = (str: string) =>
  str.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());

const buildMeta = (item: MediaItem): Record<string, unknown> => {
  const meta: Record<string, unknown> = {
    filename: item.name,
    type: item.mimeType,
    size: item.size >= 1024 * 1024
      ? `${(item.size / (1024 * 1024)).toFixed(2)} MB`
      : `${(item.size / 1024).toFixed(1)} KB`,
    created: formatDateTime(item.createdAt),
  };

  if (item.altText) {
    meta.altText = item.altText;
  }

  return meta;
};

const sanitizeMeta = (meta: Record<string, unknown>) => {
  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(meta)) {
    if (typeof value === "string") {
      sanitized[spaceCamelCase(key)] = value;
    } else if (Array.isArray(value)) {
      sanitized[spaceCamelCase(key)] = value;
    } else if (typeof value === "object" && value !== null) {
      sanitized[spaceCamelCase(key)] = value;
    } else {
      sanitized[spaceCamelCase(key)] = String(value);
    }
  }
  return sanitized;
};

const useMediaItem = (item: MediaItem) => {
  const [MetaVisible, setMetaVisible] = useState(false);

  const meta = useMemo(() => sanitizeMeta(buildMeta(item)), [item]);

  const media = useMemo(
    () => ({
      filename: item.name,
      type: item.mimeType,
      src: item.url,
      kind: item.kind,
    }),
    [item]
  );

  const showMeta = () => setMetaVisible(true);
  const hideMeta = () => setMetaVisible(false);
  const toggleMeta = () => (MetaVisible ? hideMeta() : showMeta());

  return {
    media,
    showMeta,
    hideMeta,
    MetaVisible,
    toggleMeta,
    meta,
  };
};

export default useMediaItem;