# Login Application - Project Documentation

## Overview

This is a modern React + TypeScript authentication application built with Vite and styled-components. It provides login, registration, password recovery, and dashboard functionality with persistent session management via JWT tokens.

---

## Tech Stack

- **React 19** (latest)
- **TypeScript** - Full type safety
- **Vite** - Fast build tooling and dev server
- **styled-components** - CSS-in-JS styling
- **react-router-dom v7** - Client-side routing with protected routes
- **ESLint** - Code quality enforcement

---

## Project Structure

```
src/
├── main.tsx                    # App entry point
├── routes.tsx                  # Protected route configuration
├── assets/
│   ├── globalStyles.ts         # CSS variables and reset styles
│   └── images/
│       └── logo.svg            # Brand logo
├── auth/
│   ├── AuthContext.tsx         # Authentication context provider
│   ├── AuthProvider.tsx        # Context wrapper component
│   └── UseAuth.ts              # Custom hook for auth state
├── pages/
│   ├── login/
│   │   ├── Login.tsx           # Main login page component
│   │   ├── useLogin.ts         # Form logic and validation
│   │   └── Login.styles.ts     # Styled-components definitions
│   └── dashboard/
│       ├── Dashboard.tsx       # Protected dashboard view
│       ├── useDashboard.ts     # Dashboard-specific hooks
│       └── Dashboard.styles.ts # Dashboard styles
├── sharedComponents/
│   ├── Footer.tsx              # Page footer component
│   ├── Header.tsx              # Navigation header with logo
│   ├── Logo.tsx                # SVG brand logo (color customizable)
│   ├── Navigation.tsx         # Main navigation menu
│   └── Render.tsx             # Conditional rendering helper
└── templates/
    └── PageTemplate.tsx        # Layout wrapper for pages
```

---

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Modern web browser with ES modules support

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

**Note:** Yarn is recommended over npm for faster installs and better dependency resolution. Use `yarn install` instead of `npm install`.

The app will be available at `http://localhost:5173` (or configured port).

### Build for Production

```bash
npm run build
```

Output is written to the `dist/` directory. Serve with Vite preview or any static host.

---

## Authentication Flow

### Session Management

- **Token Storage**: JWT stored in `localStorage` under key `auth_token`
- **Auto-recovery**: On app load, token is read from localStorage and session restored
- **Persistence**: Tokens are persisted across reloads by default; can be cleared via logout

### Protected Routes

The [`routes.tsx`](src/routes.tsx) file defines the application routing:

| Route | Component | Access |
|-------|-----------|--------|
| `/` | Redirect to dashboard or login based on auth state | Auto-redirect |
| `/login` | Login page | Public |
| `/forgot-password` | Password recovery form | Public |
| `/register` | Account creation form | Public |
| `/dashboard` | Dashboard | Protected (requires token) |
| `*` | Redirect to login | Catch-all |

### Auth Context API

[`AuthContext`](src/auth/AuthContext.tsx) provides these values:

```typescript
interface AuthContextValue {
  token: string | null;           // Current JWT or null
  isAuthenticated: boolean;       // Derived from token presence
  setToken: (t: string | null, persist?: boolean) => void;
  logout: () => void;             // Clears token and localStorage
}
```

---

## Component Architecture

### Logo (`src/sharedComponents/logo/Logo.tsx`)

SVG-based brand logo with separate styling for the graphical mark and text. The component uses CSS variables `--_imageColor` and `--_textColor` which can be customized via props:

```tsx
<Logo imageColor="#3b82f6" textColor="#1e40af" />
```

### Header (`src/sharedComponents/header/Header.tsx`)

Top navigation bar containing the logo, main menu links, and user actions (logout button). Styled with responsive breakpoints.

### Navigation (`src/sharedComponents/navigation/Navigation.tsx`)

Horizontal menu component used within the header. Exports individual link components for reuse elsewhere.

### Footer (`src/sharedComponents/Footer.tsx`)

Simple footer with copyright text and social links placeholder.

### Render Helper (`src/sharedComponents/Render.tsx`)

A lightweight conditional rendering utility:

```tsx
<Render if={condition}>
  {/* rendered when condition is truthy */}
</Render>
```

---

## Styling Approach

All UI styling uses **styled-components** with CSS variables defined in [`globalStyles.ts`](src/assets/globalStyles.ts). This enables:

- Theme switching (light/dark mode) via variable overrides
- Consistent design system across components
- Easy customization without touching raw CSS

Example usage:

```tsx
const StyledButton = styled.button`
  background-color: var(--_primary);
  color: var(--_text-light);
  padding: 0.75rem 1.25rem;
  border-radius: 4px;
`;
```

---

## API Integration

The app proxies GraphQL requests to a backend server running on `http://localhost:8000`. Configure in [`vite.config.ts`](vite.config.ts):

```typescript
server: {
  proxy: {
    '/graphql': {
      target: 'http://localhost:8000',
      changeOrigin: true,
      ws: true,
    },
  },
}
```

### Auth Endpoints (assumed)

- `POST /auth/login` - Login with credentials
- `POST /auth/register` - Create new account
- `POST /auth/forgot-password` - Request password reset email
- `GET /auth/me` - Get current user info

---

## Development Workflow

1. **Start dev server**: `npm run dev`
2. **Lint on save** (configured ESLint)
3. **Type-checking**: TypeScript errors shown inline
4. **Hot reload**: Changes reflected instantly in browser

### Build & Preview

```bash
npm run build    # Production bundle
npm run preview  # Serve dist/ locally
```

---

## Customization Guide

### Changing Colors

Edit [`globalStyles.ts`](src/assets/globalStyles.ts) to modify CSS variables:

```css
:root {
  --_primary: #3b82f6;
  --_text-light: #ffffff;
}
```

### Adding New Pages

1. Create file in `src/pages/` (e.g., `settings/Settings.tsx`)
2. Add route entry in [`routes.tsx`](src/routes.tsx)
3. Wrap with `<PageTemplate>` for consistent layout

---

## Testing

Run the test suite:

```bash
npm run test
```

(Tests are configured but not yet written.)

---

## License

MIT
