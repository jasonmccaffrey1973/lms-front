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
    Inter: {
        normal: `${FONTS_PATH}/Inter/Inter-VariableFont_opsz,wght.ttf`,
        italic: `${FONTS_PATH}/Inter/Inter-Italic-VariableFont_opsz,wght.ttf`,
        weight: "100 900",
    },
    Lato: {
        normal: `${FONTS_PATH}/Lato/Lato-Regular.ttf`,
        italic: `${FONTS_PATH}/Lato/Lato-Italic.ttf`,
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
    "Open Sans": {
        normal: `${FONTS_PATH}/Open_Sans/OpenSans-VariableFont_wdth,wght.ttf`,
        italic: `${FONTS_PATH}/Open_Sans/OpenSans-Italic-VariableFont_wdth,wght.ttf`,
        weight: "100 900",
    },
    Oswald: {
        normal: `${FONTS_PATH}/Oswald/Oswald-VariableFont_wght.ttf`,
        weight: "200 700",
    },
    Poppins: {
        normal: `${FONTS_PATH}/Poppins/Poppins-Regular.ttf`,
        italic: `${FONTS_PATH}/Poppins/Poppins-Italic.ttf`,
        weight: "400",
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
};

const hasValidPath = (value: string | undefined) =>
    Boolean(value && value.startsWith(`${FONTS_PATH}/`) && value.endsWith(".ttf"));

export const FONT_FAMILIES = Object.entries(FONTS)
    .filter(([, fontConfig]) => hasValidPath(fontConfig.normal))
    .map(([fontFamily]) => fontFamily)
    .sort((a, b) => a.localeCompare(b));

const FontStyles = css`

${Object.entries(FONTS)
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