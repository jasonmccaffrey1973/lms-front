import { css } from "styled-components";

const FONTS_PATH = "/src/assets/fonts";
export type FontFaceConfig = {
    normal: string;
    italic?: string;
    weight: string;
};

export const FONTS: Record<string, FontFaceConfig> = {
    Arimo: {
        normal: `${FONTS_PATH}/Arimo/Arimo-VariableFont_wght.ttf`,
        italic: `${FONTS_PATH}/Arimo/Arimo-Italic-VariableFont_wght.ttf`,
        weight: "100 900",
    },
    Barlow: {
        normal: `${FONTS_PATH}/Barlow/Barlow-VariableFont_wght.ttf`,
        italic: `${FONTS_PATH}/Barlow/Barlow-Italic-VariableFont_wght.ttf`,
        weight: "100 900",
    },
    "Great Vibes": {
        normal: `${FONTS_PATH}/Great_Vibes/GreatVibes-Regular.ttf`,
        weight: "400",
    },
    "Hachi Maru Pop": {
        normal: `${FONTS_PATH}/Hachi_Maru_Pop/HachiMaruPop-Regular.ttf`,
        weight: "400",
    },
    "Indie Flower": {
        normal: `${FONTS_PATH}/Indie_Flower/IndieFlower-Regular.ttf`,
        weight: "400",
    },
    Inter: {
        normal: `${FONTS_PATH}/Inter/Inter-VariableFont_opsz,wght.ttf`,
        italic: `${FONTS_PATH}/Inter/Inter-Italic-VariableFont_opsz,wght.ttf`,
        weight: "100 900",
    },
    Italiana: {
        normal: `${FONTS_PATH}/Italiana/Italiana-Regular.ttf`,
        weight: "400",
    },
    Kalam: {
        normal: `${FONTS_PATH}/Kalam/Kalam-Regular.ttf`,
        italic: `${FONTS_PATH}/Kalam/Kalam-Italic.ttf`,
        weight: "400",
    },
    Kanit: {
        normal: `${FONTS_PATH}/Kanit/Kanit-VariableFont_wght.ttf`,
        italic: `${FONTS_PATH}/Kanit/Kanit-Italic-VariableFont_wght.ttf`,
        weight: "100 900",
    },
    Lato: {
        normal: `${FONTS_PATH}/Lato/Lato-Regular.ttf`,
        italic: `${FONTS_PATH}/Lato/Lato-Italic.ttf`,
        weight: "400",
    },
    Lobster: {
        normal: `${FONTS_PATH}/Lobster/Lobster-Regular.ttf`,
        weight: "400",
    },
    Merriweather: {
        normal: `${FONTS_PATH}/Merriweather/Merriweather-Regular.ttf`,
        italic: `${FONTS_PATH}/Merriweather/Merriweather-Italic.ttf`,
        weight: "400",
    },
    Montserrat: {
        normal: `${FONTS_PATH}/Montserrat/Montserrat-VariableFont_wght.ttf`,
        italic: `${FONTS_PATH}/Montserrat/Montserrat-Italic-VariableFont_wght.ttf`,
        weight: "100 900",
    },
    "Noto Sans": {
        normal: `${FONTS_PATH}/Noto_Sans/NotoSans-VariableFont_wdth,wght.ttf`,
        italic: `${FONTS_PATH}/Noto_Sans/NotoSans-Italic-VariableFont_wdth,wght.ttf`,
        weight: "100 900",
    },
    Nunito: {
        normal: `${FONTS_PATH}/Nunito/Nunito-VariableFont_wght.ttf`,
        italic: `${FONTS_PATH}/Nunito/Nunito-Italic-VariableFont_wght.ttf`,
        weight: "100 900",
    },
    "Open Sans": {
        normal: `${FONTS_PATH}/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf`,
        italic: `${FONTS_PATH}/Open_Sans/OpenSans-Italic-VariableFont_wdth,wght.ttf`,
        weight: "100 900",
    },
    Oswald: {
        normal: `${FONTS_PATH}/Oswald/Oswald-VariableFont_wght.ttf`,
        weight: "200 700",
    },
    "Patrick Hand": {
        normal: `${FONTS_PATH}/Patrick_Hand/PatrickHand-Regular.ttf`,
        weight: "400",
    },
    "Playfair Display": {
        normal: `${FONTS_PATH}/Playfair_Display/PlayfairDisplay-VariableFont_wght.ttf`,
        italic: `${FONTS_PATH}/Playfair_Display/PlayfairDisplay-Italic-VariableFont_wght.ttf`,
        weight: "100 900",
    },
    Poppins: {
        normal: `${FONTS_PATH}/Poppins/Poppins-Regular.ttf`,
        italic: `${FONTS_PATH}/Poppins/Poppins-Italic.ttf`,
        weight: "400",
    },
    Prompt: {
        normal: `${FONTS_PATH}/Prompt/Prompt-VariableFont_wght.ttf`,
        italic: `${FONTS_PATH}/Prompt/Prompt-Italic-VariableFont_wght.ttf`,
        weight: "100 900",
    },
    Raleway: {
        normal: `${FONTS_PATH}/Raleway/Raleway-VariableFont_wght.ttf`,
        italic: `${FONTS_PATH}/Raleway/Raleway-Italic-VariableFont_wght.ttf`,
        weight: "100 900",
    },
    Roboto: {
        normal: `${FONTS_PATH}/Roboto/Roboto-VariableFont_wdth,wght.ttf`,
        italic: `${FONTS_PATH}/Roboto/Roboto-Italic-VariableFont_wdth,wght.ttf`,
        weight: "100 900",
    },
    "Roboto Condensed": {
        normal: `${FONTS_PATH}/Roboto_Condensed/RobotoCondensed-VariableFont_wght.ttf`,
        italic: `${FONTS_PATH}/Roboto_Condensed/RobotoCondensed-Italic-VariableFont_wght.ttf`,
        weight: "100 900",
    },
    Satisfy: {
        normal: `${FONTS_PATH}/Satisfy/Satisfy-Regular.ttf`,
        weight: "400",
    },
    Tangerine: {
        normal: `${FONTS_PATH}/Tangerine/Tangerine-Regular.ttf`,
        italic: `${FONTS_PATH}/Tangerine/Tangerine-Italic.ttf`,
        weight: "400",
    },
    "Titillium Web": {
        normal: `${FONTS_PATH}/Titillium_Web/TitilliumWeb-VariableFont_wght.ttf`,
        italic: `${FONTS_PATH}/Titillium_Web/TitilliumWeb-Italic-VariableFont_wght.ttf`,
        weight: "100 900",
    },
    Ubuntu: {
        normal: `${FONTS_PATH}/Ubuntu/Ubuntu-VariableFont_wght.ttf`,
        italic: `${FONTS_PATH}/Ubuntu/Ubuntu-Italic-VariableFont_wght.ttf`,
        weight: "100 900",
    },
    Zeyada: {
        normal: `${FONTS_PATH}/Zeyada/Zeyada-Regular.ttf`,
        weight: "400",
    },
};

