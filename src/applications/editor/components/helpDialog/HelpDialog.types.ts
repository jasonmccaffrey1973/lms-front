import type React from "react";
import type { dialogComponentProps } from "../../../../sharedComponents/dialog/dialog.types";

interface HelpDialogProps {
  dialogRef: React.RefObject<HTMLDialogElement>;
  controls: dialogComponentProps["controls"];
}

export type { HelpDialogProps };