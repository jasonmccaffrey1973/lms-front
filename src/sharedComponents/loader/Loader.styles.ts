import styled from "styled-components"

const StyledLoader = styled.dialog`
    background: transparent;
    margin: 0;
    padding: 0;
    inline-size: 100dvw;
    block-size: 100dvh;
    max-inline-size: 100dvw;
    max-block-size: 100dvh;
    overflow: hidden;
    display: grid;
    place-items: center;
    z-index: 1000;
    border: none;
    outline: none;

    &::backdrop {
        background-color: hsla(0 0% 10% / 0.10);
        backdrop-filter: blur(2px);
    }

    &::after {
        content: '';
        aspect-ratio: 1 / 1;
        width: 50px;
        border-radius: 50%;
        border: 3px solid hsla(0 0% 100% / 0.15);
        border-top-color: hsla(0 0% 100% / 0.85);
        display: block;
        animation: spin 1500ms linear infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }   
`

export default StyledLoader