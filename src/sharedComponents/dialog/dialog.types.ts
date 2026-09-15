type dialogProps = {
  isDialogOpen: boolean;
};

interface dialogComponentProps {
  title: string;
  dialogRef: React.RefObject<HTMLDialogElement>;
  closeDialog: () => void;
  children?: React.ReactNode;
  footerButtons?: dialogFooterButton[];
  controls: {
    toggleDialog: () => void;
    closeDialog: () => void;
  };
}

interface dialogFooterButton {
  label: string;
  onClick: () => void;
  color?: string;
}

export type { dialogProps, dialogFooterButton, dialogComponentProps };