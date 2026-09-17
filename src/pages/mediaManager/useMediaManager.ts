import { useState, useMemo, useEffect, useCallback } from "react";
import { useApolloClient } from "@apollo/client/react";
import { MEDIA_TYPES, RIBBON_ICONS } from "./mediaManager.constants";
import type { RibbonIcon } from "./MediaManager.types";
import type { MediaItem, MediaKind } from "../../queries/useMediaQueries";
import type { ContextElement } from "./MediaManager.types";
import { createMediaService } from "./mediaService";
// import type { MediaItem, MediaKind } from "../../queries/useMediaQueries";
                    
type MediaTab = keyof typeof RIBBON_ICONS;

const isMediaTab = (value: string): value is MediaTab => value in RIBBON_ICONS;

const useMediaManager = () => {
  const client = useApolloClient();
  const mediaService = useMemo(() => createMediaService(client), [client]);
  
  const [selectedTab, setSelectedTab] = useState<MediaTab>(MEDIA_TYPES.IMAGE as MediaTab);
  const [ribbonIcons, setRibbonIcons] = useState<RibbonIcon[]>(
    RIBBON_ICONS[MEDIA_TYPES.IMAGE as MediaTab],
  );
  const [storageLocation, setStorageLocation] = useState<string | undefined>(undefined);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isValidUUID = (val?: string) =>
    typeof val === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);

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

  useEffect(() => {
    (async () => {
      await fetchMedia(selectedTab as MediaKind);
    })();
  }, [selectedTab, fetchMedia]);

  const selectTab = (tab: string) => {
    if (!isMediaTab(tab)) return;
    setSelectedTab(tab);
    setRibbonIcons(RIBBON_ICONS[tab]);
  };

  const [showContext, setShowContext] = useState(false);

  const toggleContext = () => setShowContext(!showContext);
  const closeContext = () => setShowContext(false);
  const openContext = ({ elements, label }: { elements: ContextElement[], label?: string }) => {
    setShowContext(true);
    console.log("Context elements:", elements);
    if (label) {
      console.log("Context label:", label);
    }
  };

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

  const performRibbonAction: Record<string, () => void> = {
      'add': () => {
        openContext({
          elements: [
            {label: `Add ${selectedTab} URL`, type: 'url', action: () => void handleUploadMediaFromUrl("")},
            {label: `Upload ${selectedTab}`, type: 'file', action: () => void handleUploadMedia(new File([], ""))},
          ],
          label: `Add ${selectedTab}`
        });
        console.log(`Opening add dialog for ${selectedTab}`);
        // This will trigger opening the MediaDialog
      },
      'view': () => {
        closeContext();
        console.log(`Viewing ${selectedTab}`);
      },
      'bulk': () => {
        // openContext();
        console.log(`Bulk uploading ${selectedTab}`);
        // This will trigger bulk upload modal
      },
      'edit': () => {
        closeContext();
        console.log(`Editing ${selectedTab}`);
      },
      'delete': () => {
        closeContext();
        console.log(`Deleting selected ${selectedTab}`);
      },
      '': () => {
        console.warn("No action specified");
      },
  };

  return {
    MEDIA_TYPES,
    selectedTab,
    selectTab,
    ribbonIcons,
    performRibbonAction,
    // Media operations
    uploadMedia: handleUploadMedia,
    uploadSingleFileHandler,
    uploadMediaFromUrl: handleUploadMediaFromUrl,
    bulkUploadMedia: handleBulkUploadMedia,
    deleteMedia: handleDeleteMedia,
    updateStorageLocation: handleUpdateStorageLocation,
    // Data
    mediaItems,
    mediaTotal: mediaItems.length,
    storageLocation,
    isLoading,
    showContext,
    toggleContext,
    openContext,
    closeContext,
  };
};

export default useMediaManager;
