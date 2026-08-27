import CloseButton from "../../../../sharedComponents/buttons/closeButton/CloseButton";
import Render from "../../../../sharedComponents/Render";
import { StyledFileDialog } from "./FileDialog.styles";
import type { FileDialogProps } from "./fileDialog.types";
import useFileDialog from "./useFileDialog";

const FileDialog = ({
    type,
    open,
    onClose,
}: FileDialogProps) => {
    
const { DIALOG_UI_ELEMENTS,  } = useFileDialog();
const elementData = DIALOG_UI_ELEMENTS[type];

  return (
    <StyledFileDialog
      aria-label={`${type} file dialog`}
      open={open}
      onClose={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="dialog-wrapper">
        <div className="dialog-header">
          <h2 className="title">{elementData.title}</h2>
          <span className="close-button" onClick={onClose}>
            <CloseButton color="var(--clr-error)" hover="var(--clr-error)"/>
          </span>
        </div>

        <div className="dialog-main">

            <div className="main-left">
                <Render if={elementData.showSearch}>
                    <div className="search-wrapper">
                        <label htmlFor="search" className="search-label">Search Files</label>
                        <input type="search" name="search" id="search" className="search-input" placeholder="Enter Filename..." />
                    </div>
                </Render>

                <ul className="file-list">

                </ul>

            </div>
            <div className="main-right"></div>
            <div className="input-wrapper">
                <label htmlFor="filename" className="file-name-label">{elementData.inputLabel}</label>
                <input type="text" name="fileName" id="filename" className="file-name-input" placeholder={elementData.inputLabel} />
            </div>

        </div>

        <div className="dialog-footer">
          <button className="cancel-button" type="button" onClick={onClose}>
            Cancel
          </button>

          <button className="confirm-button" type="button" >
            {elementData.buttonLabel}
          </button>
        </div>
      </div>
    </StyledFileDialog>
  );
};

export default FileDialog;