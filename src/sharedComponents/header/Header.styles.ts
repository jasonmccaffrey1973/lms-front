import styled from "styled-components"
const StyledHeader = styled.header`
    min-block-size: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-block: 0.75rem;
    margin-inline: 1.5rem;

    .logo-wrapper {
        display: flex;
        align-items: center;
        padding-block: 0.33rem;
        min-block-size: 3rem;
    }

    .logo-wrapper svg {
        display: block;
        min-block-size: 2.75rem;
        inline-size: auto;
    }

    .user-avatar {
        inline-size: 3rem;
        aspect-ratio: 1 / 1;
        padding: 0.33rem;
        display: grid;
        border-radius: 50%;
        background-color: hsl(from var(--clr-primary) h s l / 90%);
        place-content: center;
        font-size: 1.33rem;
        font-weight: bold;
        color: var(--clr-background-light);
        box-shadow: 0.25rem 0.25rem 0.33rem rgba(0, 0, 0, 0.15);
        transition: background-color 250ms ease-in-out;

        & svg {
            inline-size: 2rem;
            aspect-ratio: 1 / 1;
            fill: var(--clr-background-light);
        }

        &:hover {
            cursor: pointer; 
            box-shadow: inset 0.25rem 0.25rem 0.33rem rgba(0, 0, 0, 0.25);
            background-color: var(--clr-primary-dark);
        }
    }
`;
export default StyledHeader;