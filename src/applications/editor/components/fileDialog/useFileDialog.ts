import { useState } from "react";

import type { FileDialogType } from "./fileDialog.types";

const useFileDialog = () => {

    /** ---------------------------------------------------------------------------------
     * State 
     ** --------------------------------------------------------------------------------- */
    const [fileDialogOpen, setFileDialogOpen] = useState(false);
    const [filename, setFilename] = useState('')
    const [searchFileName, setSearchFileName] = useState('')
    const [fileDialogType, setFileDialogType] = useState<FileDialogType>("openDocument");

    /** ---------------------------------------------------------------------------------
     * Constants
     ** --------------------------------------------------------------------------------- */
    const CLOSE_DIALOG_ACTIONS: Record<FileDialogType, () => void> = {
        newDocument: () => {
            console.log("Creating new document with filename:", filename);
        },
        openDocument: () => {
            console.log("Opening document with filename:", filename);
        },
        saveDocument: () => {
            console.log("Saving document with filename:", filename);
        },
        saveDocumentAs: () => {
            console.log("Saving document as with filename:", filename);
        },
    };

    const DIALOG_UI_ELEMENTS = {
        newDocument: 
        {
            title: "Create New Document",
            buttonLabel: "Create Document",
            inputLabel: "Enter Document Name",
            showFileTypeInput: true,
            showSearch: false,
        },
        openDocument: 
        {
            title: "Open Document",
            buttonLabel: "Open Document",
            inputLabel: "Document Name",
            showFileTypeInput: false,
            showSearch: true,
        },
        saveDocument: 
        {
            title: "Save Document",
            buttonLabel: "Save Document",
            inputLabel: "Enter Document Name",
            showFileTypeInput: false,
            showSearch: false,
        },  
        saveDocumentAs: 
        {
            title: "Save Document As",
            buttonLabel: "Save Document As",
            inputLabel: "Enter Document Name",
            showFileTypeInput: true,
            showSearch: false,
        },
    };

    
    /** ---------------------------------------------------------------------------------
     * Functions
     ** --------------------------------------------------------------------------------- */
    const openFileDialog = (type: FileDialogType) => {
        setFileDialogType(type);
        setFileDialogOpen(true);
    };

    const closeFileDialog = () => setFileDialogOpen(false);

    const toggleFileDialog = () => setFileDialogOpen((previous) => !previous);

    const processDialogclose = () => {

        
        if (!fileDialogType || !CLOSE_DIALOG_ACTIONS[fileDialogType]) {
            console.error("File dialog type is not set.");
            return;
        }

        if (!filename) {
            console.error("Filename is not set.");
            return;
        }

        const action = CLOSE_DIALOG_ACTIONS[fileDialogType];
        action();
        closeFileDialog();
    };


  return {
    fileDialogOpen,
    fileDialogType,
    openFileDialog,
    closeFileDialog,
    toggleFileDialog,
    processDialogclose,
    filename,
    setFilename,
    searchFileName,
    setSearchFileName,
    DIALOG_UI_ELEMENTS,
  };
};

export default useFileDialog;