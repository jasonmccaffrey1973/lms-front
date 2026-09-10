import type { RibbonIcon } from "./MediaManager.types";

const MEDIA_TYPES = {
    IMAGE: "image",
    VIDEO: "video",
    AUDIO: "audio",
} as const;

const RIBBON_ICONS = {
    image: [
        {icon: "imageUpload", label: "Add Image", action: "addImage" },
        {icon: "imageView", label: "View Image", action: "viewImage" },
        {icon: "imageBulk", label: "Bulk Upload", action: "bulkUploadImages" },
        {icon: "imageEdit", label: "Edit Image", action: "editImage" },
        {icon: "imageDelete", label: "Delete Image", action: "deleteImage" }
    ],
    video: [
        {icon: "videoUpload", label: "Add Video", action: "addVideo" },
        {icon: "videoView", label: "View Video", action: "viewVideo" },
        {icon: "videoBulk", label: "Bulk Upload", action: "bulkUploadVideos" },
        {icon: "videoEdit", label: "Edit Video", action: "editVideo" },
        {icon: "videoDelete", label: "Delete Video", action: "deleteVideo" }
    ],
    audio: [
        {icon: "audioUpload", label: "Add Audio", action: "addAudio" },
        {icon: "audioView", label: "View Audio", action: "viewAudio" },
        {icon: "audioBulk", label: "Bulk Upload", action: "bulkUploadAudios" },
        {icon: "audioEdit", label: "Edit Audio", action: "editAudio" },
        {icon: "audioDelete", label: "Delete Audio", action: "deleteAudio" }
    ],
} satisfies Record<string, RibbonIcon[]>;

export { MEDIA_TYPES, RIBBON_ICONS };