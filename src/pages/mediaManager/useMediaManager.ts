import { useState } from "react";
import { MEDIA_TYPES, RIBBON_ICONS } from "./mediaManager.constants";
import type { RibbonIcon } from "./MediaManager.types";



// import { MEDIA_STORAGE_KEY } from "../../applications/media/adapters/localMediaAdapter";
// import { createMediaService } from "../../applications/media/mediaService";
// import type { MediaItem, MediaKind } from "../../applications/media/types";

// const readStoredItems = (): MediaItem[] => {
    //   if (typeof window === "undefined") {
        //     return [];
        //   }
        
        //   const rawValue = window.localStorage.getItem(MEDIA_STORAGE_KEY);
        //   if (!rawValue) {
            //     return [];
            //   }
            
            //   try {
                //     const parsed = JSON.parse(rawValue) as unknown;
                //     return Array.isArray(parsed) ? (parsed as MediaItem[]) : [];
                //   } catch {
                    //     return [];
                    //   }
                    // };
                    
type MediaTab = keyof typeof RIBBON_ICONS;

const isMediaTab = (value: string): value is MediaTab => value in RIBBON_ICONS;

const useMediaManager = () => {
  const [selectedTab, setSelectedTab] = useState<MediaTab>(MEDIA_TYPES.IMAGE as MediaTab);
  const [ribbonIcons, setRibbonIcons] = useState<RibbonIcon[]>(
    RIBBON_ICONS[MEDIA_TYPES.IMAGE as MediaTab],
  );

  const selectTab = (tab: string) => {
    if (!isMediaTab(tab)) return;
    setSelectedTab(tab);
    setRibbonIcons(RIBBON_ICONS[tab]);
  };

  const performRibbonAction = (actionLabel: string) => {
    switch (actionLabel) {
      case "Add":
        // perform add action
        break;
      case "Delete":
        // perform delete action
        break;
      default:
        break;
    }
  };

  //   const toggleSelected = (id: string) => {
  //     setSelectedIds((prev) =>
  //       prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id],
  //     );
  //   };

  //   const openDialog = (mode: MediaKind) => {
  //     setDialogMode(mode);
  //     setDialogOpen(true);
  //     setError("");
  //   };

  //   const closeDialog = () => {
  //     setDialogOpen(false);
  //   };

  //   const deleteSelected = async () => {
  //     if (!selectedIds.length) {
  //       return;
  //     }

  //     await mediaService.deleteMedia(selectedIds);
  //     setSelectedIds([]);
  //     await loadItems();
  //   };

  //   const uploadMedia = async ({
  //     mode,
  //     files,
  //     altText,
  //   }: {
  //     mode: MediaKind;
  //     files: File[];
  //     altText: string;
  //   }) => {
  //     for (const file of files) {
  //       await mediaService.addUploadMedia(mode, file, { altText });
  //     }

  //     await loadItems();
  //   };

  //   const addUrlMedia = async ({
  //     mode,
  //     url,
  //     altText,
  //   }: {
  //     mode: MediaKind;
  //     url: string;
  //     altText: string;
  //   }) => {
  //     await mediaService.addUrlMedia(mode, url, { altText });
  //     await loadItems();
  //   };

  return {
    // items,
    // selectedIds,
    // toggleSelected,
    // dialogOpen,
    // dialogMode,
    // openDialog,
    // closeDialog,
    // deleteSelected,
    // uploadMedia,
    // addUrlMedia,
    MEDIA_TYPES,
    selectedTab,
    selectTab,
    ribbonIcons,
    performRibbonAction,
  };
};

export default useMediaManager;
