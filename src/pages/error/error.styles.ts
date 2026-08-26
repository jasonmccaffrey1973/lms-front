import styled from 'styled-components';

type StyledBackdropImageProps = {
    $horizontalImage: string;
    $verticalImage: string;
};



/** ================================================================================
 * Styled components for the Error page, including the backdrop image,
 * content ribbon, status code, message, search wrapper, and links wrapper.
 * ================================================================================ */

/** -------------------------------------------------------------------------------
 * Backdrop image styled component with responsive background images for horizontal
 * and vertical orientations.
 * ------------------------------------------------------------------------------- */
const StyledBackdropImage = styled.div<StyledBackdropImageProps>`

    display: flex;
    flex-direction: column;
    block-size: 100%;
    inline-size: 100%;
    overflow: clip;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: url(${({ $horizontalImage }) => $horizontalImage});
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        filter: sepia(80%) contrast(1.2) brightness(0.9);
        z-index: 5;
    }

     &::after {
        content: '';
        position: absolute;
        display: grid;
        inset: 0;
          background: linear-gradient(to top, hsla(0, 0%, 0%, 0.30), hsla(0, 0%, 0%, 0.12));
        inline-size: 100%;
        block-size: 100%;
        z-index: 10;
    }

    @media (orientation: portrait) {
        &::before {
            background-image: url(${({ $verticalImage }) => $verticalImage});
        }
    }
`;

/** -------------------------------------------------------------------------------
 * Middle Ribbon styled component that organizes the status code, message, search,
 * and links in a responsive grid layout.
 * ------------------------------------------------------------------------------- */
const StyledContentRibbon = styled.section`
    display: grid;
    grid-template-columns: 1fr 1.5fr 1fr;
    grid-template-areas:
        "status-code search common-links"
        "tagline     search common-links";
    column-gap: 2rem;
    justify-items: center;
    align-items: center;
    inline-size: 100%;
    margin-block: auto;
    padding: 1.5rem clamp(1rem, 3vw, 3rem);

    background: linear-gradient(
        to right,
        var(--app-surface) 0%,
        color-mix(in srgb, var(--app-surface) 99%, transparent) 42%,
        color-mix(in srgb, var(--app-surface) 97%, transparent) 72%,
        color-mix(in srgb, var(--app-surface) 95%, transparent) 100%
    );
    color: var(--app-text);

    box-shadow: var(--app-shadow);

    z-index: 20;

    @media (orientation: portrait) {
        grid-template-columns: 1fr;
        grid-template-areas:
            "status-code"
            "tagline"
            "search"
            "common-links";
        row-gap: 1rem;
        padding: 1.5rem;

        .search-wrapper {
            border-inline: none;
        }
    }
`;

/** -------------------------------------------------------------------------------
 * Status code styled component that displays the error status code with responsive
 * font size and alignment.
 * ------------------------------------------------------------------------------- */
const StyledStatusCode = styled.div`
  grid-area: status-code;
  inline-size: 100%;
  text-align: right;

  h1 {
    color: var(--clr-error);
    margin: 0;
    font-size: var(--font-size-3xl);
    line-block-size: var(--line-block-size-tight);
    font-weight: 700;
        opacity: 0.92;
  }

  @media (orientation: portrait) {
    text-align: center;

    h1 {
      font-size: var(--font-size-2xl);
    }
  }
`;

/** -------------------------------------------------------------------------------
 * Message styled component that displays the error message with responsive font
 * size and alignment.
 * ------------------------------------------------------------------------------- */
const StyledMessage = styled.div`
  grid-area: tagline;
  inline-size: 100%;
  text-align: right;

  h2 {
        color: var(--app-text);
    margin: 0;
    margin-block-start: 0.75rem;
    font-size: var(--font-size-lg);
    line-block-size: var(--line-block-size-normal);
    font-weight: 400;
  }

  @media (orientation: portrait) {
    text-align: center;

    h2 {
      margin-block-start: 0.5rem;
      font-size: var(--font-size-md);      
    }
  }
`;

/** -------------------------------------------------------------------------------
 * Search wrapper styled component that centers the search component within its
 * grid area.
 * ------------------------------------------------------------------------------- */
const StyledSearchWrapper = styled.div`
    grid-area: search;

    inline-size: 100%;
    block-size: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    
    @media (orientation: portrait) {
        border-block: 1px solid var(--app-border);
        padding-block: 1rem;
    }
    
    @media (orientation: landscape) {
        border-inline: 1px solid var(--app-border);
        padding-inline: 1rem;
    }

`;

