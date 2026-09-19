import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { useApolloClient } from "@apollo/client/react";
import { MEDIA_TYPES, RIBBON_ICONS } from "./mediaManager.constants";
import type { RibbonIcon, MediaTab, GroupedRibbonIcons, RibbonGroups } from "./MediaManager.types";
import type { MediaItem, MediaKind } from "../../queries/useMediaQueries";
import { createMediaService } from "./mediaService";
import type { Accept } from "react-dropzone";
import useDialog from "../../sharedComponents/dialog/useDialog";
import useSelectedCheck from "../../sharedComponents/selectedCheck/useSelectedCheck"; 
                    
const isMediaTab = (value: string): value is MediaTab => value in RIBBON_ICONS;

const useMediaManager = () => {
  const client = useApolloClient();
  const mediaService = useMemo(() => createMediaService(client), [client]);
 
/**================================================================================
 *  Media Manager Constants
 ** ================================================================================ */

/** -------------------------------------------------------------------------------
 *  Accepted file types for each media type.
 ** ------------------------------------------------------------------------------- */
  const ACCEPT_BY_TYPE: Record<string, Accept> = {
  image: { "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"] },
  video: { "video/*": [".mp4", ".webm", ".mov", ".avi"] },
  audio: { "audio/*": [".mp3", ".wav", ".ogg", ".aac", ".m4a"] },
};

/** ================================================================================
 * Helper Functions for the Media Manager
 ** ================================================================================ */

/** -------------------------------------------------------------------------------
 * Groups ribbon icons by their group property.
 * @param icons The ribbon icons to group.
 * @returns A grouped representation of the ribbon icons.
 ** ------------------------------------------------------------------------------- */
const groupRibbonIcons = (
    icons: RibbonIcon[]
): GroupedRibbonIcons => {
    const groupedMap = new Map<RibbonGroups, RibbonIcon[]>();

    for (const item of icons) {
        const group = item.group;

        if (!groupedMap.has(group)) {
            groupedMap.set(group, []);
        }

        groupedMap.get(group)!.push(item);
    }

    return Object.fromEntries(groupedMap.entries()) as GroupedRibbonIcons;
};
  
/** ================================================================================
 * Media Manager State
 ** ================================================================================ */
  const [selectedTab, setSelectedTab] = useState<MediaTab>(MEDIA_TYPES.IMAGE as MediaTab);
  const [ribbonIcons, setRibbonIcons] = useState<GroupedRibbonIcons>(groupRibbonIcons(RIBBON_ICONS[MEDIA_TYPES.IMAGE as MediaTab]));
  const [storageLocation, setStorageLocation] = useState<string | undefined>(undefined);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null!);
  const dialogControls = useDialog({ ref: dialogRef });
  const [isBulkUpload, setIsBulkUpload] = useState(false);
  const { isItemChecked, handleCheckClick, uncheckItem, numberOfCheckedItems } = useSelectedCheck();

/** ================================================================================
 * Dialog controls for the media manager upload modal.
 ** ================================================================================ */
  const { openDialog, closeDialog } = dialogControls;

