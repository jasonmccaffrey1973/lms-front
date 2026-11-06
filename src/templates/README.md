# Page template

`PageTemplate` provides the shared application shell: the header, left navigation, page content, optional right sidebar, and footer. It is intended to wrap route content so each page gets the same layout.

## Basic use

Use it around the route outlet in the application router. Pass page content as children when you want to render a specific view directly; otherwise the template renders React Router's `<Outlet />`.

```tsx
import { Outlet } from "react-router-dom"
import PageTemplate from "./templates/PageTemplate"

function AppLayout() {
  return (
    <PageTemplate>
      <Outlet />
    </PageTemplate>
  )
}
```

The existing router uses the same pattern in `src/main.tsx`.

## Add a right sidebar

Pass the sidebar UI through the optional `rightSideBarComponent` prop. It accepts any `React.ReactNode`, so it can be a component, an element, or a fragment. The header shows its right-sidebar toggle only when this prop is provided.

```tsx
function PageTools() {
  return (
    <aside aria-label="Page tools">
      <h2>Page tools</h2>
      <button type="button">Add item</button>
    </aside>
  )
}

function AppLayout() {
  return (
    <PageTemplate rightSideBarComponent={<PageTools />}>
      <section>{/* Route or page content */}</section>
    </PageTemplate>
  )
}
```

The right panel is placed at the right edge of the main content area, scrolls vertically when needed, and has a minimum width of `20rem` and maximum width of `90vw`. The header button's accessible label and `aria-expanded` value follow the open state.

## Notes

- The prop name is `rightSideBarComponent` (capital "B" in "Bar"); use that exact spelling.
- Omitting the prop leaves the right sidebar and its header button out of the page. Passing `null` still counts as providing the prop, so pass nothing when no sidebar is needed.
- The left navigation has its own menu button, shown at viewport widths of `1400px` or less.
- The current right-sidebar wrapper receives `aria-hidden` as its toggle state changes, but the styles do not yet visually hide or reveal it. Add matching styles for `[aria-hidden="true"]` and `[aria-hidden="false"]` in `PageTemplate.styles.ts` if the toggle should animate or conceal the panel.

## Related files

- `PageTemplate.tsx` - shell markup, optional sidebar slot, and header wiring.
- `PageTemplate.styles.ts` - responsive layout and sidebar sizing/position.
- `usePageTemplate.ts` - local open/close state for both sidebars.
