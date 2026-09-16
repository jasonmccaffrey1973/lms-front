# Button Component Usage Instructions

## Overview

The **Button** component is a reusable UI element built with React, TypeScript, and Styled Components. It provides consistent styling with semantic color variants, smooth transitions, and accessibility support.

### 📁 File Structure

```text
src/sharedComponents/Button/

├── Button.tsx          # Main React component (entry point)
├── Button.styles.ts    # Styled Components definition & CSS-in-JS
├── Button.types.ts     # TypeScript type definitions
└── useButton.ts        # Custom hook for state management (if applicable)
```

---

## 1. Installation & Setup

### Prerequisites

```bash
npm install styled-components react react-dom

# or

yarn add styled-components react react-dom
```

### Import Statements

```tsx
// Default import with named export
import Button, { ButtonProps } from './src/sharedComponents/Button';

// Or ES module default import
import Button from './src/sharedComponents/Button';
```

---

## 2. Props Reference

| Prop                            | Type              | Description                                                               |
| ------------------------------- | ----------------- | ------------------------------------------------------------------------- |
| `$color`                        | `VariantColor`    | Semantic color variant                                                    |
| `$textColor`                    | `string`          | Override text color                                                       |
| `action`                        | `() => void`      | Click handler (alternative to `onClick`)                                  |
| `children`                      | `React.ReactNode` | Button content, including text and icons                                  |
| Standard HTML button attributes | —                 | Native button props such as `disabled`, `type`, `aria-*`, and `className` |

---

## 3. Color Variants

The component uses semantic color naming with built-in theming through a `COLOR_MAP`.

### Variant Definitions

```tsx
export type VariantColor =
  | "primary"
  | "danger"
  | "success"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "transparent"
  | (string & {});
```

The `(string & {})` type allows arbitrary strings for custom color values while preserving autocomplete for the predefined variants.

### Color Mapping Table

| Variant       | Background          | Text Color | Use Case              |
| ------------- | ------------------- | ---------- | --------------------- |
| `primary`     | `hsl(210 100% 45%)` | White      | Main actions          |
| `danger`      | `hsl(0 100% 40%)`   | White      | Delete/remove actions |
| `success`     | `hsl(120 100% 30%)` | White      | Confirm/save actions  |
| `warning`     | `hsl(45 100% 50%)`  | Black      | Caution               |
| `info`        | `hsl(200 100% 50%)` | White      | Informational actions |
| `light`       | `hsl(0 0% 95%)`     | Dark       | Subtle actions        |
| `dark`        | `hsl(0 0% 20%)`     | White      | High contrast         |
| `transparent` | Transparent         | Inherited  | Ghost buttons         |

### Usage Examples

```tsx
// Semantic variants - recommended for consistency

<Button $color="primary">Primary Action</Button>

<Button $color="danger">Delete Item</Button>

<Button $color="success">Save Changes</Button>

<Button $color="warning">Review</Button>

// Custom colors

<Button $color="#ff5722">Custom Orange</Button>

<Button $color="var(--brand-color)">Themed</Button>
```

> **Note:** Use `$color` consistently for both semantic variants and custom color values. The `$` prefix prevents the prop from being forwarded to the underlying HTML button element.

---

## 4. TypeScript Types

### Button Props Type

The following types are defined in `Button.types.ts`:

```typescript
import type React from "react";

export type VariantColor =
  | "primary"
  | "danger"
  | "success"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "transparent"
  | (string & {});

export type StyledButtonProps = {
  $color?: VariantColor;
  $textColor?: string;
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  $color?: VariantColor;
  $textColor?: string;
  action?: () => void;
};
```

### Type Usage Example

```tsx
import type { ButtonProps } from "./Button.types";

function MyComponent() {
  const validProps: ButtonProps = {
    children: "Click me",
    onClick: (event) => console.log(event),
    $color: "primary",
    className: "custom-class",
    disabled: false,
  };

  return <Button {...validProps} />;
}
```

TypeScript will validate the supported properties at compile time.

---

## 5. Styled Components Integration

### Styled Button Definition

The styles use CSS custom properties for theming and smooth transitions.

