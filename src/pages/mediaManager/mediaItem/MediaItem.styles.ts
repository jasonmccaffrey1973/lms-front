import styled from "styled-components";

const StyledMediaItem = styled.div`
--_item_width: min(100% - 2rem, 12rem);
display: grid;
grid-template-columns: 1fr auto;
grid-template-rows: auto 1fr auto;
grid-template-areas:    "media-header  media-meta"
                        "media-body    media-meta"
                        "media-footer  media-meta";          
background-color: var(--editor-surface-subtle);
width: var(--_item_width);
border:  1px solid var(--editor-border);
border-radius: 0.33rem;
padding: 0.5rem;
box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
transition: transform 250ms ease-in-out;
position: relative;
overflow-x: hidden;
overflow-y: auto;

&:hover {
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
}

.media-header {
    grid-area: media-header;
    display: flex;
    justify-content: flex-end;
    
    button {
        position: sticky;
        top: 0;
        right: 0;
        z-index: 10;

        aspect-ratio: 1 / 1;
        padding: 0.33rem;
        border-radius: 50%;
        border: 1px solid var(--editor-border);
        background-color: var(--editor-surface);
        color: var(--editor-text);
        margin-block-end: 0.33rem;
        
        svg {
            width: 1rem;
            height: 1rem;
        }
    }
}

.media-body {
    grid-area: media-body;
    display: block;
    width: 100%;
    
    .thumbnail {
        object-fit: cover;
        width: 100%;
        aspect-ratio: 16 / 9;
    }
}

.media-footer {
    grid-area: media-footer;
    
    h2 {
        text-align: center;
        font-weight: bold;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        text-transform: uppercase;
        font-size: 0.67rem;
        letter-spacing: 0.05rem;
    }
}

.media-meta-wrapper {
    grid-area: media-meta;
}
`;

const StyledMetaWrapper = styled.div`

height: 100%;
width: 100%;



transition: transform 0.2s, opacity 0.2s;

&[aria-hidden="true"] {
    opacity: 0;
    pointer-events: none;
    transform: scaleX(0);
    transform-origin: right;
}

  .media-meta-wrapper {

    ul {
      list-style: none;
      padding: 0.33rem;
      margin: 0;
      position: absolute;
      top: 0;
      left: 0;
      background-color: var(--editor-surface);
      color: var(--app-text);
      padding: 0.5rem;
      border-radius: 8px;
      width: 100%;
      font-size: 0.7rem;
    }

    li {
      margin-bottom: 8px;
      display: flex;
      margin-block-end: 0.5rem;
      gap: 0.5rem;
      &.last {
        margin-block-end: 0;
      }
    }

    .meta-label {
      font-weight: bold;
      letter-spacing: 0.05rem;
      text-transform: uppercase;
    }

    .meta-value {
      margin: 0;
    }
  }
`;

export { StyledMediaItem, StyledMetaWrapper };