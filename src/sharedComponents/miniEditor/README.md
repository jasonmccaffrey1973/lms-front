# MiniEditor

`MiniEditor` is a controlled Tiptap editor with the Editor application's Home
toolbar. It emits HTML through `onChange`; render that value in a textarea (or
another HTML-aware field) in the parent component.

## Basic usage

```tsx
import { useState } from "react";
import MiniEditor from "./MiniEditor";

const LessonNotes = () => {
  const [html, setHtml] = useState("<p>Write something...</p>");

  return (
    <>
      <MiniEditor value={html} onChange={setHtml} />
      <label htmlFor="lesson-notes-html">HTML value</label>
      <textarea
        id="lesson-notes-html"
        value={html}
        onChange={(event) => setHtml(event.target.value)}
        rows={8}
      />
    </>
  );
};

export default LessonNotes;
```

The textarea remains owned by the parent. Editing in MiniEditor updates its
value through `onChange`, and editing the textarea updates MiniEditor through
`value`.

## Props

| Prop | Type | Description |
| --- | --- | --- |
| `label` | `string` | Optional visible label, also used as the editable surface's accessible name. |
| `labelPlacement` | `"top" \| "start"` | Label placement. Defaults to `top`; use `start` to put it in a left column. |
| `value` | `string` | Controlled HTML document value. Pass an empty string for a blank document. |
| `onChange` | `(html: string) => void` | Receives the document HTML after edits in MiniEditor. |
| `height` | `CSSProperties["height"]` | Optional editable-surface height. Defaults to `240px`. |

Example with a custom editor height:

```tsx
<MiniEditor value={html} onChange={setHtml} height="360px" />
```

`value` and `onChange` are required. Keep the parent's value state in sync when
the textarea changes so both controls show the same document.
