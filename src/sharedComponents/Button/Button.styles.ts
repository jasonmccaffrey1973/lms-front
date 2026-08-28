import styled from "styled-components";
import type { StyledButtonProps } from "./Button.types";

const COLOR_MAP: Record<string, { base: string; text: string }> = {
    primary: 
    {
        base: "hsl(210 100% 45% / 1)",
        text: "hsl(0 0% 100% / 1)" 
    },
    danger:
    { 
        base: "hsl(0 100% 40% / 1)",
        text: "hsl(0 0% 100% / 1)" 
    
    },
    success:
    { 
        base: "hsl(120 100% 30% / 1)",
        text: "hsl(0 0% 100% / 1)" 

    },
    warning:
    { 
        base: "hsl(45 100% 50% / 1)",
        text: "hsl(0 0% 0% / 1)" 

    },
    info:
    { 
        base: "hsl(200 100% 50% / 1)",
        text: "hsl(0 0% 100% / 1)" 

    },
    light:
    { 
        base: "hsl(0 0% 95% / 1)",
        text: "hsl(0 0% 0% / 1)" 

    },
    dark:
    { 
        base: "hsl(0 0% 20% / 1)",
        text: "hsl(0 0% 100% / 1)" 

    },
};

const StyledButton = styled.button<StyledButtonProps>`
    --_button-background: ${({ $color }) => COLOR_MAP[$color as keyof typeof COLOR_MAP]?.base || $color || "hsl(210 100% 50% / 1)"};
    --_button-text: ${({ $color, $textColor }) => $textColor || ($color && COLOR_MAP[$color as keyof typeof COLOR_MAP]?.text) || "white"};
    --_button-hover-background: color-mix(in srgb, var(--_button-background), black 15%);
    --_button-active-background: color-mix(in srgb, var(--_button-background), black 25%);

    display: grid;
    place-items: center;
    background-color: var(--_button-background);
    color: var(--_button-text);
    border: none;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.025rem;
    user-select: none;

    svg {
        block-size: max(90%, 1rem);
        inline-size: max(90%, 1rem);
        
        fill: var(--_button-text);
    }

    /* Smooth transitions for background color and active transform */
    transition: 
        background-color 250ms ease-in-out,
        transform 125ms ease,
        box-shadow 250ms ease-in-out;

    /* Hover State */
    &:hover:not(:disabled) {
        background-color: var(--_button-hover-background);
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
        /* High-contrast double focus ring using box-shadow offset */
        outline: 2px solid transparent;
        box-shadow: 
            0 0 0 2px var(--_button-text),
            0 0 0 4px var(--_button-background);
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