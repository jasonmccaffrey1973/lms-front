import { useEffect, useState } from "react";

type BackdropImages = {
    horizontal: string;
    vertical: string;
};

/** ================================================================================
 * Loads backdrop images for a given HTTP status code, with support for both horizontal
 * and vertical orientations. If the specific image for the status code is not found,
 * it falls back to a default 404 image.
 * @param statusCode - The HTTP status code for which to load the backdrop images.
 * @returns A promise that resolves to an object containing the horizontal and vertical image URLs.
 ** ================================================================================ */
const backdropImageModules = import.meta.glob("../../assets/images/*-*.jpg", { import: "default" });

/** --------------------------------------------------------------------------------
 * Loads a backdrop image for a given status code and orientation (horizontal or vertical).
 * @param statusCode 
 * @param orientation 
 * @returns A promise that resolves to the image URL as a string.   
 ** -------------------------------------------------------------------------------- */
const loadBackdropImage = async (statusCode: number, orientation: "h" | "v") => {
    const imagePath = `../../assets/images/${statusCode}-${orientation}.jpg`;
    const fallbackPath = `../../assets/images/404-${orientation}.jpg`;
    const loadImage = backdropImageModules[imagePath] ?? backdropImageModules[fallbackPath];

    if (!loadImage) {
        return "";
    }

    return (await loadImage()) as string;
};

/** --------------------------------------------------------------------------------
 * Loads both horizontal and vertical backdrop images for a given status code. *
 * @param statusCode - The HTTP status code for which to load the backdrop images.
 * @returns A promise that resolves to an object containing the horizontal and vertical image URLs.
 ** -------------------------------------------------------------------------------- */

const loadBackdropImages = async (statusCode: number): Promise<BackdropImages> => {
    const [horizontal, vertical] = await Promise.all([
        loadBackdropImage(statusCode, "h"),
        loadBackdropImage(statusCode, "v"),
    ]);

    return { horizontal, vertical };
};

/** --------------------------------------------------------------------------------
 * Custom React hook to load backdrop images for a given HTTP status code.
 * It manages the state of the loaded images and ensures that the component is still mounted.
 * @param statusCode - The HTTP status code for which to load the backdrop images.
 * @returns An object containing the horizontal and vertical image URLs.
** -------------------------------------------------------------------------------- */
const useErrorBackdropImages = (statusCode: number) => {
    const [backdropImages, setBackdropImages] = useState<BackdropImages>({ horizontal: "", vertical: "" });

    useEffect(() => {
        let mounted = true;

        const loadImages = async () => {
            const images = await loadBackdropImages(statusCode);

            if (mounted) {
                setBackdropImages(images);
            }
        };

        void loadImages();

        return () => {
            mounted = false;
        };
    }, [statusCode]);

    return backdropImages;
};

export default useErrorBackdropImages;
