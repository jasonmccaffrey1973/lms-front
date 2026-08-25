import {createGlobalStyle} from 'styled-components'

const GlobalStyles = createGlobalStyle`

:root {

    /* COLORS */
    --clr-primary: hsl(212, 100%, 48%);
    --clr-primary-dark: hsl(212, 100%, 36%);
    --clr-primary-light: hsl(212, 100%, 64%);
    --clr-secondary: hsl(0, 0%, 20%);
    --clr-secondary-dark: hsl(0, 0%, 12%);
    --clr-secondary-light: hsl(0, 0%, 36%);
    --clr-background: hsl(0, 0%, 98%);
    --clr-background-dark: hsl(0, 0%, 10%);
    --clr-background-light: hsl(0, 0%, 100%);
    --clr-text: hsl(0, 0%, 20%);
    --clr-text-dark: hsl(0, 0%, 10%);
    --clr-text-light: hsl(0, 0%, 100%);
    --clr-success: hsl(120, 100%, 25%);
    --clr-success-dark: hsl(120, 100%, 18%);
    --clr-success-light: hsl(120, 70%, 45%);
    --clr-error: hsl(0, 100%, 50%);
    --clr-warning: hsl(45, 100%, 50%);
    --clr-info: hsl(200, 100%, 50%);
    --clr-link: hsl(212, 100%, 48%);

    /* TYPEFACES */
    --font-family-base:
    "Segoe UI",
    Inter,
    Roboto,
    Helvetica,
    Arial,
    sans-serif;

  --font-size-xs: 0.75rem; 
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;    
  --font-size-lg: 1.25rem; 
  --font-size-xl: 1.75rem; 
  --font-size-2xl: 2.5rem; 
  --font-size-3xl: 3.5rem; 

  --line-block-size-tight: 1.15;
  --line-block-size-normal: 1.5;

        /* APP SURFACE TOKENS (LIGHT DEFAULT) */
        --app-bg: hsl(0, 0%, 98%);
        --app-surface: #ffffff;
        --app-surface-muted: hsl(0, 0%, 94%);
        --app-border: rgba(0, 0, 0, 0.1);
        --app-text: hsl(0, 0%, 16%);
        --app-text-muted: rgba(0, 0, 0, 0.65);
        --app-hover: hsla(0, 0%, 0%, 0.08);
        --app-shadow: 0 0.25rem 0.4rem rgba(0, 0, 0, 0.12);
            --app-link: hsl(212, 100%, 32%);
            --app-link-hover: hsl(212, 100%, 26%);

    /* EDITOR THEME TOKENS (LIGHT DEFAULT) */
    --editor-surface: #ffffff;
    --editor-surface-muted: hsl(0, 0%, 94%);
    --editor-surface-subtle: rgba(255, 255, 255, 0.2);
    --editor-border: rgba(0, 0, 0, 0.1);
    --editor-border-strong: #dfe3e8;
    --editor-text: hsl(0, 0%, 16%);
    --editor-text-muted: rgba(0, 0, 0, 0.62);
    --editor-tab-hover: hsl(216, 26%, 93%);
    --editor-tab-active: hsl(215, 16%, 85%);
    --editor-tab-active-border: #2f6feb;
    --editor-item-hover: #e0e0e0;
    --editor-item-active-bg: rgba(47, 111, 235, 0.12);
    --editor-item-active-border: rgba(47, 111, 235, 0.35);
    --editor-focus-ring: #b7c8ff;
    
}

@media (prefers-color-scheme: dark) {
    :root {
        --app-bg: hsl(216, 20%, 10%);
        --app-surface: hsl(216, 20%, 14%);
        --app-surface-muted: hsl(216, 16%, 19%);
        --app-border: rgba(255, 255, 255, 0.14);
        --app-text: hsl(220, 14%, 93%);
        --app-text-muted: rgba(255, 255, 255, 0.72);
        --app-hover: hsla(0, 0%, 100%, 0.08);
        --app-shadow: 0 0.25rem 0.4rem rgba(0, 0, 0, 0.4);
            --app-link: hsl(214, 100%, 78%);
            --app-link-hover: hsl(206, 100%, 84%);

        --editor-surface: hsl(216, 20%, 14%);
        --editor-surface-muted: hsl(216, 16%, 19%);
        --editor-surface-subtle: rgba(255, 255, 255, 0.05);
        --editor-border: rgba(255, 255, 255, 0.14);
        --editor-border-strong: rgba(255, 255, 255, 0.2);
        --editor-text: hsl(220, 14%, 93%);
        --editor-text-muted: rgba(255, 255, 255, 0.72);
        --editor-tab-hover: hsl(215, 16%, 24%);
        --editor-tab-active: hsl(215, 14%, 28%);
        --editor-tab-active-border: hsl(218, 95%, 70%);
        --editor-item-hover: hsl(216, 13%, 26%);
        --editor-item-active-bg: rgba(122, 162, 255, 0.2);
        --editor-item-active-border: rgba(122, 162, 255, 0.45);
        --editor-focus-ring: rgba(122, 162, 255, 0.75);
    }
}

:root[data-theme='light'] {
    --app-bg: hsl(0, 0%, 98%);
    --app-surface: #ffffff;
    --app-surface-muted: hsl(0, 0%, 94%);
    --app-border: rgba(0, 0, 0, 0.1);
    --app-text: hsl(0, 0%, 16%);
    --app-text-muted: rgba(0, 0, 0, 0.65);
    --app-hover: hsla(0, 0%, 0%, 0.08);
    --app-shadow: 0 0.25rem 0.4rem rgba(0, 0, 0, 0.12);
        --app-link: hsl(212, 100%, 32%);
        --app-link-hover: hsl(212, 100%, 26%);

    --editor-surface: #ffffff;
    --editor-surface-muted: hsl(0, 0%, 94%);
    --editor-surface-subtle: rgba(255, 255, 255, 0.2);
    --editor-border: rgba(0, 0, 0, 0.1);
    --editor-border-strong: #dfe3e8;
    --editor-text: hsl(0, 0%, 16%);
    --editor-text-muted: rgba(0, 0, 0, 0.62);
    --editor-tab-hover: hsl(216, 26%, 93%);
    --editor-tab-active: hsl(215, 16%, 85%);
    --editor-tab-active-border: #2f6feb;
    --editor-item-hover: #e0e0e0;
    --editor-item-active-bg: rgba(47, 111, 235, 0.12);
    --editor-item-active-border: rgba(47, 111, 235, 0.35);
    --editor-focus-ring: #b7c8ff;
}

:root[data-theme='dark'] {
    --app-bg: hsl(216, 20%, 10%);
    --app-surface: hsl(216, 20%, 14%);
    --app-surface-muted: hsl(216, 16%, 19%);
    --app-border: rgba(255, 255, 255, 0.14);
    --app-text: hsl(220, 14%, 93%);
    --app-text-muted: rgba(255, 255, 255, 0.72);
    --app-hover: hsla(0, 0%, 100%, 0.08);
    --app-shadow: 0 0.25rem 0.4rem rgba(0, 0, 0, 0.4);
        --app-link: hsl(214, 100%, 78%);
        --app-link-hover: hsl(206, 100%, 84%);

    --editor-surface: hsl(216, 20%, 14%);
    --editor-surface-muted: hsl(216, 16%, 19%);
    --editor-surface-subtle: rgba(255, 255, 255, 0.05);
    --editor-border: rgba(255, 255, 255, 0.14);
    --editor-border-strong: rgba(255, 255, 255, 0.2);
    --editor-text: hsl(220, 14%, 93%);
    --editor-text-muted: rgba(255, 255, 255, 0.72);
    --editor-tab-hover: hsl(215, 16%, 24%);
    --editor-tab-active: hsl(215, 14%, 28%);
    --editor-tab-active-border: hsl(218, 95%, 70%);
    --editor-item-hover: hsl(216, 13%, 26%);
    --editor-item-active-bg: rgba(122, 162, 255, 0.2);
    --editor-item-active-border: rgba(122, 162, 255, 0.45);
    --editor-focus-ring: rgba(122, 162, 255, 0.75);
}

*, *::before, *::after {
    box-sizing: border-box;
    font-family: var(--font-family-base);
}

h1,
h2,
h3,
p,
label,
button,
input,
a {
  line-block-size: var(--line-block-size-normal);
}

body {
    margin: 0;
    padding: 0;
    background: var(--app-bg);
    color: var(--app-text);
}

.btn {
    display: inline-block;
    padding: 1rem 1.5rem;
    border: none;
    border-radius: 0.25rem;
    background-color: var(--clr-primary);
    color: var(--clr-background-light);
    font-size: 1rem;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 300ms ease;

    &:hover {
        background-color: var(--clr-primary-dark);
    }

    &:disabled {
        background-color: var(--clr-primary-light);
        cursor: not-allowed;
    }

    &-secondary {
        background-color: var(--clr-secondary);
        color: var(--clr-background-light);

        &:hover {
            background-color: var(--clr-secondary-dark);
        }

        &:disabled {
            background-color: var(--clr-secondary-light);
            cursor: not-allowed;
        }
    }

    &-success {
        background-color: var(--clr-success);
        color: var(--clr-background-light);

        &:hover {
            background-color: var(--clr-success-dark);
        }

        &:disabled {
            background-color: var(--clr-success-light);
            cursor: not-allowed;
        }
    }

    &-right {
        display: block;
        inline-size: fit-content;
        margin-inline-start: auto;
    }

    &-center {
        display: block;
        inline-size: fit-content;
        margin-inline: auto;
    }

    &-left {
        display: block;
        inline-size: fit-content;
        margin-inline-end: auto;
    }

    &-full {
        inline-size: 100%;
    }


}


`

export default GlobalStyles