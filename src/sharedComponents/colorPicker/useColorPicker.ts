const DEFAULT_LIGHT_COLOR = "#000000";
const DEFAULT_DARK_COLOR = "#ffffff";

type RGB = { r: number; g: number; b: number };

type UseColorPickerArgs = {
    initialColor: string;
    changeHandler?: (color: string) => void;
    isDarkMode?: boolean;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const toHex = (value: number) => clamp(Math.round(value), 0, 255).toString(16).padStart(2, "0");

const rgbToHex = ({ r, g, b }: RGB) => `#${toHex(r)}${toHex(g)}${toHex(b)}`;

const parseHex = (color: string): RGB | null => {
    const value = color.trim().replace("#", "");

    if (!/^[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(value)) {
        return null;
    }

    const expanded = value.length === 3
        ? value.split("").map((char) => `${char}${char}`).join("")
        : value;

    return {
        r: parseInt(expanded.slice(0, 2), 16),
        g: parseInt(expanded.slice(2, 4), 16),
        b: parseInt(expanded.slice(4, 6), 16),
    };
};

const parseRgb = (color: string): RGB | null => {
    const match = color.trim().match(/^rgba?\(([^)]+)\)$/i);
    if (!match) {
        return null;
    }

    const parts = match[1]
        .split(",")
        .map((segment) => Number(segment.trim()))
        .filter((value) => Number.isFinite(value));

    if (parts.length < 3) {
        return null;
    }

    return {
        r: clamp(parts[0], 0, 255),
        g: clamp(parts[1], 0, 255),
        b: clamp(parts[2], 0, 255),
    };
};

const hslToRgb = (h: number, s: number, l: number): RGB => {
    const hue = ((h % 360) + 360) % 360;
    const saturation = clamp(s / 100, 0, 1);
    const lightness = clamp(l / 100, 0, 1);

    if (saturation === 0) {
        const gray = Math.round(lightness * 255);
        return { r: gray, g: gray, b: gray };
    }

    const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    const m = lightness - c / 2;

    let r = 0;
    let g = 0;
    let b = 0;

    if (hue < 60) {
        r = c;
        g = x;
    } else if (hue < 120) {
        r = x;
        g = c;
    } else if (hue < 180) {
        g = c;
        b = x;
    } else if (hue < 240) {
        g = x;
        b = c;
    } else if (hue < 300) {
        r = x;
        b = c;
    } else {
        r = c;
        b = x;
    }

    return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255),
    };
};

const parseHsl = (color: string): RGB | null => {
    const match = color.trim().match(/^hsl\(([-\d.]+)\s*,\s*([-\d.]+)%\s*,\s*([-\d.]+)%\s*\)$/i);
    if (!match) {
        return null;
    }

    return hslToRgb(Number(match[1]), Number(match[2]), Number(match[3]));
};

const parseColorToRgb = (color: string): RGB | null => parseHex(color) ?? parseRgb(color) ?? parseHsl(color);

const relativeLuminance = ({ r, g, b }: RGB): number => {
    const linear = [r, g, b].map((channel) => {
        const value = channel / 255;
        return value <= 0.03928
            ? value / 12.92
            : ((value + 0.055) / 1.055) ** 2.4;
    });

    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
};

const darkModeContrastAdjustedColor = (color: string, isDarkMode: boolean): string => {
    if (!isDarkMode || color.trim() === "") {
        return color;
    }

    const rgb = parseColorToRgb(color);
    if (!rgb) {
        return color;
    }

    if (relativeLuminance(rgb) >= 0.35) {
        return color;
    }

    const adjusted: RGB = {
        r: clamp(rgb.r + Math.round((255 - rgb.r) * 0.6), 0, 255),
        g: clamp(rgb.g + Math.round((255 - rgb.g) * 0.6), 0, 255),
        b: clamp(rgb.b + Math.round((255 - rgb.b) * 0.6), 0, 255),
    };

    return rgbToHex(adjusted);
};

const toInputHexColor = (color: string, fallback: string): string => {
    if (!color || color.trim() === "") {
        return fallback;
    }

    const rgb = parseColorToRgb(color);
    return rgb ? rgbToHex(rgb) : fallback;
};

