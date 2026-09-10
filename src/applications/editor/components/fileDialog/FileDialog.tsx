import Button from "../../../../sharedComponents/Button/Button";
import SVGIcon from "../../../../sharedComponents/SVG/SVGIcon";
import Render from "../../../../sharedComponents/Render";
import { StyledFileDialog } from "./FileDialog.styles";
import type { FileDialogDocumentItem, FileDialogProps } from "./fileDialog.types";
import { useEffect } from "react";
import friendlyDateTime from "../../../../helperFunctions/formatDateTime";

/** ====================================================================================
 * FileDialog Component
 ** ==================================================================================== */

/** -----------------------------------------------------------------------------------
 * FileDialog Component
 * 
 * @param type - The type of file dialog (e.g., "openDocument", "saveDocument", etc.)
 * @param open - Boolean indicating whether the dialog is open
 * @param onClose - Function to call when the dialog is closed
 * 
 * description - This component renders the file dialog, including the header, main content,
 * and footer. It uses the useFileDialog hook to manage the state and behavior of the dialog.
 * 
 * @returns JSX.Element
 ** ----------------------------------------------------------------------------------- */
const DIALOG_UI_ELEMENTS = {
    newDocument:
    {
        title: "Create New Document",
        buttonLabel: "Create Document",
        inputLabel: "Enter Document Name",
        showFileTypeInput: true,
        showSearch: false,
        showDocumentMeta: false,
    },
    openDocument:
    {
        title: "Open Document",
        buttonLabel: "Open Document",
        inputLabel: "Document Name",
        showFileTypeInput: false,
        showSearch: true,
        showDocumentMeta: true,
    },
    saveDocument:
    {
        title: "Save Document",
        buttonLabel: "Save Document",
        inputLabel: "Enter Document Name",
        showFileTypeInput: false,
        showSearch: false,
        showDocumentMeta: false,
    },
    saveDocumentAs:
    {
        title: "Save Document As",
        buttonLabel: "Save Document As",
        inputLabel: "Enter Document Name",
        showFileTypeInput: true,
        showSearch: false,
        showDocumentMeta: false,
    },
};
/** -----------------------------------------------------------------------------------
 * Dialog Header
 * 
 * @param title - The title of the dialog
 * @param onClose - Function to call when the close button is clicked
 * 
 * description - This component renders the header of the file dialog, 
 * including the title and a close button.
 * 
 * @returns JSX.Element
 ** ----------------------------------------------------------------------------------- */
const DialogHeader = ({ title, onClose }: { title: string; onClose: () => void }) => {
    return (
        <div className="dialog-header">
          <h2 className="title">{title}</h2>
          <span className="close-button" onClick={onClose}>
            <Button color="danger" textColor="white" aria-label="Close File Dialog">
                <SVGIcon icon="close" />
            </Button>
          </span>
        </div>
    );
};

/** -----------------------------------------------------------------------------------
 * Dialog Footer
 * 
 * @param onClose - Function to call when the cancel button is clicked
 * @param onConfirm - Function to call when the confirm button is clicked
 * @param confirmLabel - The label for the confirm button
 * 
 * description - This component renders the footer of the file dialog,
 * including the cancel and confirm buttons.
 * 
 * @returns JSX.Element
 ** ----------------------------------------------------------------------------------- */
const DialogFooter = ({ onClose, onConfirm, confirmLabel }: { onClose: () => void; onConfirm: () => void; confirmLabel: string }) => {
    return (        
        <div className="dialog-footer">
            <Button color="danger" type="button" onClick={onClose}>Cancel</Button>
            <Button color="success" type="button" onClick={onConfirm}>{confirmLabel}</Button>
        </div>
    );
}

/** -----------------------------------------------------------------------------------
 * Dialog Left Column
 * 
 * @param showSearch - Boolean indicating whether to show the search input
 * 
 * description - This component renders the left column of the file dialog,
 * including the search input (if enabled) and the file list.
 * 
 * @returns JSX.Element
 ** ----------------------------------------------------------------------------------- */
