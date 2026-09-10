import Button from "../../../sharedComponents/Button/Button";
import type { MediaKind } from "../types";
import useMediaDialog from "./useMediaDialog";
import {
  StyledMediaDialog,
  StyledMediaDialogOverlay,
} from "./MediaDialog.styles";

type MediaDialogProps = {
  open: boolean;
  initialMode: MediaKind;
  allowMultiple?: boolean;
  title?: string;
  onClose: () => void;
  onUpload: (payload: {
    mode: MediaKind;
    files: File[];
    altText: string;
  }) => Promise<void> | void;
  onUrlSubmit: (payload: {
    mode: MediaKind;
    url: string;
    altText: string;
  }) => Promise<void> | void;
};

const MediaDialog = ({
  open,
  initialMode,
  allowMultiple = false,
  title = "Insert Media",
  onClose,
  onUpload,
  onUrlSubmit,
}: MediaDialogProps) => {
  const {
    mode,
    setMode,
    source,
    setSource,
    url,
    setUrl,
    altText,
    setAltText,
    files,
    error,
    setError,
    isSubmitting,
    setIsSubmitting,
    accept,
    fileLabel,
    onFileChange,
  } = useMediaDialog({
    initialMode,
    allowMultiple,
  });

  if (!open) {
    return null;
  }

  const handleSubmit = async () => {
    setError("");

    if (source === "upload") {
      if (!files.length) {
        setError("Please choose at least one file.");
        return;
      }

      try {
        setIsSubmitting(true);
        await onUpload({ mode, files, altText: altText.trim() });
        onClose();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to upload media.");
      } finally {
        setIsSubmitting(false);
      }

      return;
    }

    if (!url.trim()) {
      setError("Please provide a media URL.");
      return;
    }

    try {
      setIsSubmitting(true);
      await onUrlSubmit({ mode, url: url.trim(), altText: altText.trim() });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to add media URL.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StyledMediaDialogOverlay role="presentation" onMouseDown={onClose}>
      <StyledMediaDialog
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="dialog-header">
          <h2>{title}</h2>
          <Button color="secondary" onClick={onClose} aria-label="Close media dialog">
            Close
          </Button>
        </div>

        <p className="helper">
          Temporary storage is local to your browser for now. Media can be managed later in Media Manager.
        </p>

        <div className="mode-row" aria-label="Media type">
          <Button
            color={mode === "image" ? "primary" : "secondary"}
            onClick={() => setMode("image")}
          >
            Image
          </Button>
          <Button
            color={mode === "video" ? "primary" : "secondary"}
            onClick={() => setMode("video")}
          >
            Video
          </Button>
        </div>

        <div className="source-row" aria-label="Media source">
          <Button
            color={source === "upload" ? "primary" : "secondary"}
            onClick={() => setSource("upload")}
          >
            Upload
          </Button>
          <Button
            color={source === "url" ? "primary" : "secondary"}
            onClick={() => setSource("url")}
          >
            URL
          </Button>
        </div>

        {source === "upload" ? (
          <div className="field">
            <label htmlFor="media-upload-input">Choose file</label>
            <input
              id="media-upload-input"
              type="file"
              accept={accept}
              multiple={allowMultiple}
              onChange={(event) => onFileChange(event.target.files)}
            />
            <div className="file-label">{fileLabel}</div>
          </div>
        ) : (
          <div className="field">
            <label htmlFor="media-url-input">Media URL</label>
            <input
              id="media-url-input"
              type="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://example.com/media"
            />
          </div>
        )}

        <div className="field">
          <label htmlFor="media-alt-input">Alt Text / Label (optional)</label>
          <input
            id="media-alt-input"
            type="text"
            value={altText}
            onChange={(event) => setAltText(event.target.value)}
            placeholder={mode === "image" ? "Describe the image" : "Video label"}
          />
        </div>

        {error ? <div className="error">{error}</div> : null}

        <div className="actions">
          <Button color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={() => void handleSubmit()} disabled={isSubmitting}>
            {isSubmitting ? "Working..." : source === "upload" ? "Upload" : "Add URL"}
          </Button>
        </div>
      </StyledMediaDialog>
    </StyledMediaDialogOverlay>
  );
};

export type { MediaDialogProps };
export default MediaDialog;
