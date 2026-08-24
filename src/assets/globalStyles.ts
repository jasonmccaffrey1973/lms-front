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