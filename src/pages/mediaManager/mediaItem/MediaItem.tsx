import Button from "../../../sharedComponents/Button/Button";
import Render from "../../../sharedComponents/Render";
import SVGIcon from "../../../sharedComponents/SVG/SVGIcon";
import { StyledMediaItem, StyledMetaWrapper } from "./MediaItem.styles";
import useMediaItem from "./useMediaItem";
import type { MediaItemProps } from "./MediaItem.types";
import SelectedCheck from "../../../sharedComponents/selectedCheck/SelectedCheck";

interface MediaMetaProps {
  meta: Record<string, unknown>;
}

const MediaMeta = ({ meta }: MediaMetaProps) => {
  return (
    <aside className="media-meta-wrapper">
      <ul>
        {Object.entries(meta).map(([key, value]) => (
          <li key={key}>
            <span className="meta-label">{key}: </span>
            <span className="meta-value">{JSON.stringify(value)}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

const MediaThumbnail = ({ kind, src, name }: { kind: string; src: string; name: string }) => {
  switch (kind) {
    case "image":
      return <img className="thumbnail" src={src} alt={name} />;
    case "video":
      return <video className="thumbnail" src={src} muted />;
    case "audio":
      return (
        <div className="thumbnail audio-placeholder">
          <SVGIcon icon="audioBulk" />
        </div>
      );
    default:
      return null;
  }
};

const MediaItem = ({ item, isItemChecked, toggleItemCheck, uncheckItem }: MediaItemProps) => {
  const { MetaVisible, toggleMeta, meta, media } = useMediaItem(item);

  return (
    <StyledMediaItem
      aria-selected={isItemChecked()}
      onClick={toggleItemCheck}
    >
      <header className="media-header">
        <SelectedCheck
          isItemChecked={isItemChecked}
          uncheckItem={uncheckItem}
        />
        <Button onClick={(e) => { e.stopPropagation(); toggleMeta(); }}>
          <SVGIcon icon={MetaVisible ? "chevronDown" : "chevronRight"} />
        </Button>
      </header>
      <section className="media-body">
        <MediaThumbnail kind={media.kind} src={media.src} name={media.filename} />
      </section>
      <footer className="media-footer">
        <h2>{media.filename}</h2>
      </footer>

      <Render if={Boolean(meta && Object.keys(meta).length > 0)}>
        <StyledMetaWrapper aria-hidden={!MetaVisible}>
          <MediaMeta meta={meta} />
        </StyledMetaWrapper>
      </Render>
    </StyledMediaItem>
  );
};

export default MediaItem;