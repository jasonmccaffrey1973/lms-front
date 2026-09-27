import Dialog from "../../../../sharedComponents/dialog/Dialog";
import Render from "../../../../sharedComponents/Render";
import { StyledFileDialog } from "./FileDialog.styles";
import type { FileDialogDocumentItem, FileDialogProps } from "./fileDialog.types";
import friendlyDateTime from "../../../../helperFunctions/formatDateTime";

/** ====================================================================================
 * FileDialog Component
 *  ==================================================================================== */

const DIALOG_UI_ELEMENTS = {
  newDocument: {
    title: "Create New Document",
    buttonLabel: "Create Document",
    inputLabel: "Enter Document Name",
    showFileTypeInput: true,
    showSearch: false,
    showDocumentMeta: false,
    showPreview: false,
  },
  openDocument: {
    title: "Open Document",
    buttonLabel: "Open Document",
    inputLabel: "Document Name",
    showFileTypeInput: false,
    showSearch: true,
    showDocumentMeta: true,
    showPreview: true,
  },
  saveDocument: {
    title: "Save Document",
    buttonLabel: "Save Document",
    inputLabel: "Enter Document Name",
    showFileTypeInput: false,
    showSearch: false,
    showDocumentMeta: false,
    showPreview: false,
  },
  saveDocumentAs: {
    title: "Save Document As",
    buttonLabel: "Save Document As",
    inputLabel: "Enter Document Name",
    showFileTypeInput: true,
    showSearch: false,
    showDocumentMeta: false,
    showPreview: false,
  },
};

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
    ? documents.filter((document) =>
        document.title.toLowerCase().includes(normalizedSearch),
      )
    : documents;

  return (
    <div className="main-left">
      <Render if={showSearch}>
        <div className="search-wrapper">
          <label htmlFor="search" className="search-label">
            Search Files
          </label>
          <input
            type="search"
            name="search"
            id="search"
            className="search-input"
            placeholder="Enter Filename..."
            value={searchFileName}
            onChange={(e) => setSearchFileName(e.target.value)}
          />
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
};

const DocumentPreview = ({ content }: { content?: string }) => {
  const orientation = "landscape";

  return (
    <Render if={!!content}>
      <div className="preview-wrapper">
        <h3>Document Preview</h3>
        <div className="document-preview" data-orentation={orientation}>
          {content}
        </div>
      </div>
    </Render>
  );
};

const DocumentMeta = ({
  selectedDocument,
  showDocumentMeta,
}: {
  selectedDocument?: FileDialogDocumentItem;
  showDocumentMeta: boolean;
}) => {
  if (!showDocumentMeta || !selectedDocument) {
    return null;
  }

  const spaceCamelCase = (str: string) =>
    str.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());

  const ExcludedKeys = ["previewText", "id"];

  return (
    <div className="document-meta">
      <h3>Document Info</h3>
      <div className="document-meta-list">
        {(Object.entries(selectedDocument) as [string, string | number][]).map(
          ([key, value]) =>
            !ExcludedKeys.includes(key) ? (
              <div key={key} style={{ display: "contents" }}>
                <label>{spaceCamelCase(key)}: </label>
                <div className="metadata-data">
                  {friendlyDateTime(value.toString())}
                </div>
              </div>
            ) : null,
        )}
      </div>
    </div>
  );
};

const DialogRightColumn = ({
  selectedDocument,
  showDocumentMeta,
}: {
  selectedDocument?: FileDialogDocumentItem;
  showDocumentMeta: boolean;
}) => {
  return (
    <div className="main-right">
        
      <DocumentPreview content={selectedDocument?.previewText} />
      <DocumentMeta
        selectedDocument={selectedDocument}
        showDocumentMeta={showDocumentMeta}
      />
    </div>
  );
};

const DialogInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="input-wrapper">
      <label htmlFor="filename" className="file-name-label">
        {label}
      </label>
      <input
        type="text"
        name="fileName"
        id="filename"
        className="file-name-input"
        placeholder={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

const FileDialog = ({
  type,
  dialogRef,
  controls,
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

  const handleSelectDocument = (document: FileDialogDocumentItem) => {
    setFilename(document.title);
    setSelectedDocumentId?.(document.id);
  };

  const selectedDocument = documents.find(
    (document) => document.id === selectedDocumentId,
  );

  const footerButtons = [
    {
      label: "Cancel",
      onClick: controls.closeDialog,
      color: "danger",
    },
    {
      label: elementData.buttonLabel,
      onClick: () => {
        void onConfirm();
      },
      color: "success",
    },
  ];

  return (
    <Dialog
      title={elementData.title}
      dialogRef={dialogRef}
      controls={controls}
      footerButtons={footerButtons}
    >
      <StyledFileDialog>
        <div className="dialog-main">
          <DialogLeftColumn
            showSearch={elementData.showSearch}
            searchFileName={searchFileName}
            setSearchFileName={setSearchFileName}
            documents={documents}
            selectedDocumentId={selectedDocumentId}
            onSelectDocument={handleSelectDocument}
          />
          <DialogRightColumn
            selectedDocument={selectedDocument}
            showDocumentMeta={elementData.showDocumentMeta}
          />
          <DialogInput
            label={elementData.inputLabel}
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
          />
        </div>
      </StyledFileDialog>
    </Dialog>
  );
};

export default FileDialog;