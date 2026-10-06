import Dialog from "../../../../sharedComponents/dialog/Dialog";
import type { HelpDialogProps } from "./HelpDialog.types";
import { StyledHelpDialog } from "./HelpDialog.styles";
import useHelpDialog from "./useHelpDialog";
import Render from "../../../../sharedComponents/Render";
import * as HelpDialogComponents from "./components"; 
import Button from "../../../../sharedComponents/Button/Button";

const HelpDialog = ({ dialogRef, controls }: HelpDialogProps) => {

  const { HELP_DIALOG_TABS, activeTab, handleTabClick } = useHelpDialog();
  return (
  <Dialog
    title="Editor Help"
    dialogRef={dialogRef}
    controls={controls}
    footerButtons={[
      {
        label: "Close",
        onClick: controls.closeDialog,
        color: "success",
      },
    ]}
  >
    <StyledHelpDialog>
      <div className="tab-wrapper">
        <ul className="tabs" role="tablist" aria-orientation="vertical">
          {HELP_DIALOG_TABS.map((tab) => (
            <li
              key={tab.id}
              className="tab"
              role="tab"
              aria-selected={activeTab === tab.id}
            >
              <Button color="transparent" onClick={() => handleTabClick(tab.id)} id={`${tab.id}-tab`}>
                {tab.label}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="content-wrapper">
        <Render if={activeTab === "getting-started"}>
          <HelpDialogComponents.GettingStarted aria-labelledby="getting-started-tab" />
        </Render>
        <Render if={activeTab === "shortcuts"}>
          <HelpDialogComponents.ShortcutHelp aria-labelledby="shortcuts-tab" />
        </Render>
        <Render if={activeTab === "file"}>
          <HelpDialogComponents.FileHelp aria-labelledby="file-tab" />
        </Render>
        <Render if={activeTab === "home"}>
          <HelpDialogComponents.HomeHelp aria-labelledby="home-tab"/>
        </Render>
        <Render if={activeTab === "insert"}>
          <HelpDialogComponents.InsertHelp aria-labelledby="insert-tab" />
        </Render>
        <Render if={activeTab === "review"}>
          <HelpDialogComponents.ReviewHelp aria-labelledby="review-tab" />
        </Render>
      </div>
    </StyledHelpDialog>
  </Dialog>
  );
};


export default HelpDialog;
