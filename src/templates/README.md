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

## Set the right sidebar from a page

`PageTemplate` owns the sidebar state and provides `PageTemplateContext` around the route content. A route reads that context through `useRightSidebar`; it does not need to pass sidebar content through `main.tsx` or the route tree. The hook returns `setRightSidebarContent`, which accepts a React node or `null`.

- Setting a React node displays it in the right panel and makes the Header toggle available.
- Setting a different React node replaces the panel content and keeps its current open/closed state.
- Setting `null` removes the panel, hides the Header toggle, and closes the panel.
- Calling `useRightSidebar` outside `PageTemplate` throws an error.

### Register page tools and update them dynamically

For a route-specific panel, register the content in an effect and clear it when the page unmounts. When the page's state changes what the panel displays, call the setter again with the updated React element.

```tsx
// Example path: src/pages/dashboard/Dashboard.tsx
import { useEffect, useState } from "react"
import useRightSidebar from "../../templates/useRightSidebar"

function DashboardTools({ section }: { section: string }) {
  return (
    <aside aria-label="Dashboard tools">
      <h2>{section} tools</h2>
      <button type="button">Add to {section}</button>
    </aside>
  )
}

export default function Dashboard() {
  const { setRightSidebarContent } = useRightSidebar()
  const [section, setSection] = useState("overview")

  useEffect(() => {
    setRightSidebarContent(<DashboardTools section={section} />)
  }, [section, setRightSidebarContent])

  useEffect(() => {
    return () => setRightSidebarContent(null)
  }, [setRightSidebarContent])

  return (
    <section>
      <h1>Dashboard</h1>
      <button type="button" onClick={() => setSection("reports")}>
        Show report tools
      </button>
    </section>
  )
}
```

The example uses two effects deliberately: updating `section` replaces the panel content without clearing it first, while the cleanup effect only removes the panel when the route unmounts. The Header toggle opens and closes the panel. It is positioned at the right edge of the main content area, scrolls vertically when needed, and has a minimum width of `20rem` and maximum width of `90vw`.

### Clear the sidebar early

Call the setter with `null` from an event handler when the panel should disappear before the page unmounts:

```tsx
<button type="button" onClick={() => setRightSidebarContent(null)}>
  Close tools
</button>
```

The `useRightSidebar` hook must always be called at the top level of a component; do not call it inside an event handler or condition.

## Notes

- The left navigation has its own menu button, shown at viewport widths of `1400px` or less.

## Related files

- `PageTemplate.tsx` - shell markup, sidebar display, and header wiring.
- `PageTemplate.styles.ts` - responsive layout and sidebar sizing/position.
- `useRightSidebar.ts` - hook for setting and clearing route-owned sidebar content.