const hasValidPath = (value: string | undefined) =>
    Boolean(value && value.startsWith(`${FONTS_PATH}/`) && value.endsWith(".ttf"));

// Browser font parser warning suppression for known problematic assets.
const EXCLUDED_FONT_FAMILIES = new Set<string>(["Zeyada"]);

const LOADED_FONTS = Object.entries(FONTS).filter(
    ([fontFamily, fontConfig]) =>
        !EXCLUDED_FONT_FAMILIES.has(fontFamily) && hasValidPath(fontConfig.normal),
);

export const FONT_FAMILIES = LOADED_FONTS
    .map(([fontFamily]) => fontFamily)
    .sort((a, b) => a.localeCompare(b));

const FontStyles = css`

${LOADED_FONTS
    .map(([fontFamily, styles]) => {
        const normalFace = `
            @font-face {
                font-family: "${fontFamily}";
                src: url("${styles.normal}") format("truetype");
                font-weight: ${styles.weight};
                font-style: normal;
                font-display: swap;
            }
        `;

        const italicFace = styles.italic
            ? `
            @font-face {
                font-family: "${fontFamily}";
                src: url("${styles.italic}") format("truetype");
                font-weight: ${styles.weight};
                font-style: italic;
                font-display: swap;
            }
        `
            : "";

        return `${normalFace}${italicFace}`;
    })
    .join("\n")}
`;

export default FontStyles;