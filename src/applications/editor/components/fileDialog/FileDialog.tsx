import Button from "../../../../sharedComponents/Button/Button";
import SVGIcon from "../../../../sharedComponents/SVG/SVGIcon";
import Render from "../../../../sharedComponents/Render";
import { StyledFileDialog } from "./FileDialog.styles";
import type { FileDialogProps } from "./fileDialog.types";
import useFileDialog from "./useFileDialog";
import { useEffect } from "react";

/** ====================================================================================
 * FileDialog Component
 ** ==================================================================================== */

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
const DialogLeftColumn = ({ showSearch, searchFileName, setSearchFileName }: { showSearch: boolean; searchFileName: string; setSearchFileName: (value: string) => void }) => {
    return (
        <div className="main-left">
            <Render if={showSearch}>
                <div className="search-wrapper">
                    <label htmlFor="search" className="search-label">Search Files</label>
                    <input type="search" name="search" id="search" className="search-input" placeholder="Enter Filename..." value={searchFileName} onChange={(e) => setSearchFileName(e.target.value)} />
                </div>
            </Render>
            <ul className="file-list">

            </ul>
        </div>
    );
}

/** -----------------------------------------------------------------------------------
 * Dialog Right Column
 * 
 * description - This component renders the right column of the file dialog,
 * including the file preview area.
 *
 * @returns JSX.Element
 ** ----------------------------------------------------------------------------------- */
const DialogRightColumn = () => {
    return (
        <div className="main-right">
            <div className="file-preview">
            </div>
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
const FileDialog = ({ type, open, onClose }: FileDialogProps) => {
    
const { DIALOG_UI_ELEMENTS, filename, setFilename, searchFileName, setSearchFileName } = useFileDialog();
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
                <DialogLeftColumn showSearch={elementData.showSearch} searchFileName={searchFileName} setSearchFileName={setSearchFileName} /> 
                <DialogRightColumn />
                <DialogInput label={elementData.inputLabel} value={filename} onChange={(e) => setFilename(e.target.value)} />
            </div>
            <DialogFooter onClose={onClose} onConfirm={() => {}} confirmLabel={elementData.buttonLabel} />
        </div>
    </StyledFileDialog>
  );
};

export default FileDialog;