import { useRef, useState } from "react";
import PageTemplate from "../../templates/PageTemplate";
import Button from "../../sharedComponents/Button/Button";
import Dialog from "../../sharedComponents/dialog/Dailog";
import useDialog from "../../sharedComponents/dialog/useDialog";
import FileUploader from "../../sharedComponents/fileUploader/FileUploader";
import type { Accept } from "react-dropzone";
import {
  StyledMediaManagerPage,
  StyledTabBar,
  StyledTab,
  StyledRibbon,
  StyledContent,
  StyledHeader,
  StyledFooter,
  StyledContextWrapper,
} from "./MediaManager.styles";
import useMediaManager from "./useMediaManager";
import type { RibbonIcon } from "./MediaManager.types";
import SVGIcon from "../../sharedComponents/SVG/SVGIcon";
import Render from "../../sharedComponents/Render";
import MediaItem from "./mediaItem/MediaItem";

const ACCEPT_BY_TYPE: Record<string, Accept> = {
  image: { "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"] },
  video: { "video/*": [".mp4", ".webm", ".mov", ".avi"] },
  audio: { "audio/*": [".mp3", ".wav", ".ogg", ".aac", ".m4a"] },
};

const MediaTab = ({
  type,
  selectedType,
  action,
}: {
  type: string;
  selectedType?: string;
  action?: () => void;
}) => {
  return (
    <StyledTab aria-selected={selectedType === type} onClick={action}>
      {type}
    </StyledTab>
  );
};

const ContextInput = ({ label, type }: { label?: string; type: string }) => {
  return (
    <div className="input-wrapper">
      {label && <label htmlFor={label}>{label}</label>}
      <input type={type} id={label || ""} />
    </div>
  );
};

const MediaManagerPage = () => {
  const {
    MEDIA_TYPES,
    ribbonIcons,
    selectedTab,
    selectTab,
    performRibbonAction,
    showContext,
    mediaItems,
    uploadSingleFileHandler,
  } = useMediaManager();

  const dialogRef = useRef<HTMLDialogElement>(null!);
  const dialogControls = useDialog({ ref: dialogRef });
  const { openDialog, closeDialog } = dialogControls;
  const [isBulkUpload, setIsBulkUpload] = useState(false);

  const openUploadModal = (bulk = false) => {
    setIsBulkUpload(bulk);
    openDialog();
  };

  const RibbonButton = ({ item }: { item: RibbonIcon }) => {
    const isBulk = item.action.toLowerCase() === "bulk";
    const isAdd = item.action.toLowerCase() === "add";
    const label = `${isBulk ? "Bulk Upload" : item.action} ${isBulk ? selectedTab + "s" : selectedTab}`;

    const handleClick = () => {
      if (isAdd) {
        openUploadModal(false);
        return;
      }
      if (isBulk) {
        openUploadModal(true);
        return;
      }
      performRibbonAction[item.action.toLowerCase()]?.();
    };

    return (
      <Button
        color="transparent"
        key={selectedTab + item.action}
        type="button"
        onClick={handleClick}
      >
        <SVGIcon icon={item.icon} />
        {label}
      </Button>
    );
  };

  const filteredItems = mediaItems.filter((item) => item.kind === selectedTab);

  return (
    <PageTemplate>
      <StyledMediaManagerPage>
        <StyledTabBar>
          {Object.values(MEDIA_TYPES).map((type) => (
            <MediaTab
              key={type}
              type={type}
              selectedType={selectedTab}
              action={() => selectTab(type)}
            />
          ))}
        </StyledTabBar>
        <StyledHeader>Media Manager</StyledHeader>
        <StyledRibbon>
          <div className="button-wrapper">
            <label>{selectedTab}</label>
            <div className="icons">
              {ribbonIcons.map((item) => (
                <RibbonButton key={item.action} item={item} />
              ))}
            </div>
          </div>
          <Render if={showContext}>
            <StyledContextWrapper>
              <div className="context-label">{`Add ${selectedTab}`}</div>
              <ContextInput label="Media URL" type="url" />
              <ContextInput label="Alt Text" type="text" />
              <ContextInput label="Storage Location" type="text" />
            </StyledContextWrapper>
          </Render>
        </StyledRibbon>
        <StyledContent>
          <Render if={filteredItems.length === 0}>
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                color: "var(--editor-text-muted)",
              }}
            >
              No {selectedTab}s uploaded yet. Click{" "}
              <strong>Add {selectedTab}</strong> or{" "}
              <strong>Bulk Upload {selectedTab}s</strong> above to upload.
            </div>
          </Render>
          <Render if={filteredItems.length > 0}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "1rem",
                padding: "1rem",
              }}
            >
              {filteredItems.map((item) => (
                <MediaItem
                  key={item.id}
                  item={item}
                />
              ))}
            </div>
          </Render>
        </StyledContent>
        <StyledFooter>
          <Button type="button" color="danger">
            Cancel
          </Button>
          <Button
            type="button"
            color="success"
            onClick={() => openUploadModal(false)}
          >
            Upload
          </Button>
        </StyledFooter>

        <Dialog
          title={
            isBulkUpload
              ? `Bulk Upload ${selectedTab}s`
              : `Upload ${selectedTab}`
          }
          closeDialog={closeDialog}
          dialogRef={dialogRef}
          controls={dialogControls}
          footerButtons={[
            { color: "danger", label: "Close", onClick: closeDialog },
          ]}
        >
          <FileUploader
            key={`${selectedTab}-${isBulkUpload}`}
            title={
              isBulkUpload
                ? `Drop ${selectedTab}s here to bulk upload`
                : `Drop a ${selectedTab} here to upload`
            }
            description={
              isBulkUpload
                ? `Drag & drop multiple ${selectedTab} files or click to browse`
                : `Drag & drop a single ${selectedTab} file or click to browse`
            }
            accept={ACCEPT_BY_TYPE[selectedTab]}
            multiple={isBulkUpload}
            maxFiles={isBulkUpload ? 20 : 1}
            autoUpload={true}
            duplicateStrategy="keepBoth"
            imageOptimization={
              selectedTab === "image"
                ? {
                    enabled: true,
                    maxWidth: 2048,
                    maxHeight: 2048,
                    quality: 0.85,
                  }
                : undefined
            }
            showAggregateProgress={isBulkUpload}
            uploadFile={uploadSingleFileHandler}
          />
        </Dialog>
      </StyledMediaManagerPage>
    </PageTemplate>
  );
};

export default MediaManagerPage;