```tsx
import styled from "styled-components";
import type { StyledButtonProps } from "./Button.types";

const COLOR_MAP: Record<string, { base: string; text: string }> = {
  primary: {
    base: "hsl(210 100% 45% / 1)",
    text: "hsl(0 0% 100% / 1)",
  },
  danger: {
    base: "hsl(0 100% 40% / 1)",
    text: "hsl(0 0% 100% / 1)",
  },
  success: {
    base: "hsl(120 100% 30% / 1)",
    text: "hsl(0 0% 100% / 1)",
  },
  warning: {
    base: "hsl(45 100% 50% / 1)",
    text: "hsl(0 0% 0% / 1)",
  },
  info: {
    base: "hsl(200 100% 50% / 1)",
    text: "hsl(0 0% 100% / 1)",
  },
  light: {
    base: "hsl(0 0% 95% / 1)",
    text: "hsl(0 0% 20% / 1)",
  },
  dark: {
    base: "hsl(0 0% 20% / 1)",
    text: "hsl(0 0% 100% / 1)",
  },
  transparent: {
    base: "transparent",
    text: "currentColor",
  },
};

const StyledButton = styled.button<StyledButtonProps>`
  --_button-background: ${({ $color }) =>
    COLOR_MAP[$color ?? "primary"]?.base ?? $color ?? COLOR_MAP.primary.base};

  --_button-text: ${({ $textColor, $color }) =>
    $textColor ??
    COLOR_MAP[$color ?? "primary"]?.text ??
    "currentColor"};

  display: grid;
  place-items: center;

  background-color: var(--_button-background);
  color: var(--_button-text);

  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;

  cursor: pointer;

  transition:
    background-color 250ms ease-in-out,
    transform 125ms ease,
    box-shadow 250ms ease-in-out;

  &:hover:not(:disabled) {
    background-color: color-mix(
      in srgb,
      var(--_button-background),
      black 15%
    );
  }

  &:active:not(:disabled) {
    background-color: color-mix(
      in srgb,
      var(--_button-background),
      black 25%
    );

    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid transparent;

    box-shadow:
      0 0 0 2px var(--_button-text),
      0 0 0 4px var(--_button-background);
  }

  &:disabled {
    background-color: hsl(0 0% 75% / 1);
    color: hsl(0 0% 45% / 1);
    cursor: not-allowed;
  }
`;

export default StyledButton;
```

### Key Styling Features

| Feature                   | Implementation                                                       |
| ------------------------- | -------------------------------------------------------------------- |
| **CSS custom properties** | `--_button-background` and `--_button-text` provide flexible theming |
| **Color mixing**          | `color-mix()` darkens the button during hover and active states      |
| **Scale animation**       | Active state scales the button to 97%                                |
| **Focus accessibility**   | High-contrast focus ring using `box-shadow`                          |
| **Disabled state**        | Changes colors and cursor to communicate disabled state              |

---

## 6. Usage Examples

### Basic Usage

```tsx
import Button from "./src/sharedComponents/Button";

// Simple button with semantic color
<Button $color="primary">Submit Form</Button>;
```

### Using the `action` Prop

```tsx
function MyForm() {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <input name="email" placeholder="Email..." />

      <Button
        $color="primary"
        action={() => {
          console.log("Action executed");
        }}
      >
        Send Email
      </Button>
    </form>
  );
}
```

### Using the Standard `onClick` Handler

```tsx
<Button
  $color="danger"
  onClick={(event) => {
    event.preventDefault();
    console.log("Delete clicked");
  }}
>
  Delete Item
</Button>
```

### With Icons and Content

```tsx
import React from "react";

function ActionMenu() {
  return (
    <div className="button-group">
      {/* Icon-only button */}
      <Button $color="light" aria-label="Settings">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 8c-2.2 0-4 1.8-4 4v2h8v-2c0-2.2-1.8-4-4-4zm7-2c-1.1 0-2 .9-2 2v3h5V7c0-1.1-.9-2-2-2zm-14 2c-1.1 0-2 .9-2 2v8h5V7c0-1.1-.9-2-2-2zm16.9 9l-1.41-1.41L15 14.17V10l3.59-3.59L18 6.83 14.41 10H19v5z" />
        </svg>
        Settings
      </Button>

      {/* Full-width button */}
      <Button $color="primary">
        Export Report
        <span aria-hidden="true">⬇️</span>
      </Button>
    </div>
  );
}
```

