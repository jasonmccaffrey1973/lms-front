import { useState } from "react";
import { MEDIA_TYPES, RIBBON_ICONS } from "./mediaManager.constants";
import type { RibbonIcon } from "./MediaManager.types";
import type { MediaItem, MediaKind } from "../../queries/useMediaQueries";
import type { ContextElement } from "./MediaManager.types";
import type { MediaService } from "./mediaService";
// import type { MediaItem, MediaKind } from "../../queries/useMediaQueries";
                    
type MediaTab = keyof typeof RIBBON_ICONS;

const isMediaTab = (value: string): value is MediaTab => value in RIBBON_ICONS;

const useMediaManager = () => {
  const [mediaService] = useState<MediaService | null>(null);
  
  const [selectedTab, setSelectedTab] = useState<MediaTab>(MEDIA_TYPES.IMAGE as MediaTab);
  const [ribbonIcons, setRibbonIcons] = useState<RibbonIcon[]>(
    RIBBON_ICONS[MEDIA_TYPES.IMAGE as MediaTab],
  );
  const [storageLocation, setStorageLocation] = useState<string>("local");
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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



  const handleUploadMedia = async (file: File, altText?: string) => {
    if (!mediaService) {
      console.error("Media service not initialized");
      return;
    }
    try {
      setIsLoading(true);
      const result = await mediaService.uploadMedia({
        kind: selectedTab as MediaKind,
        file,
        altText,
        storageLocation,
      });
      if (result) {
        setMediaItems([...mediaItems, result]);
      }
    } catch (error) {
      console.error("Failed to upload media:", error);
    } finally {
      setIsLoading(false);
    }
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
        storageLocation,
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

  const handleBulkUploadMedia = async (files: File[], altText?: string) => {
    if (!mediaService) {
      console.error("Media service not initialized");
      return;
    }
    try {
      setIsLoading(true);
      const results = await mediaService.bulkUploadMedia({
        kind: selectedTab as MediaKind,
        files,
        altText,
        storageLocation,
      });
      if (results.length > 0) {
        setMediaItems([...mediaItems, ...results]);
      }
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
