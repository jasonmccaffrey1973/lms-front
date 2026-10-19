import { useRef, useState } from "react";
import type { FileDialogDocumentItem, FileDialogType } from "./fileDialog.types";
import useDialog from "../../../../sharedComponents/dialog/useDialog";

type FileDialogAction = (filename: string) => void | Promise<void>;

type FileDialogActions = Partial<Record<FileDialogType, FileDialogAction>>;

const useFileDialog = (
  actions: FileDialogActions = {},
  documents: FileDialogDocumentItem[] = [],
) => {
  const dialogRef = useRef<HTMLDialogElement>(null!);
  const dialogControls = useDialog({ ref: dialogRef });

  const [filename, setFilenameState] = useState("");
  const [searchFileName, setSearchFileName] = useState("");
  const [fileDialogType, setFileDialogType] = useState<FileDialogType>("openDocument");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const CLOSE_DIALOG_ACTIONS: Record<FileDialogType, FileDialogAction> = {
    newDocument: actions.newDocument ?? (() => undefined),
    openDocument: actions.openDocument ?? (() => undefined),
    saveDocument: actions.saveDocument ?? (() => undefined),
    saveDocumentAs: actions.saveDocumentAs ?? (() => undefined),
  };

  const DIALOG_UI_ELEMENTS = {
    newDocument: {
      title: "Create New Document",
      buttonLabel: "Create Document",
      inputLabel: "Enter Document Name",
      showFileTypeInput: true,
      showSearch: false,
    },
    openDocument: {
      title: "Open Document",
      buttonLabel: "Open Document",
      inputLabel: "Document Name",
      showFileTypeInput: false,
      showSearch: true,
    },
    saveDocument: {
      title: "Save Document",
      buttonLabel: "Save Document",
      inputLabel: "Enter Document Name",
      showFileTypeInput: false,
      showSearch: false,
    },
    saveDocumentAs: {
      title: "Save Document As",
      buttonLabel: "Save Document As",
      inputLabel: "Enter Document Name",
      showFileTypeInput: true,
      showSearch: false,
    },
  };

  const setFilename = (value: string) => {
    setFilenameState(value);
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const openFileDialog = (type: FileDialogType) => {
    setFileDialogType(type);
    setErrorMessage(null);
    dialogControls.openDialog();
  };

  const closeFileDialog = () => {
    setErrorMessage(null);
    dialogControls.closeDialog();
  };

  const processDialogclose = async () => {
    if (!fileDialogType || !CLOSE_DIALOG_ACTIONS[fileDialogType]) {
      console.error("File dialog type is not set.");
      return;
    }

    const trimmed = filename.trim();
    if (!trimmed) {
      setErrorMessage("Please enter a document name.");
      return;
    }

    // Verify duplicate document name for Save As
    if (fileDialogType === "saveDocumentAs") {
      const isDuplicate = documents.some(
        (doc) => doc.title.trim().toLowerCase() === trimmed.toLowerCase(),
      );
      if (isDuplicate) {
        setErrorMessage(`A document with the name "${trimmed}" already exists.`);
        return;
      }
    }

    try {
      const action = CLOSE_DIALOG_ACTIONS[fileDialogType];
      await action(trimmed);
      setErrorMessage(null);
      closeFileDialog();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to process document action.";
      setErrorMessage(message);
    }
  };

  return {
    dialogRef,
    dialogControls,
    fileDialogOpen: dialogControls.isDialogOpen,
    fileDialogType,
    openFileDialog,
    closeFileDialog,
    processDialogclose,
    filename,
    setFilename,
    searchFileName,
    setSearchFileName,
    errorMessage,
    setErrorMessage,
    DIALOG_UI_ELEMENTS,
  };
};

export default useFileDialog;