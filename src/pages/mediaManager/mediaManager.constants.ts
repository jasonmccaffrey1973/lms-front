import type { RibbonIcon } from "./MediaManager.types";

const MEDIA_TYPES = {
    IMAGE: "image",
    VIDEO: "video",
    AUDIO: "audio",
} as const;

const RIBBON_ICONS = {
    image: [
        {icon: "imageUpload", action:"Add", group: "Upload" },
        {icon: "imageBulk", action:"Bulk", group: "Upload" },
        {icon: "imageView", action:"View", group: "Selected" },
        {icon: "imageEdit", action:"Edit", group: "Selected" },
        {icon: "imageDelete", action:"Delete", group: "Selected" }
    ],
    video: [
        {icon: "videoUpload", action:"Add", group: "Upload" },
        {icon: "videoBulk", action:"Bulk", group: "Upload" },
        {icon: "videoView", action:"View", group: "Selected" },
        {icon: "videoEdit", action:"Edit", group: "Selected" },
        {icon: "videoDelete", action:"Delete", group: "Selected" }
    ],
    audio: [
        {icon: "audioUpload", action:"Add", group: "Upload" },
        {icon: "audioBulk", action:"Bulk", group: "Upload" },
        {icon: "audioView", action:"View", group: "Selected" },
        {icon: "audioEdit", action:"Edit", group: "Selected" },
        {icon: "audioDelete", action:"Delete", group: "Selected" }
    ],
} satisfies Record<string, RibbonIcon[]>;



export { MEDIA_TYPES, RIBBON_ICONS };