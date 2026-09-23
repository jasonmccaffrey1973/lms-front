import type React from "react";

export type VariantColor = "primary" | "danger" | "success" | "warning" | "info" | "light" | "dark" | "transparent" | (string & {});

export type StyledButtonProps = {
    $color?: VariantColor;
    $textColor?: string;
};

// Preserve native button attributes (disabled, form, aria-*, data-*, etc.) while
// using `color` for the component's visual variant.
export type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> & {
    action?: () => void;
    color?: string;
    textColor?: string;
};
