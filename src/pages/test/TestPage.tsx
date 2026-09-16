import { useRef } from "react";
import useDialog from "../../sharedComponents/dialog/useDialog";
import FileUploader from "../../sharedComponents/fileUploader/FileUploader";
import Dialog from "../../sharedComponents/dialog/Dailog";

/**
 * Simulated slow upload function (3 seconds total per file).
 * Increments progress every 300ms and reacts to cancellation.
 */
const mockUpload = (
  file: File,
  onProgress: (pct: number) => void,
  signal: AbortSignal
): Promise<void> => {
  return new Promise((resolve, reject) => {
    let progress = 0;
    const interval = setInterval(() => {
      if (signal.aborted) {
        clearInterval(interval);
        reject(new Error("Aborted"));
        return;
      }

      progress += 10;
      onProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        resolve();
      }
    }, 300);

    signal.addEventListener("abort", () => {
      clearInterval(interval);
      reject(new Error("Aborted"));
    });
  });
};

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
          { color: "danger", label: "Cancel", onClick: closeDialog },
          { color: "success", label: "Upload Files", onClick: closeDialog }
        ]}>
        <FileUploader
          uploadFile={mockUpload}
          autoUpload={true}
          duplicateStrategy="keepBoth"
          imageOptimization={{
            enabled: true,
            maxWidth: 2048,
            maxHeight: 2048,
            quality: 0.85,
          }}
        />
      </Dialog>
    </>
  );
};

export default TestPage;