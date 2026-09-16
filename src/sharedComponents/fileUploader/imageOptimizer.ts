import type { ImageOptimizationOptions } from "./fileUploader.types";

/** Supported raster image MIME types suitable for canvas resizing */
const RASTER_IMAGE_TYPES = new Set([
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
]);

export interface OptimizedImageResult {
    file: File;
    previewUrl: string;
    didOptimize: boolean;
}

/**
 * Calculates aspect-ratio preserving dimensions that fit within maxWidth and maxHeight bounds.
 */
export const calculateTargetDimensions = (
    width: number,
    height: number,
    maxWidth: number,
    maxHeight: number
): { width: number; height: number } => {
    if (width <= maxWidth && height <= maxHeight) {
        return { width, height };
    }

    const ratio = Math.min(maxWidth / width, maxHeight / height);
    return {
        width: Math.max(1, Math.round(width * ratio)),
        height: Math.max(1, Math.round(height * ratio)),
    };
};

/**
 * Optimizes a raster image file using an HTML Canvas with high smoothing quality.
 * Downscales images that exceed the specified max dimensions, compresses to the desired
 * quality ratio (default: 0.85, visually lossless), and generates an object URL preview.
 *
 * If the image is already within bounds or is not a raster image, the original file is preserved.
 *
 * @param file - The raw image File dropped or selected by the user.
 * @param options - Configuration for max dimensions, quality, format, and thumbnailOnly flag.
 */
export const optimizeImage = async (
    file: File,
    options?: ImageOptimizationOptions
): Promise<OptimizedImageResult> => {
    const isRasterImage = RASTER_IMAGE_TYPES.has(file.type.toLowerCase());
    if (!isRasterImage || !options?.enabled) {
        return {
            file,
            previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : "",
            didOptimize: false,
        };
    }

    const {
        maxWidth = 2048,
        maxHeight = 2048,
        quality = 0.85,
        format,
        thumbnailOnly = false,
    } = options;

    return new Promise((resolve) => {
        const objectUrl = URL.createObjectURL(file);
        const img = new Image();

        img.onload = () => {
            URL.revokeObjectURL(objectUrl);

            const naturalWidth = img.naturalWidth || img.width;
            const naturalHeight = img.naturalHeight || img.height;

            // If the image is already within bounds and we are not forcing format change
            if (naturalWidth <= maxWidth && naturalHeight <= maxHeight && !format) {
                resolve({
                    file,
                    previewUrl: URL.createObjectURL(file),
                    didOptimize: false,
                });
                return;
            }

            const { width: targetWidth, height: targetHeight } = calculateTargetDimensions(
                naturalWidth,
                naturalHeight,
                maxWidth,
                maxHeight
            );

            const canvas = document.createElement("canvas");
            canvas.width = targetWidth;
            canvas.height = targetHeight;

            const ctx = canvas.getContext("2d");
            if (!ctx) {
                resolve({
                    file,
                    previewUrl: URL.createObjectURL(file),
                    didOptimize: false,
                });
                return;
            }

            // High smoothing quality for crisp rendering without artifacts
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

            const outputMime =
                format ??
                (file.type.toLowerCase() === "image/png" ? "image/png" : "image/jpeg");

            canvas.toBlob(
                (blob) => {
                    if (!blob) {
                        resolve({
                            file,
                            previewUrl: URL.createObjectURL(file),
                            didOptimize: false,
                        });
                        return;
                    }

                    const optimizedFile = new File([blob], file.name, {
                        type: outputMime,
                        lastModified: Date.now(),
                    });

                    const finalFile = thumbnailOnly ? file : optimizedFile;
                    const previewUrl = URL.createObjectURL(blob);

                    resolve({
                        file: finalFile,
                        previewUrl,
                        didOptimize: true,
                    });
                },
                outputMime,
                quality
            );
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            // Fallback gracefully to original file
            resolve({
                file,
                previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : "",
                didOptimize: false,
            });
        };

        img.src = objectUrl;
    });
};

