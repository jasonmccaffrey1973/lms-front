import { useState } from "react";
import type { ViewMediaProps } from "./viewMedia.types";
import type { MediaItem } from "../../../queries/useMediaQueries";
import { StyledMediaViewer } from "./viewMedia.styles";
import Dialog from "../../../sharedComponents/dialog/Dialog";
import Button from "../../../sharedComponents/Button/Button";
import useViewMedia from "./useViewMedia";
import Render from "../../../sharedComponents/Render";
import SVGIcon from "../../../sharedComponents/SVG/SVGIcon";

/** -------------------------------------------------------------------------------
 * Renders a single image component.
 * @param param0 The props for the single image component.
 * @returns The rendered single image component.
 * @example
 * <SingleImage item={mediaItem} />
 ** ------------------------------------------------------------------------------- */
const SingleImage = ({ item }: { item: MediaItem }) => (
    <img src={item.url} alt={item.altText ?? item.name} />
);

/** -------------------------------------------------------------------------------
 * Renders a single video component.
 * @param param0 The props for the single video component.
 * @returns The rendered single video component.
 ** ------------------------------------------------------------------------------- */
const SingleVideo = ({ item }: { item: MediaItem }) => (
    <video controls>
        <source src={item.url} type={item.mimeType} />
        Your browser does not support the video tag.
    </video>
);

/** -------------------------------------------------------------------------------
 * Renders a single audio component.
 * @param param0 The props for the single audio component.
 * @returns The rendered single audio component.
 ** ------------------------------------------------------------------------------- */
const SingleAudio = ({ item }: { item: MediaItem }) => (
    <audio controls>
        <source src={item.url} type={item.mimeType} />
        Your browser does not support the audio tag.
    </audio>
);

/** -------------------------------------------------------------------------------
 * Renders a single media item preview component.
 * @param item The media item to be previewed.
 * @param type The type of media ("image", "video", or "audio").
 * @returns The rendered media preview component.
 ** ------------------------------------------------------------------------------- */
const MediaPreview = ({ item, type }: { item: MediaItem; type: "image" | "video" | "audio" }) => {
    switch (type) {
        case "image":
            return <SingleImage item={item} />;
        case "video":
            return <SingleVideo item={item} />;
        case "audio":
            return <SingleAudio item={item} />;
    }
};

/** -------------------------------------------------------------------------------
 * Renders an image gallery component.
 * @param items The media items to be displayed in the gallery.
 * @param type The type of media ("image", "video", or "audio").
 * @example
 * <MediaGallery items={mediaItems} type="image" />
 * <MediaGallery items={mediaItems} type="video" />
 * <MediaGallery items={mediaItems} type="audio" />
 * @returns The rendered media gallery component.
 ** ------------------------------------------------------------------------------- */
const MediaGallery = ({ items, type }: { items: MediaItem[]; type: "image" | "video" | "audio" }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const goToPrevious = () => setActiveIndex((current) => Math.max(current - 1, 0));
    const goToNext = () => setActiveIndex((current) => Math.min(current + 1, items.length - 1));

    return (
        <section className={`media-gallery ${type}-gallery`} aria-label={`${type} gallery`} aria-roledescription="carousel">
            <div className="gallery-media-wrapper">
                <div
                    className="gallery-track"
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className="gallery-slide"
                            role="group"
                            aria-roledescription="slide"
                            aria-label={`${index + 1} of ${items.length}: ${item.name}`}
                            aria-hidden={index !== activeIndex}
                        >
                            <MediaPreview item={item} type={type} />
                        </div>
                    ))}
                </div>
            </div>
            <Button
                className="previous"
                type="button"
                onClick={goToPrevious}
                disabled={activeIndex === 0}
                aria-label="Previous media item"
            >
                <SVGIcon icon="arrowCircleLeft" />
            </Button>
            <Button
                className="next"
                type="button"
                onClick={goToNext}
                disabled={activeIndex === items.length - 1}
                aria-label="Next media item"
            >
                <SVGIcon icon="arrowCircleRight" />
            </Button>
            <div className="position-indicator" aria-label={`Media item ${activeIndex + 1} of ${items.length}`}>
                {items.map((item, index) => (
                    <button
                        key={item.id}
                        type="button"
                        className={`position-indicator__dot ${index === activeIndex ? "active" : ""}`}
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Show ${item.name}`}
                        aria-current={index === activeIndex ? "true" : undefined}
                    />
                ))}
            </div>
            
        </section>
    );
};


/** -------------------------------------------------------------------------------
 * Renders the view media component.
 * @param param0 The props for the view media component.
 * @returns The rendered view media component.
 ** ------------------------------------------------------------------------------- */
const ViewMedia = ({media, type, dialogRef, controls}: ViewMediaProps) => {

    const { dialogTitle, footerButtons, numberOfMediaItems } = useViewMedia({ media, type, dialogRef, controls });

    return (
        <Dialog title={dialogTitle} footerButtons={footerButtons} controls={controls} dialogRef={dialogRef}>
            <StyledMediaViewer>
                <Render if={numberOfMediaItems > 1}>
                    <MediaGallery key={media.map((item) => item.id).join(",")} items={media} type={type} />
                </Render>
                <Render if={numberOfMediaItems === 1}>
                   <MediaPreview key={`${type}-${media[0].id}`} item={media[0]} type={type} />
                </Render>
            </StyledMediaViewer>
        </Dialog>
    );
};

export default ViewMedia;
