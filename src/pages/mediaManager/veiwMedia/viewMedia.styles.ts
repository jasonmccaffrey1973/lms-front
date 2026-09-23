import styled from "styled-components";

const StyledMediaViewer = styled.div`


.media-gallery {
        display: grid;
        grid-template-columns: 20rem 1fr 20rem;
        position: relative;
        padding: 1rem;
        inline-size: 100%;
        block-size: 100%;
        
        .gallery-media-wrapper {
            width: 100%;
            height: 100%;
            grid-column: 1 / -1;
            grid-row: 1 / -1;
            overflow: hidden;
            @media (min-aspect-ratio: 1/1) { /* Tall Images */
                block-size: 100%;
                inline-size: auto;
            }
    
            @media (max-aspect-ratio: 1/1) { /* Wide Images */
                inline-size: 100%;
                block-size: auto;
            }
    
            @media (aspect-ratio: 1/1) { /* Square Images */
                inline-size: 100%;
                block-size: 100%;
            }
        }

        .gallery-track {
            display: flex;
            block-size: 100%;
            transition: transform 250ms ease-in-out;
        }

        .gallery-slide {
            display: flex;
            flex: 0 0 100%;
            align-items: center;
            justify-content: center;
            min-inline-size: 0;

            img, video, audio {
                max-inline-size: 100%;
                max-block-size: 100%;
                object-fit: contain;
            }
        }

        .previous, .next {
            position: absolute;
            inset-block-start: 50%;
            transform: translateY(-50%);
            background-color: transparent;
            
            svg {
                width: 3rem;
                height: 3rem;
                opacity: 0.75;
                transition: opacity 250ms ease-in-out;
            }

            &:disabled {
                display: none;
            }

            &:hover {
                svg {
                    opacity: 1;
                }
            }
        }

        .previous {
            inset-inline-start: 1.5rem;
        }

        .next {
            inset-inline-end: 1.5rem;
        }

        .position-indicator {
            position: absolute;
            inset-block-end: 1.5rem;
            inset-inline-start: 50%;
            display: flex;
            gap: 0.5rem;
            transform: translateX(-50%);

            &__dot {
                inline-size: 0.6rem;
                block-size: 0.6rem;
                padding: 0;
                border: 1px solid currentColor;
                border-radius: 50%;
                background: transparent;
                cursor: pointer;

                &.active {
                    background: currentColor;
                }
            }
        }
    }
`;

export { StyledMediaViewer };
