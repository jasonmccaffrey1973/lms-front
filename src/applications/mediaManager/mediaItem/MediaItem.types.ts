import type { MediaItem } from "../../../queries/useMediaQueries";

export interface MediaItemProps {
  item: MediaItem;
  isItemChecked: () => boolean;
  toggleItemCheck: () => void;
  uncheckItem: () => void;
}

