import styled from 'styled-components';
import backdropErrorH from '../../assets/images/error-h.jpg';
import backdropErrorV from '../../assets/images/error-v.jpg';

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

const StyledSearchWrapper = styled.div`
    grid-area: search;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledLinksWrapper = styled.div`
    grid-area: common-links;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export { StyledBackdropImage, StyledContentRibbon, StyledStatusCode, StyledMessage, StyledSearchWrapper, StyledLinksWrapper };
