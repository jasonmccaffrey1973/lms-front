import type React from "react";

export type VariantColor = "primary" | "danger" | "success" | "warning" | "info" | "light" | "dark" | (string & {});

export type StyledButtonProps = {
    $color?: VariantColor;
    $textColor?: string;
};

// Extend standard HTML button attributes
export type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> & {
    action?: () => void;
    color?: string;
    textColor?: string;
};