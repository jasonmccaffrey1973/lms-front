import { useState } from "react";
import { MEDIA_TYPES, RIBBON_ICONS } from "./mediaManager.constants";
import type { RibbonIcon } from "./MediaManager.types";
                    
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

  const performRibbonAction: Record<string, () => void> = {
      'add': () => {
        switch (selectedTab) {
          case MEDIA_TYPES.IMAGE:
            console.log("Adding image");
            break;
          case MEDIA_TYPES.VIDEO:
            console.log("Adding video");
            break;
          case MEDIA_TYPES.AUDIO:
            console.log("Adding audio");
            break;
          default:
            console.warn("Unknown media type");
        }
        console.log("Adding image");
      },
      'view': () => {
        switch (selectedTab) {
          case MEDIA_TYPES.IMAGE:
            console.log("Viewing image");
            break;
          case MEDIA_TYPES.VIDEO:
            console.log("Viewing video");
            break;
          case MEDIA_TYPES.AUDIO:
            console.log("Viewing audio");
            break;
          default:
            console.warn("Unknown media type");
        }
      },
      'bulk': () => {
        switch (selectedTab) {
          case MEDIA_TYPES.IMAGE:
            console.log("Bulk uploading images");
            break;
          case MEDIA_TYPES.VIDEO:
            console.log("Bulk uploading videos");
            break;
          case MEDIA_TYPES.AUDIO:
            console.log("Bulk uploading audios");
            break;
          default:
            console.warn("Unknown media type");
        }
      },
      'edit': () => {
        switch (selectedTab) {
          case MEDIA_TYPES.IMAGE:
            console.log("Editing image");
            break;
          case MEDIA_TYPES.VIDEO:
            console.log("Editing video");
            break;
          case MEDIA_TYPES.AUDIO:
            console.log("Editing audio");
            break;
          default:
            console.warn("Unknown media type");
        }
      },
      'delete': () => {
        switch (selectedTab) {
          case MEDIA_TYPES.IMAGE:
            console.log("Deleting image");
            break;
          case MEDIA_TYPES.VIDEO:
            console.log("Deleting video");
            break;
          case MEDIA_TYPES.AUDIO:
            console.log("Deleting audio");
            break;
          default:
            console.warn("Unknown media type");
        }
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
  };
};

export default useMediaManager;