---

## 7. Accessibility Features

### ARIA and Keyboard Navigation

The component is based on the native HTML `<button>` element, so standard keyboard and accessibility behavior is preserved.

```tsx
<Button
  $color="primary"
  aria-label="Download CSV file"
  aria-describedby="download-description"
>
  Download CSV
</Button>
```

Native button behavior provides:

* Keyboard focus through the Tab key.
* Activation through Enter and Space.
* Support for `disabled`.
* Support for standard ARIA attributes.
* Integration with assistive technologies.

### Focus Styling

The component provides a visible focus indicator for keyboard navigation:

```css
&:focus-visible {
  outline: 2px solid transparent;

  box-shadow:
    0 0 0 2px var(--_button-text),
    0 0 0 4px var(--_button-background);
}
```

For icon-only buttons, always provide an accessible name using `aria-label` or visible text.

---

## 8. Migration Guide

### Before

```tsx
import styled from "styled-components";

const Button = styled.button`
  background: #007bff;
  color: white;
`;
```

### After

```tsx
import Button from "./src/sharedComponents/Button";

<Button $color="primary">Primary Action</Button>;
```

### Custom Styling

If additional styling is required, the component can be extended with `styled-components`:

```tsx
import styled from "styled-components";
import Button from "./src/sharedComponents/Button";

const CustomButton = styled(Button)`
  padding: 1rem 2rem;
  font-size: 1.25rem;
`;
```

---

## 9. Performance Considerations

| Feature                   | Implementation                                                     |
| ------------------------- | ------------------------------------------------------------------ |
| **CSS custom properties** | Color values are exposed through CSS variables                     |
| **Transitions**           | Transitions are limited to visual properties used by the component |
| **Transform animation**   | The active-state scale uses CSS transforms                         |
| **Event handlers**        | Uses the standard React event system                               |

The component does not introduce additional state or event-management overhead unless the optional `action` behavior is implemented by the component.

---

## 10. Troubleshooting

### Issue: Colors Are Not Applying Correctly

Check that the `$color` prop is being used:

```tsx
<Button $color="primary">Primary</Button>
```

Custom colors should contain valid CSS color values:

```tsx
<Button $color="#ff5722">Custom Orange</Button>

<Button $color="var(--custom-color)">Custom Variable</Button>
```

Invalid CSS values will not produce a valid button background.

### Issue: TypeScript Errors with `$color`

Make sure the component's exported `ButtonProps` type includes `$color`:

```tsx
import type { ButtonProps } from "./Button.types";
```

Correct usage:

```tsx
<Button $color="primary">Click</Button>
```

### Issue: Styled Components Is Not Working

Make sure `styled-components` is installed:

```bash
npm install styled-components
```

or:

```bash
yarn add styled-components
```

You do **not** normally need to import `styled-components` globally in `main.tsx` or `index.tsx`. Import it where styled components are defined.

---

## API Reference Summary

| Property     | Type                                         | Description                     |
| ------------ | -------------------------------------------- | ------------------------------- |
| `$color`     | `VariantColor`                               | Semantic or custom button color |
| `$textColor` | `string`                                     | Optional text-color override    |
| `action`     | `() => void`                                 | Optional action handler         |
| `children`   | `React.ReactNode`                            | Button content                  |
| `onClick`    | `React.MouseEventHandler<HTMLButtonElement>` | Standard React click handler    |
| `disabled`   | `boolean`                                    | Disables the button             |
| `type`       | `"button" \| "submit" \| "reset"`            | Native button type              |
| `className`  | `string`                                     | CSS/styled-components class     |
| `aria-*`     | Standard ARIA attributes                     | Accessibility attributes        |

### Available Color Variants

* `primary`
* `danger`
* `success`
* `warning`
* `info`
* `light`
* `dark`
* `transparent`
* Custom CSS color values

---

## Notes

This documentation should be kept synchronized with the actual implementation in:

* `Button.tsx`
* `Button.styles.ts`
* `Button.types.ts`
* `useButton.ts`

If the component API changes, update this document at the same time.
