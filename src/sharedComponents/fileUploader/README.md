# FileUploader & useFileUploader

A production-ready, accessible, and high-performance file upload component for React.

## Features

- **Headless Hook & UI Component**: Use the full `<FileUploader />` component or build custom layouts using `useFileUploader()`.
- **Async Upload API Lifecycle**: Per-file and aggregate progress bars, retry on failure, and request cancellation via `AbortController`.
- **Smart Duplicate Handling**: Supports `"keepBoth"` (auto-suffixing `file (1).png`), `"replace"`, or `"skip"`.
- **Client-Side Image Optimization**: Optional HTML Canvas downscaling and compression before uploading (e.g. shrinking 30MB camera photos to crisp <1MB web assets).
- **Memory Efficient**: Uses Object URLs (`blob:`) instead of heavy base64 data URLs with automatic garbage collection on removal, replacement, or unmount.
- **Security & Hygiene**: Client-side filename sanitization (removes path traversal `../`, illegal characters `<>:"/\|?*`, and control characters).
- **Accessible (a11y)**: Full keyboard navigation, `role="button"`, ARIA live status regions for errors and progress, and file-type visual icons.

---

## Quick Start

### 1. Basic Drop-in Component

```tsx
import { useState } from "react";
import { FileUploader, type UploaderFile } from "@/sharedComponents/fileUploader";

export const MediaUploadModal = () => {
  const [files, setFiles] = useState<UploaderFile[]>([]);

  return (
    <FileUploader
      title="Upload Documents"
      description="Drag & drop PDF or image files (max 10MB each)"
      accept={{
        "image/*": [".png", ".jpg", ".jpeg", ".webp"],
        "application/pdf": [".pdf"],
      }}
      maxSize={10 * 1024 * 1024} // 10 MB
      maxFiles={5}
      multiple={true}
      onFilesChange={setFiles}
    />
  );
};
```

---

### 2. Async Uploads with Progress & Cancellation

Provide an `uploadFile` handler and optionally enable `autoUpload`. Use
`onAllUploadsComplete` to refresh surrounding data or close a dialog after every
staged file succeeds:

```tsx
import { FileUploader } from "@/sharedComponents/fileUploader";

// Example upload function using standard fetch and XMLHttpRequest / Axios
const uploadToBackend = async (
  file: File,
  onProgress: (percentage: number) => void,
  signal: AbortSignal
): Promise<void> => {
  const formData = new FormData();
  formData.append("file", file);

  // Example with XMLHttpRequest for upload progress:
  await new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/upload");

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const pct = Math.round((event.loaded / event.total) * 100);
        onProgress(pct);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error("Network error"));
    
    // Wire up cancellation
    signal.addEventListener("abort", () => {
      xhr.abort();
      reject(new Error("Upload cancelled"));
    });

    xhr.send(formData);
  });
};

export const UploadWithProgress = () => {
  const handleAllUploadsComplete = () => {
    // For example: refetch uploaded media, then close the upload dialog.
  };

  return (
    <FileUploader
      uploadFile={uploadToBackend}
      autoUpload={true}
      showAggregateProgress={true}
      onAllUploadsComplete={handleAllUploadsComplete}
    />
  );
};
```

---

### 3. Duplicate Handling Strategy

Control what happens when a user drops a file that is already in the list:

```tsx
<FileUploader
  // Options: "keepBoth" (default) | "replace" | "skip"
  duplicateStrategy="keepBoth" 
/>
```

- `"keepBoth"`: Automatically renames duplicates (e.g., `image (1).png`, `image (2).png`) and stages both.
- `"replace"`: Replaces the existing file with the new one and revokes previous preview URLs.
- `"skip"`: Rejects the duplicate file and surfaces an error notice.

---

### 4. Client-Side Image Optimization (Canvas Resizing)

Downscale giant camera photos (e.g. 20–40MB) client-side before uploading:

```tsx
<FileUploader
  imageOptimization={{
    enabled: true,
    maxWidth: 2048,     // Max width in px (default: 2048)
    maxHeight: 2048,    // Max height in px (default: 2048)
    quality: 0.85,       // Quality ratio 0.1 - 1.0 (default: 0.85, visually lossless)
    thumbnailOnly: false // If true, only downscales UI preview; keeps upload raw
  }}
/>
```

---

### 5. Headless Hook Usage (`useFileUploader`)

For completely custom upload interfaces:

```tsx
import { useFileUploader } from "@/sharedComponents/fileUploader";

export const CustomUploader = () => {
  const {
    files,
    getRootProps,
    getInputProps,
    isDragActive,
    removeFile,
    clearFiles,
    uploadAllFiles,
    cancelUpload,
    aggregateProgress,
    error,
  } = useFileUploader({
    multiple: true,
    maxSize: 5 * 1024 * 1024,
  });

  return (
    <div>
      <div {...getRootProps()} style={{ border: "2px dashed #ccc", padding: 24 }}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop files here...</p> : <p>Drag & drop or click</p>}
      </div>

      <ul>
        {files.map((item) => (
          <li key={item.id}>
            {item.file.name} ({item.sizeLabel}) - Status: {item.status ?? "ready"}
            <button onClick={() => removeFile(item.id)}>Remove</button>
          </li>
        ))}
      </ul>

      {files.length > 0 && (
        <button onClick={uploadAllFiles}>Upload All</button>
      )}
    </div>
  );
};
```

---

## Props Reference

### `<FileUploader />`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `"Drag & drop files here"` | Main header title inside the dropzone |
| `description` | `string` | `"Drop files here or click to select files."` | Sub-text instruction |
| `accept` | `Accept` | `undefined` | Object defining accepted MIME types and extensions (e.g., `{"image/*": [".png", ".jpg"]}`) |
| `maxSize` | `number` | `undefined` | Maximum allowed file size in bytes |
| `maxFiles` | `number` | `undefined` | Maximum total number of files allowed |
| `multiple` | `boolean` | `true` | Allow multiple file selections |
| `autoUpload` | `boolean` | `false` | Automatically trigger `uploadFile` as soon as files are dropped |
| `uploadFile` | `UploadFileHandler` | `undefined` | Async upload callback `(file, onProgress, signal) => Promise<unknown>` |
| `showAggregateProgress` | `boolean` | `true` | Displays the overall progress bar when multiple files are uploading |
| `duplicateStrategy` | `"keepBoth" \| "replace" \| "skip"` | `"keepBoth"` | How duplicate drops are handled |
| `imageOptimization` | `ImageOptimizationOptions` | `undefined` | Canvas resizing and compression configuration |
| `sanitizeFilename` | `(name: string) => string` | Built-in | Custom filename sanitization function |
| `onAllUploadsComplete` | `() => void` | `undefined` | Called once after every staged file has uploaded successfully; it is not called if a file fails or is cancelled. |
| `onFilesChange` | `(files: UploaderFile[]) => void` | `undefined` | Callback fired whenever files state changes |
| `onError` | `(error: UploadError) => void` | `undefined` | Callback fired on validation or duplicate errors |
| `onDropRejected` | `(rejections: FileRejection[]) => void` | `undefined` | Callback fired when files are rejected by dropzone |

---

## Running Tests

Unit tests are located in `useFileUploader.test.ts` using Vitest:

```bash
yarn test src/sharedComponents/fileUploader
```
