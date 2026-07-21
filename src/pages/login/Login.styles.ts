import styled from "styled-components"

export const StyledLogin = styled.div`
    --_column-width: 60ch;
    --_background-color: hsl(0, 0%, 94%);

    @media (prefers-color-scheme: dark) {
        --_background-color: hsl(0, 0%, 10%);
    }

    color-scheme: dark light;
    width: 100%;
    display: grid;
    grid-template-columns: minmax(0, var(--_column-width)) 1fr;
    grid-template-rows: 100vh;
    grid-template-areas: "left-column right-column";
    gap: 0.33rem;

    .left-column {
        grid-area: left-column;
        display: grid;
        grid-template-rows: auto 1fr auto;
        grid-template-areas: "header" "main" "footer";
        background-color: var(--_background-color);
        box-shadow: 0 0 0.5rem hsla(0, 0%, 0%, 0.25);

        header,
        footer {
            display: grid;
            place-items: center;
        }

        header {
            grid-area: header;
        }

        main {
            grid-area: main;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 0.75rem;
            padding: 1rem;
            margin-block-end: clamp(1.5rem, 8vh, 5rem);

            form {
                inline-size: min(100%, 34rem);
                margin-inline: auto;
            }
        }

        footer {
            grid-area: footer;
        }
    }

    .right-column {
        grid-area: right-column;
    }

    @media (max-width: 960px) {
        grid-template-columns: 1fr;
        grid-template-rows: auto minmax(10rem, 30vh);
        grid-template-areas:
            "left-column"
            "right-column";

        .left-column {
            min-block-size: 70vh;
        }

        .right-column {
            min-block-size: 8rem;
        }
    }

    @media (max-width: 640px) {
        .left-column {
            main {
                margin-block-end: 1rem;
                padding: 1rem 0.875rem;
            }
        }
    }
`

export const StyledLoginSection = styled.div`
    block-size: clamp(4rem, 20vh, 20rem);
`

export const StyledFormGroup = styled.div`
    display: grid;
    gap: 0.5rem;
    margin-bottom: 1rem;
    inline-size: 100%;
    padding: 0.375rem;
    border-radius: 0.75rem;
    transition: background-color 200ms ease;

    &:focus-within {
        background-color: hsla(212, 100%, 48%, 0.08);
    }

    label {
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: 0.1rem;
    }

    input {
        font-size: 1rem;
        padding-inline: 0.75rem;
        padding-block: 1.25rem;
        border: 1px solid hsla(0, 0%, 0%, 0.1);
        border-radius: 0.5rem;

        &:focus-visible {
            outline: 2px solid var(--clr-primary-light);
            outline-offset: 2px;
            border-color: var(--clr-primary);
        }
    }
`

export const StyledFormLinks = styled.div`
    grid-area: help-links;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    block-size: fit-content;
    margin-block: auto;

    a {
        text-decoration: none;
        color: var(--clr-primary);
        transition: color 300ms ease;
        inline-size: fit-content;

        &:hover {
            color: var(--clr-primary-dark);
        }

        &:focus-visible {
            outline: 2px solid var(--clr-primary-light);
            outline-offset: 2px;
            border-radius: 0.25rem;
        }
    }
`

export const StyledButtonGroup = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas: "help-links submit-button";
    align-items: end;
    gap: 0.5rem;

    button[type="submit"] {
        grid-area: submit-button;
    }

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
        grid-template-areas:
            "submit-button"
            "help-links";

        button[type="submit"] {
            inline-size: 100%;
        }
    }
`