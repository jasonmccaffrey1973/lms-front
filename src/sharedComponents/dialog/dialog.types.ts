
import type React from "react";


type dialogProps = {
  isDialogOpen: boolean;
};


interface dialogFooterButton {
  label: string;
  onClick: () => void;
  color?: string;
}


interface dialogComponentProps {
  title: string;

  /*
   * The Dialog component uses a native <dialog>
   * element, so the ref must target HTMLDialogElement.
   */
  dialogRef: React.RefObject<HTMLDialogElement>;

  closeDialog: () => void;

  children?: React.ReactNode;

  footerButtons?: dialogFooterButton[];

  controls: {
    toggleDialog: () => void;
    closeDialog: () => void;
  };
}


export type {
  dialogProps,
  dialogFooterButton,
  dialogComponentProps,
};
