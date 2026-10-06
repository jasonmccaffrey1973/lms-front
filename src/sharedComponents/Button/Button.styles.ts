import styled from "styled-components";
import type { StyledButtonProps } from "./Button.types";

const COLOR_MAP: Record<string, { base: string; text: string, border?: string }> = {
    primary: 
    {
        base: "var(--clr-primary)",
        text: "var(--clr-text-light)"
    },
    danger:
    { 
        base: "hsl(0 100% 40% / 1)",
        text: "var(--clr-text-light)" 
    
    },
    success:
    { 
        base: "var(--clr-success)",
        text: "var(--clr-text-light)" 

    },
    warning:
    { 
        base: "var(--clr-warning)",
        text: "hsl(0 0% 0% / 1)" 

    },
    info:
    { 
        base: "var(--clr-info)",
        text: "var(--clr-text-light)" 

    },
    light:
    { 
        base: "var(--clr-text-light)",
        text: "var(--clr-text-dark)"

    },
    dark:
    { 
        base: "var(--clr-text-dark)",
        text: "var(--clr-text-light)" 

    },
    secondary:
    { 
        base: "var(--clr-secondary)",
        text: "var(--clr-text-light)" 
    },
    transparent:
    { 
        base: "var(--clr-transparent)",
        text: "var(--clr-app-text)",
        border: "var(--app-border)"
    }
};

const StyledButton = styled.button<StyledButtonProps>`
    --_button-background: ${({ $color }) => COLOR_MAP[$color as keyof typeof COLOR_MAP]?.base || $color || "hsl(210 100% 50% / 1)"};
    --_button-text: ${({ $color, $textColor }) => $textColor || ($color && COLOR_MAP[$color as keyof typeof COLOR_MAP]?.text) || "white"};
    --_button-border: ${({ $color }) => COLOR_MAP[$color as keyof typeof COLOR_MAP]?.border || "transparent"};
    --_button-hover-background: color-mix(in srgb, var(--_button-background), black 15%);
    --_button-hover-border: color-mix(in srgb, var(--_button-border), black 15%);
    --_button-active-background: color-mix(in srgb, var(--_button-background), black 25%);


    display: grid;
    place-items: center;
    background-color: var(--_button-background);
    color: var(--_button-text);
    border: 1px solid;
    border-color: var(--_button-border);
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.025rem;
    cursor: pointer;
    
    /* Smooth transitions for background color and active transform */
    transition: 
        background-color 250ms ease-in-out,
        border-color 250ms ease-in-out,
        transform 125ms ease,
        box-shadow 250ms ease-in-out;

    svg {
        block-size: max(90%, 1rem);
        inline-size: max(90%, 1rem);
        
        fill: var(--_button-text);
    }
    
    /* Hover State */
    &:hover:not(:disabled) {
        background-color: var(--_button-hover-background);
        border-color: var(--_button-hover-border);
    }

    /* Active Press State */
    &:active:not(:disabled) {
        background-color: var(--_button-active-background);
        transform: scale(0.97);
    }

    /* Focus States */
    &:focus {
        outline: none; /* Remove default browser outline */
    }

    &:focus-visible {
        outline: 2px solid var(--_button-active-background);
    }

    /* Disabled State */
    &:disabled {
        background-color: hsl(0 0% 75% / 1);
        color: hsl(0 0% 45% / 1);
        cursor: not-allowed;
        box-shadow: none;
        transform: none;
    }
`;

export default StyledButton;