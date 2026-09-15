import { useRef } from "react";
import useDialog from "../../sharedComponents/dialog/useDialog";

import FileUploader from "../../sharedComponents/fileUploader/FileUploader";
import Dialog from "../../sharedComponents/dialog/Dailog";

const TestPage = () => {
  
  const dialogRef = useRef<HTMLDialogElement>(null!);
  const dialogControls = useDialog({ ref: dialogRef });
  const { toggleDialog, closeDialog } = dialogControls;

  
  return (
    <>
      <button onClick={toggleDialog}>Open Dialog</button>
      <Dialog 
        title="Upload File(s)"
        closeDialog={closeDialog} 
        dialogRef={dialogRef} 
        controls={dialogControls} 
        footerButtons={[
          {color: "danger", label: "Close", onClick: closeDialog},
          {color: "success", label: "Upload Files", onClick: closeDialog}
        ]}>
        <FileUploader />
      </Dialog>

    </>
  );
}

export default TestPage;