const useColorPicker = ({ initialColor, changeHandler, isDarkMode = false }: UseColorPickerArgs) => {

    const COLOR_PALETTE = {
        1: ["hsl(0, 100%, 91%)", "hsl(30, 100%, 91%)", "hsl(60, 100%, 91%)", "hsl(90, 100%, 91%)", "hsl(120, 100%, 91%)", "hsl(150, 100%, 91%)", "hsl(180, 100%, 91%)", "hsl(210, 100%, 91%)", "hsl(240, 100%, 91%)", "hsl(270, 100%, 91%)", "hsl(300, 100%, 91%)", "hsl(330, 100%, 91%)"],
        2: ["hsl(0, 100%, 82%)", "hsl(30, 100%, 82%)", "hsl(60, 100%, 82%)", "hsl(90, 100%, 82%)", "hsl(120, 100%, 82%)", "hsl(150, 100%, 82%)", "hsl(180, 100%, 82%)", "hsl(210, 100%, 82%)", "hsl(240, 100%, 82%)", "hsl(270, 100%, 82%)", "hsl(300, 100%, 82%)", "hsl(330, 100%, 82%)"],
        3: ["hsl(0, 100%, 73%)", "hsl(30, 100%, 73%)", "hsl(60, 100%, 73%)", "hsl(90, 100%, 73%)", "hsl(120, 100%, 73%)", "hsl(150, 100%, 73%)", "hsl(180, 100%, 73%)", "hsl(210, 100%, 73%)", "hsl(240, 100%, 73%)", "hsl(270, 100%, 73%)", "hsl(300, 100%, 73%)", "hsl(330, 100%, 73%)"],
        4: ["hsl(0, 100%, 64%)", "hsl(30, 100%, 64%)", "hsl(60, 100%, 64%)", "hsl(90, 100%, 64%)", "hsl(120, 100%, 64%)", "hsl(150, 100%, 64%)", "hsl(180, 100%, 64%)", "hsl(210, 100%, 64%)", "hsl(240, 100%, 64%)", "hsl(270, 100%, 64%)", "hsl(300, 100%, 64%)", "hsl(330, 100%, 64%)"],
        5: ["hsl(0, 100%, 55%)", "hsl(30, 100%, 55%)", "hsl(60, 100%, 55%)", "hsl(90, 100%, 55%)", "hsl(120, 100%, 55%)", "hsl(150, 100%, 55%)", "hsl(180, 100%, 55%)", "hsl(210, 100%, 55%)", "hsl(240, 100%, 55%)", "hsl(270, 100%, 55%)", "hsl(300, 100%, 55%)", "hsl(330, 100%, 55%)"],
        6: ["hsl(0, 100%, 46%)", "hsl(30, 100%, 46%)", "hsl(60, 100%, 46%)", "hsl(90, 100%, 46%)", "hsl(120, 100%, 46%)", "hsl(150, 100%, 46%)", "hsl(180, 100%, 46%)", "hsl(210, 100%, 46%)", "hsl(240, 100%, 46%)", "hsl(270, 100%, 46%)", "hsl(300, 100%, 46%)", "hsl(330, 100%, 46%)"],
        7: ["hsl(0, 100%, 37%)", "hsl(30, 100%, 37%)", "hsl(60, 100%, 37%)", "hsl(90, 100%, 37%)", "hsl(120, 100%, 37%)", "hsl(150, 100%, 37%)", "hsl(180, 100%, 37%)", "hsl(210, 100%, 37%)", "hsl(240, 100%, 37%)", "hsl(270, 100%, 37%)", "hsl(300, 100%, 37%)", "hsl(330, 100%, 37%)"],
        8: ["hsl(0, 100%, 28%)", "hsl(30, 100%, 28%)", "hsl(60, 100%, 28%)", "hsl(90, 100%, 28%)", "hsl(120, 100%, 28%)", "hsl(150, 100%, 28%)", "hsl(180, 100%, 28%)", "hsl(210, 100%, 28%)", "hsl(240, 100%, 28%)", "hsl(270, 100%, 28%)", "hsl(300, 100%, 28%)", "hsl(330, 100%, 28%)"],
        9: ["hsl(0, 100%, 19%)", "hsl(30, 100%, 19%)", "hsl(60, 100%, 19%)", "hsl(90, 100%, 19%)", "hsl(120, 100%, 19%)", "hsl(150, 100%, 19%)", "hsl(180, 100%, 19%)", "hsl(210, 100%, 19%)", "hsl(240, 100%, 19%)", "hsl(270, 100%, 19%)", "hsl(300, 100%, 19%)", "hsl(330, 100%, 19%)"],
        10: ["hsl(0, 100%, 10%)", "hsl(30, 100%, 10%)", "hsl(60, 100%, 10%)", "hsl(90, 100%, 10%)", "hsl(120, 100%, 10%)", "hsl(150, 100%, 10%)", "hsl(180, 100%, 10%)", "hsl(210, 100%, 10%)", "hsl(240, 100%, 10%)", "hsl(270, 100%, 10%)", "hsl(300, 100%, 10%)", "hsl(330, 100%, 10%)"],
    };
    
    const STANDARD_COLORS = [
        "hsl(0, 0%, 0%)", "hsl(0, 0%, 100%)", "hsl(0, 100%, 50%)", "hsl(120, 100%, 50%)", "hsl(240, 100%, 50%)",
        "hsl(60, 100%, 50%)", "hsl(300, 100%, 50%)", "hsl(180, 100%, 50%)", "hsl(0, 0%, 75%)", "hsl(0, 0%, 50%)",
    ];

    const fallbackColor = isDarkMode ? DEFAULT_DARK_COLOR : DEFAULT_LIGHT_COLOR;
    const currentColor = initialColor || fallbackColor;
    const colorInputValue = toInputHexColor(currentColor, fallbackColor);

    const handleColorClick = (color: string) => {
        const normalizedColor = darkModeContrastAdjustedColor(color, isDarkMode);
        if (changeHandler) {
            changeHandler(normalizedColor);
        }
    };

    return {
        COLOR_PALETTE,
        STANDARD_COLORS,
        currentColor,
        colorInputValue,
        handleColorClick
    };  
};

export default useColorPicker;