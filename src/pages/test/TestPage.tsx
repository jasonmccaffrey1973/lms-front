import Button from "../../sharedComponents/Button/Button";
import Render from "../../sharedComponents/Render";
import SVGIcon from "../../sharedComponents/SVG/SVGIcon";
import { StyledMediaItem, StyledMetaWrapper } from "./TestPage.styles";
import useTestPage from "./useTestPage";

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
}

const TestPage = () => {


  const { MetaVisible, toggleMeta, meta, media } = useTestPage();

  return (
    <>
    <StyledMediaItem>
        <header className="media-header">
          <Button onClick={() => toggleMeta()}><SVGIcon icon={MetaVisible ? "chevronDown" : "chevronRight"} /></Button>
        </header>
        <section className="media-body">
          <img className="thumbnail" src={media?.src as string} alt="Test Image" />
        </section>
        <footer className="media-footer">
          <h2>{media?.filename as string}</h2>
        </footer>

        <Render if={Boolean(meta && Object.keys(meta).length > 0)}>
          <StyledMetaWrapper aria-hidden={!MetaVisible}>
            <MediaMeta meta={meta!} />
          </StyledMetaWrapper>
        </Render> 
    </StyledMediaItem>
    </>
  );
};

export default TestPage;