const DialogLeftColumn = ({
        showSearch,
        searchFileName,
        setSearchFileName,
        documents,
        selectedDocumentId,
        onSelectDocument,
}: {
        showSearch: boolean;
        searchFileName: string;
        setSearchFileName: (value: string) => void;
        documents: FileDialogDocumentItem[];
        selectedDocumentId?: string | null;
        onSelectDocument?: (document: FileDialogDocumentItem) => void;
}) => {
        const normalizedSearch = searchFileName.trim().toLowerCase();
        const filteredDocuments = normalizedSearch
            ? documents.filter((document) => document.title.toLowerCase().includes(normalizedSearch))
            : documents;

    return (
        <div className="main-left">
            <Render if={showSearch}>
                <div className="search-wrapper">
                    <label htmlFor="search" className="search-label">Search Files</label>
                    <input type="search" name="search" id="search" className="search-input" placeholder="Enter Filename..." value={searchFileName} onChange={(e) => setSearchFileName(e.target.value)} />
                </div>
            </Render>
            <ul className="file-list">
                {filteredDocuments.map((document) => (
                    <li
                        key={document.id}
                        className={selectedDocumentId === document.id ? "selected" : ""}
                        onClick={() => onSelectDocument?.(document)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                onSelectDocument?.(document);
                            }
                        }}
                    >
                        {document.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

/** -----------------------------------------------------------------------------------
 * DocumentPreview Component
 * 
 * This component renders a preview of the selected document content.
 * 
 * @param param0.content - The content of the document to preview
 * @returns JSX.Element | null
 ** ----------------------------------------------------------------------------------- */
const DocumentPreview = ({ content }: { content?: string }) => {


    const orientation = "landscape"; // Default orientation, can be dynamic based on content or props

    return (
        <>
            <Render if={!!content}>
                <div className="preview-wrapper">
                    <h3>Document Preview</h3>
                    <div className="document-preview" data-orentation={orientation}>
                        {content}
                    </div>
                </div>
            </Render>
        </>
    );
};

/** -----------------------------------------------------------------------------------
 * DocumentMeta Component
 * 
 * This component renders the metadata of the selected document if the showDocumentMeta flag is true.
 * @component
 * 
 * @param param0.selectedDocument - The currently selected document
 * @param param0.showDocumentMeta - Flag indicating whether to show the document metadata
 * @returns JSX.Element | null
 ** ----------------------------------------------------------------------------------- */
const DocumentMeta = ({ selectedDocument, showDocumentMeta }: { selectedDocument?: FileDialogDocumentItem; showDocumentMeta: boolean }) => {
    if (!showDocumentMeta || !selectedDocument) {
        return null;
    }

    const spaceCamelCase = (str: string) => str.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase());
    

    const ExcludedKeys = ["previewText", "id"]; 

    return (
        <div className="document-meta">
            <h3>Document Info</h3>
            <div className="document-meta-list">
            {(Object.entries(selectedDocument) as [string, string | number][]).map(([key, value]) => 
                !ExcludedKeys.includes(key) ? (
                    <>
                        <label>{spaceCamelCase(key)}: </label>
                        <div className="metadata-data">{friendlyDateTime(value.toString())}</div>
                    </>
                ) : null
            )}
            </div>
        </div>
    );
};

/** -----------------------------------------------------------------------------------
 * Dialog Right Column
 * 
 * description - This component renders the right column of the file dialog,
 * including the file preview area.
 *
 * @returns JSX.Element
 ** ----------------------------------------------------------------------------------- */
const DialogRightColumn = ({
        selectedDocument,
        showDocumentMeta,
}: {
        selectedDocument?: FileDialogDocumentItem;
        showDocumentMeta: boolean;
}) => {

    return (
        <div className="main-right">
            <DocumentPreview
                content={selectedDocument?.previewText}
            />

            <DocumentMeta
                selectedDocument={selectedDocument}
                showDocumentMeta={showDocumentMeta}
            />
        </div> 
    );
};

/** -----------------------------------------------------------------------------------
 * Dialog Input
 * 
 * @param label - The label for the input field
 * @param value - The current value of the input field
 * @param onChange - Function to call when the input value changes
 * 
 * description - This component renders the input field for the filename in the file dialog.
 * 
 * @returns JSX.Element
 ** ----------------------------------------------------------------------------------- */
const DialogInput = ({ label, value, onChange }: { label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <div className="input-wrapper">
            <label htmlFor="filename" className="file-name-label">{label}</label>
            <input type="text" name="fileName" id="filename" className="file-name-input" placeholder={label} value={value} onChange={onChange} />
        </div>
    );
};
        


const FileDialog = ({
    type,
    open,
    onClose,
    onConfirm,
    filename,
    setFilename,
    searchFileName,
    setSearchFileName,
    documents = [],
    selectedDocumentId,
    setSelectedDocumentId,
}: FileDialogProps) => {
const elementData = DIALOG_UI_ELEMENTS[type];

useEffect(() => {
  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  document.addEventListener('keydown', handleEsc);
  return () => document.removeEventListener('keydown', handleEsc);
}, [onClose]);

const handleSelectDocument = (document: FileDialogDocumentItem) => {
    setFilename(document.title);
    setSelectedDocumentId?.(document.id);
};

const selectedDocument = documents.find((document) => document.id === selectedDocumentId);

  return (
    <StyledFileDialog
      aria-label={`${type} file dialog`}
      open={open}
      onClose={onClose}
      role="dialog"
      aria-modal="true"
    >
        <div className="dialog-wrapper">
            <DialogHeader title={elementData.title} onClose={onClose} />
            <div className="dialog-main">
                <DialogLeftColumn
                    showSearch={elementData.showSearch}
                    searchFileName={searchFileName}
                    setSearchFileName={setSearchFileName}
                    documents={documents}
                    selectedDocumentId={selectedDocumentId}
                    onSelectDocument={type === "openDocument" ? handleSelectDocument : undefined}
                />
                <DialogRightColumn selectedDocument={selectedDocument} showDocumentMeta={elementData.showDocumentMeta} />
                <DialogInput label={elementData.inputLabel} value={filename} onChange={(e) => setFilename(e.target.value)} />
            </div>
            <DialogFooter onClose={onClose} onConfirm={() => { void onConfirm(); }} confirmLabel={elementData.buttonLabel} />
        </div>
    </StyledFileDialog>
  );
};

export default FileDialog;