/** -------------------------------------------------------------------------------
 * Links wrapper styled component that centers the links component within its
 * grid area.
 * ------------------------------------------------------------------------------- */
const StyledLinksWrapper = styled.div`
    grid-area: common-links;
    inline-size: 100%;
    block-size: 100%;
    display: flex;
    flex-direction: column;
    text-align: left;
    background: color-mix(in srgb, var(--app-surface) 96%, transparent);
    border: 1px solid var(--app-border);
    border-radius: 0.35rem;
    padding: 0.5rem 0.75rem;

    @media (orientation: portrait) {
        text-align: center;
    }


`;

/** -------------------------------------------------------------------------------
 * Search form styled component that styles the search form, input, and button
 * with responsive design and focus/hover effects.
 * ------------------------------------------------------------------------------- */
const StyledSearchErrorForm = styled.form`

    --_input-border-color: var(--app-border);
    --_input-border-color-focus: color-mix(in srgb, var(--editor-tab-active-border) 75%, var(--app-text) 25%);
    --_input-background-color: var(--app-surface);

    --_border-color: var(--_input-border-color);

    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas:
        "search-label search-label"
        "search-input search-button";
    inline-size: 100%;
    max-inline-size: 20rem;
    align-items: center;

    &:focus-within {
        outline: none;
        --_border-color: var(--_input-border-color-focus);
    }

    label {
        grid-area: search-label;
        color: var(--app-text);
        text-align: left;
        margin: 0;
        margin-block-end: 0.5rem;
        font-size: var(--font-size-md);
        line-height: var(--line-block-size-normal);
        font-weight: 400;
        letter-spacing: 0.02em;

        @media (orientation: portrait) {
            text-align: center;
            font-weight: 600;
        }
    }
        
    input {
        grid-area: search-input;
        color: var(--app-text);
        inline-size: 100%;
        padding: 0.5rem;
        font-size: var(--font-size-md);
        background-color: var(--_input-background-color);
        border-block: 1px solid var(--_border-color);
        border-inline-start: 1px solid var(--_border-color);
        border-inline-end: 0px solid transparent;
        border-radius: 0.25rem 0 0 0.25rem;
        outline: none;

        &:focus, &:focus-within, &:hover {
            z-index: 1;
            position: relative;
        }

        &::placeholder {
            color: color-mix(in srgb, var(--app-text-muted) 85%, var(--app-text) 15%);
        }

    }
    
    button {
        grid-area: search-button;
        padding: 0.5rem 1rem;
        block-size: 100%;
        font-size: var(--font-size-md);
        font-weight: 500;
        background-color: var(--_input-background-color);
        color: var(--app-text);
        border-block: 1px solid var(--_border-color);
        border-inline-end: 1px solid var(--_border-color);
        border-inline-start: 0px solid transparent;
        border-radius: 0 0.25rem 0.25rem 0;
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.25s ease;
        outline: none;
        
        svg {
            fill: currentColor;
        }

        &:focus, &:hover, &:focus-within {
            background-color: var(--clr-primary-dark);
            color: hsla(0, 0%, 100%, 1.00);
            border-color: var(--clr-primary-dark);
            z-index: 1;
            position: relative;
        }
    }

    & datalist {
        font-size: var(--font-size-md);
        padding: 0.5rem;
        inline-size: 100%;
        white-space: nowrap;
        cursor: pointer;
    }
`;

/** -------------------------------------------------------------------------------
 * Error page links styled component that removes default list styling and
 * provides a clean layout for the error page links.
 * ------------------------------------------------------------------------------- */
const StyledErrorPageLinks = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;

    h3 {
        color: var(--app-text);
        margin: 0;
        margin-block-end: 0.5rem;
        font-size: var(--font-size-lg);
        line-block-size: var(--line-block-size-normal);
        font-weight: 400;
    }

    a {
        display: inline-block;
        color: var(--app-link);
        text-decoration: none;
        transition: color 0.3s ease;
        font-size: var(--font-size-sm);
        line-block-size: var(--line-block-size-normal);

        &:hover, &:focus {
            color: var(--app-link-hover);
            text-decoration: underline;
        }

        &:focus-visible {
            outline: 2px solid var(--editor-focus-ring);
            outline-offset: 2px;
            border-radius: 0.2rem;
        }
    }
`;

export { StyledBackdropImage, StyledContentRibbon, StyledStatusCode, StyledMessage, StyledSearchWrapper, StyledLinksWrapper, StyledSearchErrorForm, StyledErrorPageLinks };