import { useMemo, useState } from "react";
import type { MediaKind, MediaSource } from "../types";

export type UseMediaDialogArgs = {
  initialMode: MediaKind;
  allowMultiple: boolean;
};

const useMediaDialog = ({
  initialMode,
  allowMultiple,
}: UseMediaDialogArgs) => {
  const [mode, setMode] = useState<MediaKind>(initialMode);
  const [source, setSource] = useState<MediaSource>("upload");
  const [url, setUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const accept = useMemo(
    () => (mode === "image" ? "image/*" : "video/*"),
    [mode],
  );

  const fileLabel = useMemo(() => {
    if (!files.length) {
      return "No file selected";
    }

    if (files.length === 1) {
      return files[0].name;
    }

    return `${files.length} files selected`;
  }, [files]);

  const onFileChange = (selectedFileList: FileList | null) => {
    if (!selectedFileList) {
      setFiles([]);
      return;
    }

    const nextFiles = Array.from(selectedFileList);
    setFiles(allowMultiple ? nextFiles : nextFiles.slice(0, 1));
  };

  return {
    mode,
    setMode,
    source,
    setSource,
    url,
    setUrl,
    altText,
    setAltText,
    files,
    setFiles,
    error,
    setError,
    isSubmitting,
    setIsSubmitting,
    accept,
    fileLabel,
    onFileChange,
  };
};

export default useMediaDialog;
