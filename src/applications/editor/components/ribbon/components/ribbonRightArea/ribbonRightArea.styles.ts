import styled from 'styled-components';

const StyledRibbonRightArea  = styled.section`

display: flex;
gap: 0.5rem;

/* RESET SVGS */
    svg {
        width: 1.2rem;
        height: 1.2rem;
    }

/* HELP MENU */
    li[aria-label="Help"]{
        margin: 0;
        padding: 0;
         .item-wrapper {
            flex-direction: row;
         }        
    }


/* ZOOM MENU */
    div:first-of-type {
        position: relative;
    }

    button:first-of-type {
        display: flex;
        flex-direction: row;
        inline-size: fit-content;

        .button-label {
            overflow: unset;
        }
    }

    [role="dialog"] {
        position: absolute;
        right: 0;
        top: 100%;
        transform: translatex(calc(-100% + 5.375rem));
        inline-size: 24rem;
    }
`;

export { StyledRibbonRightArea };