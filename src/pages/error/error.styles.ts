import styled from 'styled-components';
import backdropErrorH from '../../assets/images/error-h.jpg';
import backdropErrorV from '../../assets/images/error-v.jpg';


/** ================================================================================
 * Styled components for the Error page, including the backdrop image,
 * content ribbon, status code, message, search wrapper, and links wrapper.
 * ================================================================================ */

/** -------------------------------------------------------------------------------
 * Backdrop image styled component with responsive background images for horizontal
 * and vertical orientations.
 * ------------------------------------------------------------------------------- */
const StyledBackdropImage = styled.div`
    --_backdrop-image: url(${backdropErrorH});

    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: clip;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: var(--_backdrop-image);
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
        background: linear-gradient(to top, hsla(0, 0%, 100%, 0.20), hsla(0, 0%, 100%, 0.40));
        width: 100%;
        height: 100%;
        z-index: 10;
    }

    @media (orientation: portrait) {
            --_backdrop-image: url(${backdropErrorV});
        }
`;

/** -------------------------------------------------------------------------------
 * Middle Ribbon styled component that organizes the status code, message, search,
 * and links in a responsive grid layout.
 * ------------------------------------------------------------------------------- */
const StyledContentRibbon = styled.section`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 1rem;
    grid-template-areas:
        "status-code search common-links"
        "tagline search common-links";
    justify-items: center;
    align-items: center;
    width: 100%;
    margin-block: auto;
    padding: 0.66rem;
    background: linear-gradient(to right, hsla(0, 0%, 100%, 1.00), hsla(0, 0%, 100%, 0.90));
    box-shadow: 0 1rem 1rem hsla(0, 0%, 0%, 0.25);
    z-index: 20;

    @media (orientation: portrait) {
        grid-template-columns: 1fr;
        grid-template-areas:
            "status-code"
            "tagline"
            "common-links";
    }
`;

/** -------------------------------------------------------------------------------
 * Status code styled component that displays the error status code with responsive
 * font size and alignment.
 * ------------------------------------------------------------------------------- */
const StyledStatusCode = styled.div`
    grid-area: status-code;
    width: 100%;
    text-align: left;
    h1 {
        color: var(--clr-error);
        margin: 0;
        font-size: clamp(2rem, 7vh, 4rem);
        font-weight: 700;
        opacity: 0.75;
    }

    @media (orientation: portrait) {
        text-align: center;
        h1 {
            font-size: clamp(2rem, 5vh, 3rem);
        }
    }
    
`; 

/** -------------------------------------------------------------------------------
 * Message styled component that displays the error message with responsive font
 * size and alignment.
 * ------------------------------------------------------------------------------- */
const StyledMessage = styled.div`
    grid-area: tagline;
    width: 100%;
    text-align: left;
    h2 {
        margin: 0;
        margin-block-start: 0.75rem;
        font-size: clamp(1rem, 2.5vh, 1.5rem);
        font-weight: 400;
    }

    @media (orientation: portrait) {
        text-align: center;
        h2 {
            margin-block-start: 0.5rem;
            font-size: clamp(1rem, 2.5vh, 1.25rem);
        }
    }
`;

/** -------------------------------------------------------------------------------
 * Search wrapper styled component that centers the search component within its
 * grid area.
 * ------------------------------------------------------------------------------- */
const StyledSearchWrapper = styled.div`
    grid-area: search;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

/** -------------------------------------------------------------------------------
 * Links wrapper styled component that centers the links component within its
 * grid area.
 * ------------------------------------------------------------------------------- */
const StyledLinksWrapper = styled.div`
    grid-area: common-links;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: right;
`;

/** -------------------------------------------------------------------------------
 * Search form styled component that styles the search form, input, and button
 * with responsive design and focus/hover effects.
 * ------------------------------------------------------------------------------- */
const StyledSearchErrorForm = styled.form`

    --_input-border-color: hsla(0, 0%, 0%, 0.25);
    --_input-border-color-focus: hsla(0, 0%, 0%, 0.75);
    --_input-background-color: hsla(0, 0%, 100%, 0.75);

    --_border-color: var(--_input-border-color);

    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas:
        "search-label search-label"
        "search-input search-button";
    width: 100%;
    max-inline-size: 20rem;
    align-items: center;

    &:focus-within {
        outline: none;
        --_border-color: var(--_input-border-color-focus);
    }

    label {
        grid-area: search-label;
        text-align: left;
        margin: 0;
        margin-block-end: 0.5rem;
        font-size: clamp(1rem, 0.5vh, 1.5rem);
        font-weight: 400;
    }
        
    input {
        grid-area: search-input;
        width: 100%;
        padding: 0.5rem;
        font-size: clamp(0.75rem, 1vh, 1rem);
        background-color: var(--_input-background-color);
        border-block: 1px solid var(--_border-color);
        border-inline-start: 1px solid var(--_border-color);
        border-inline-end: 1px solid transparent;
        border-radius: 0.25rem 0 0 0.25rem;

        &:focus {
            outline: none;
        }

    }
    
    button {
        grid-area: search-button;
        padding: 0.5rem 1rem;
        height: 100%;
        font-size: clamp(0.75rem, 0.5vh, 1rem);
        background-color: var(--_input-background-color);
        border-block: 1px solid var(--_border-color);
        border-inline-end: 1px solid var(--_border-color);
        border-inline-start: 1px solid transparent;
        border-radius: 0 0.25rem 0.25rem 0;
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.25s ease;

        &:focus, &:hover {
            outline: none;
            background-color: var(--clr-primary);
            color: hsla(0, 0%, 100%, 1.00);
        }
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
        margin: 0;
        margin-block-end: 0.5rem;
        font-size: clamp(1rem, 0.5vh, 1.5rem);
        font-weight: 400;
    }

    a {
        display: inline-block;
        color: var(--clr-primary);
        text-decoration: none;
        transition: color 0.3s ease;
        font-size: clamp(0.75rem, 1vh, 1rem);

        &:hover, &:focus {
            color: var(--clr-primary-dark);
            text-decoration: underline;
        }
    }
`;

export { StyledBackdropImage, StyledContentRibbon, StyledStatusCode, StyledMessage, StyledSearchWrapper, StyledLinksWrapper, StyledSearchErrorForm, StyledErrorPageLinks };