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
overflow: hidden;

&:hover {
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
}

&[aria-selected="true"] {
    outline: 2px solid var(--clr-info);
}

.media-header {
    grid-area: media-header;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-block: -0.5rem 0;
    padding-block: 0.33rem;
    
    button:not(.selected-check-button) {
        top: 0;
        right: 0;
        z-index: 10;
        aspect-ratio: 1 / 1;
        padding: 0.33rem;
        border-radius: 50%;
        border: 1px solid var(--editor-border);
        background-color: var(--editor-surface);
        color: var(--app-text);
        
        svg {
            width: 1rem;
            height: 1rem;
            fill: currentColor;
        }

        &:hover {
            svg {
                fill: var(--clr-text-light);
            }
        }
    }

    .selected-check-button {
        z-index: 10;
        color: var(--app-text);
        margin-block-start: -0.5rem;
        margin-inline-start: -0.5rem;
        color: var(--clr-info);
    }
    .selected-check-button svg {
        width: 1rem;
        height: 1rem;
        fill: currentColor;
    }
}

.media-body {
    grid-area: media-body;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    
    .thumbnail {
        object-fit: cover;
        width: 100%;
        aspect-ratio: 8 / 7;
    }

    audio {
        --_min-block-size: 2rem; //Sort of sets the size of the audio player
        inline-size: 90%;
        block-size: auto;
        margin-block: calc(var(--_min-block-size) / 2);
    }

    video {
        
        inline-size: 90%;
        block-size: auto;
        margin-block: calc(var(--_min-block-size) / 2);
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
position: absolute;
top: 0;
bottom: 0;
height: 100%;
width: 100%;
overflow-y: auto;
background-color: var(--editor-surface);
transition: all 250ms ease-in-out;
pointer-events: auto;
transform-origin: right;

&[aria-hidden="true"] {
    right: -200%;
    opacity: 0;
    pointer-events: none;
}

&[aria-hidden="false"] {
    right: 0;
    opacity: 0.965;
    pointer-events: auto;
}

  .media-meta-wrapper {

    ul {
      list-style: none;
      padding: 0.33rem;
      margin: 0;
      margin-block-start: 1.33rem;
      color: var(--app-text);
      padding: 0.5rem;
      border-radius: 8px;
      width: 100%;
      font-size: 0.7rem;
      min-block-size: 100%;
    }
    li {
      margin-block: 0.33rem;
      display: flex;
      gap: 0.5rem;
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
