import type { RibbonIcon } from "./MediaManager.types";

const MEDIA_TYPES = {
    IMAGE: "image",
    VIDEO: "video",
    AUDIO: "audio",
} as const;

const RIBBON_ICONS = {
    image: [
        {icon: "imageUpload", action:"Add" },
        {icon: "imageView", action:"View" },
        {icon: "imageBulk", action:"Bulk" },
        {icon: "imageEdit", action:"Edit" },
        {icon: "imageDelete", action:"Delete" }
    ],
    video: [
        {icon: "videoUpload", action:"Add" },
        {icon: "videoView", action:"View" },
        {icon: "videoBulk", action:"Bulk" },
        {icon: "videoEdit", action:"Edit" },
        {icon: "videoDelete", action:"Delete" }
    ],
    audio: [
        {icon: "audioUpload", action:"Add" },
        {icon: "audioView", action:"View" },
        {icon: "audioBulk", action:"Bulk" },
        {icon: "audioEdit", action:"Edit" },
        {icon: "audioDelete", action:"Delete" }
    ],
} satisfies Record<string, RibbonIcon[]>;

export { MEDIA_TYPES, RIBBON_ICONS };