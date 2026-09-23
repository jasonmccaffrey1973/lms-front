import type { dialogComponentProps, dialogProps } from "./dialog.types";
import { StyledDialog } from "./dialog.styles";
import SVGIcon from "../SVG/SVGIcon";
import Button from "../Button/Button";

const Dialog = ({title, children, footerButtons,  controls, dialogRef }: dialogComponentProps)=> {

  const { closeDialog } = controls;

  return (
    <StyledDialog ref={dialogRef} as="dialog" {...({} as dialogProps)}>
    <div className="dialog-wrapper">
      <div className="dialog-header">
        <h2>{title}</h2>
        <button onClick={closeDialog}><SVGIcon icon="close"  /></button>
      </div>
      <div className="dialog-body">
        {children}
      </div>
      <div className="dialog-footer">
        {footerButtons?.map((button, index) => (
          <Button key={index} onClick={button.onClick} color={button.color} disabled={button.disabled}>{button.label}</Button>
        ))}
      </div>
    </div>
    </StyledDialog>
  );
}

export default Dialog;