/** ================================================================================ 
 * Media Manager Actions 
 ** ================================================================================ */

  /** -------------------------------------------------------------------------------
   * Opens the media manager upload modal.
   * @param bulk Indicates whether the upload is a bulk upload.
   * @returns void
   ** ------------------------------------------------------------------------------- */
  const openUploadModal = (bulk = false) => {
    setIsBulkUpload(bulk);
    openDialog();
  };

  /** -------------------------------------------------------------------------------
   * Checks if a given value is a valid UUID.
   * @param val The value to check
   * @returns True if the value is a valid UUID, false otherwise.
   * @example isValidUUID("123e4567-e89b-12d3-a456-426614174000") // true
   * @example isValidUUID("invalid-uuid") // false  
   ** ------------------------------------------------------------------------------- */
  const isValidUUID = (val?: string) =>
    typeof val === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);

  /** -------------------------------------------------------------------------------
   * Formats a string value by capitalizing its first character.
   * @param value The string value to format.
   * @returns The formatted string with the first character capitalized.
   ** ------------------------------------------------------------------------------- */
  const formatLabel = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

  /** -------------------------------------------------------------------------------
   * Fetches media items from the media service.
   * @param kind The kind of media to fetch. Defaults to the currently selected tab.
   * @returns void
   ** ------------------------------------------------------------------------------- */
  const fetchMedia = useCallback(
    async (kind?: MediaKind) => {
      if (!mediaService) return;
      try {
        setIsLoading(true);
        const targetKind = kind ?? (selectedTab as MediaKind);
        const items = await mediaService.listMedia({
          kind: targetKind,
        });
        setMediaItems(items);
      } catch (error) {
        console.error("Failed to list media:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [mediaService, selectedTab]
  );



  /** -------------------------------------------------------------------------------
   * Effect hook to fetch media items whenever the selected tab changes.
   ** ------------------------------------------------------------------------------- */
  useEffect(() => {
    (async () => {
      await fetchMedia(selectedTab as MediaKind);
    })();
  }, [selectedTab, fetchMedia]);


/** -------------------------------------------------------------------------------
 * Selects a media tab and updates the ribbon icons accordingly.
 * @param tab The tab to select.
 ** ------------------------------------------------------------------------------- */
const selectTab = (tab: string) => {
    if (!isMediaTab(tab)) return;

    setSelectedTab(tab);

    const icons = RIBBON_ICONS[tab as MediaTab];

    const groupedIcons = groupRibbonIcons(icons);

    console.log("Grouped Ribbon Icons:", groupedIcons);

    setRibbonIcons(groupedIcons);
};

  /** -------------------------------------------------------------------------------
   * Handles the upload of a media file.
   * @param file The file to upload.
   * @param altText Optional alternative text for the media.
   * @param options Optional upload options including progress callback and abort signal.
   * @returns The uploaded media item.
   ** ------------------------------------------------------------------------------- */
  const handleUploadMedia = async (
    file: File,
    altText?: string,
    options?: { onProgress?: (pct: number) => void; signal?: AbortSignal }
  ) => {
    try {
      setIsLoading(true);
      if (mediaService) {
        const result = await mediaService.uploadMedia(
          {
            kind: selectedTab as MediaKind,
            file,
            altText,
            storageLocation: isValidUUID(storageLocation) ? storageLocation : undefined,
          },
          options
        );
        if (result) {
          setMediaItems((prev) => [...prev, result]);
          return result;
        }
      }

      // Fallback for offline/mock development if server endpoint is not reached
      const fallbackItem: MediaItem = {
        id: crypto.randomUUID(),
        name: file.name,
        kind: selectedTab as MediaKind,
        url: URL.createObjectURL(file),
        size: file.size,
        mimeType: file.type,
        createdAt: new Date().toISOString(),
      };
      setMediaItems((prev) => [...prev, fallbackItem]);
      return fallbackItem;
    } catch (error) {
      console.error("Failed to upload media:", error);
      const fallbackItem: MediaItem = {
        id: crypto.randomUUID(),
        name: file.name,
        kind: selectedTab as MediaKind,
        url: URL.createObjectURL(file),
        size: file.size,
        mimeType: file.type,
        createdAt: new Date().toISOString(),
      };
      setMediaItems((prev) => [...prev, fallbackItem]);
      return fallbackItem;
    } finally {
      setIsLoading(false);
    }
  };

  /** -------------------------------------------------------------------------------
   * Handles the upload of a single media file.
   * @param file The file to upload.
   * @param onProgress Callback function to track upload progress.
   * @param signal Abort signal to cancel the upload.
   * @returns The uploaded media item.
   ** ------------------------------------------------------------------------------- */
  const uploadSingleFileHandler = async (
    file: File,
    onProgress: (pct: number) => void,
    signal: AbortSignal
  ): Promise<unknown> => {
    return await handleUploadMedia(file, undefined, { onProgress, signal });
  };

  const handleUploadMediaFromUrl = async (url: string, altText?: string) => {
    if (!mediaService) {
      console.error("Media service not initialized");
      return;
    }
    try {
      setIsLoading(true);
      const result = await mediaService.uploadMediaFromUrl({
        kind: selectedTab as MediaKind,
        url,
        altText,
        storageLocation: isValidUUID(storageLocation) ? storageLocation : undefined,
      });
      if (result) {
        setMediaItems([...mediaItems, result]);
      }
    } catch (error) {
      console.error("Failed to upload media from URL:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /** -------------------------------------------------------------------------------
   * Handles the bulk upload of media files.
   * @param files The files to upload.
   * @param altText Optional alternative text for the media.
   * @param options Optional upload options including progress callback and abort signal.
   * @returns The uploaded media items.
   ** ------------------------------------------------------------------------------- */
  const handleBulkUploadMedia = async (
    files: File[],
    altText?: string,
    options?: { onProgress?: (pct: number) => void; signal?: AbortSignal }
  ) => {
    if (!mediaService) {
      console.error("Media service not initialized");
      return;
    }
    try {
      setIsLoading(true);
      const results = await mediaService.bulkUploadMedia(
        {
          kind: selectedTab as MediaKind,
          files,
          altText,
          storageLocation: isValidUUID(storageLocation) ? storageLocation : undefined,
        },
        options
      );
      if (results.length > 0) {
        setMediaItems((prev) => [...prev, ...results]);
      }
      return results;
    } catch (error) {
      console.error("Failed to bulk upload media:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /** -------------------------------------------------------------------------------
   * Handles the deletion of media items.
   * @param ids The IDs of the media items to delete.
   ** ------------------------------------------------------------------------------- */
  const handleDeleteMedia = async (ids: string[]) => {
    if (!mediaService) {
      console.error("Media service not initialized");
      return;
    }
    try {
      setIsLoading(true);
      const result = await mediaService.deleteMedia({ ids });
      if (result.success) {
        setMediaItems(mediaItems.filter((item) => !ids.includes(item.id)));
      }
    } catch (error) {
      console.error("Failed to delete media:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /** -------------------------------------------------------------------------------
   * Handles the update of the storage location for media items.
   * @param location The new storage location.
   ** ------------------------------------------------------------------------------- */
  const handleUpdateStorageLocation = async (location: string) => {
    if (!mediaService) {
      console.error("Media service not initialized");
      return;
    }
    try {
      const result = await mediaService.updateStorageLocation({ location });
      if (result.success) {
        setStorageLocation(location);
      }
    } catch (error) {
      console.error("Failed to update storage location:", error);
    }
  };

/** -------------------------------------------------------------------------------
 * Filters and memoizes media items for each media type in a single pass.
 ** ------------------------------------------------------------------------------- */

const filteredItems = useMemo(
    () => mediaItems.filter((item) => item.kind === selectedTab),
    [mediaItems, selectedTab]
);

  /** -------------------------------------------------------------------------------
   * Defines the actions for the ribbon toolbar.
   ** ------------------------------------------------------------------------------- */
  const performRibbonAction: Record<string, () => void> = {
      'add': () => {
        openUploadModal(false);
      },
      'view': () => {
        console.log(`Viewing ${selectedTab}`);
      },
      'bulk': () => {
        openUploadModal(true);
      },
      'edit': () => {
        console.log(`Editing ${selectedTab}`);
      },
      'delete': () => {
        console.log(`Deleting selected ${selectedTab}`);
      },
      '': () => {
        console.warn("No action specified");
      },
  };

  /** ==================================================================================
   * Returns the media manager hook API.
   * @returns {object} The media manager hook API.
   ** ================================================================================== */
  return {
    MEDIA_TYPES,
    ACCEPT_BY_TYPE,

    isItemChecked,
    handleCheckClick,
    uncheckItem,
    numberOfCheckedItems,

    isBulkUpload, 
    closeDialog,
    openUploadModal,
    dialogRef, 
    dialogControls,
    selectedTab,
    selectTab,
    ribbonIcons,
    performRibbonAction,
    formatLabel,
    // Media operations
    uploadMedia: handleUploadMedia,
    uploadSingleFileHandler,
    uploadMediaFromUrl: handleUploadMediaFromUrl,
    bulkUploadMedia: handleBulkUploadMedia,
    deleteMedia: handleDeleteMedia,
    updateStorageLocation: handleUpdateStorageLocation,
    // Data
    mediaItems,
    filteredItems,
    mediaTotal: mediaItems.length,
    storageLocation,
    isLoading,
  };
};

export default useMediaManager;
