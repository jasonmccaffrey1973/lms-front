import type { MediaItem } from "../../../queries/useMediaQueries";

export interface MediaItemProps {
  item: MediaItem;
  onSelect?: (item: MediaItem) => void;
  onDelete?: (id: string) => void;
  isItemChecked: () => boolean;
  toggleItemCheck: () => void;
  uncheckItem: () => void;
}

