import styled from "styled-components";

const StyledColorPicker = styled.div`

--_size: 1.5rem;

inline-size: fit-content;
display: grid;
grid-template-areas:
    "clear"
    "palette"
    "standard"
    "custom";
gap: 0.5rem;

.clear-wrapper {
    --_font-size: 0.7rem;
    grid-area: clear;
    inline-size: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .current-color {
        display: block;
        block-size: 100%;
        aspect-ratio: 1 / 1;
        border-radius: 0.25rem;        ;
        border: 1px solid var(--editor-border, hsl(30, 6%, 88%));
        border-radius: 0.25rem;
        margin-inline-end: 0.5rem;
    }

    button {
        inline-size: fit-content;
        block-size: auto;
        display: flex;
        align-items: center;
        font-size: var(--_font-size);
        margin-inline-start: auto;
        svg {
            aspect-ratio: 1 / 1;
            inline-size: calc(var(--_font-size) * 1.2);
            margin-inline-end: 0.25rem;
        }
    }

}  

& > * {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    inline-size: 100%;
    gap: 0.1875rem;

    &:not(:first-child) {
        border-block-start: 1px solid var(--editor-border, hsl(30, 6%, 88%));
        padding-block-start: 0.5rem;
    }
    
    &::before {
        content: var(--_subcategory_label, '');
        grid-column: 1 / -1;
        display: block;
        width: 100%;
        font-size: 0.7rem;
        line-height: 1.2;
        margin-bottom: 0.25rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        font-weight: 600;
    }
}


.color-palette {
    grid-area: palette;
    --_subcategory_label: "Color Palette";
}
.standard-colors {
    grid-area: standard;
    --_subcategory_label: "Standard Colors";
    
}
.custom-color {
    grid-area: custom;
    --_subcategory_label: "Select Color";
    
    input[type="color"] {
        grid-column: 1 / -1;
        inline-size: 100%;
    }
}


button {
    width: var(--_size);
    height: var(--_size);
    border: 1px solid var(--editor-border, hsl(30, 6%, 88%));
    &:hover {
        border-color: var(--editor-item-hover, hsl(210, 80%, 96%));
        cursor: pointer;
    }
}
`;

export { StyledColorPicker };