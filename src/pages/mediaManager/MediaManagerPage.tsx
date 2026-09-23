import PageTemplate from "../../templates/PageTemplate";
import Button from "../../sharedComponents/Button/Button";
import Dialog from "../../sharedComponents/dialog/Dialog";
import FileUploader from "../../sharedComponents/fileUploader/FileUploader";
import SVGIcon from "../../sharedComponents/SVG/SVGIcon";
import Render from "../../sharedComponents/Render";
import MediaItem from "./mediaItem/MediaItem";
import ViewMedia from "./veiwMedia/ViewMedia";
import DeleteMedia from "./deleteMedia/DeleteMedia";

import {
  StyledMediaManagerPage,
  StyledTabBar,
  StyledTab,
  StyledRibbon,
  StyledContent,
  StyledHeader,
  StyledFooter,
  StyledNoMediaWrapper,
  StyledMediaGrid,
} from "./MediaManager.styles";

import useMediaManager from "./useMediaManager";
import type { RibbonIcon, MediaTabProps, NoMediaUploadedProps, MediaManagerUploadDialogProps } from "./MediaManager.types";


/** -------------------------------------------------------------------------------
 * Renders a single media tab.
 * @param param0 The props for the media tab.
 * @returns The rendered media tab component.
 ** ------------------------------------------------------------------------------- */
const MediaTab = ({
  type,
  selectedType,
  action,
}: MediaTabProps) => (
  <StyledTab
    aria-selected={selectedType === type}
    onClick={action}
  >
    {type}
  </StyledTab>
);


/** -------------------------------------------------------------------------------
 * Renders the "No Media Uploaded" message with actions to add or bulk upload media.
 * @param param0 The props for the no media uploaded component.
 * @returns The rendered no media uploaded component.
 ** ------------------------------------------------------------------------------- */
const NoMediaUploaded = ({ selectedTab, performRibbonAction }: NoMediaUploadedProps) => {
  return (
    <StyledNoMediaWrapper>
      No {selectedTab}s uploaded yet. Click{" "}
      <a
        href="#"
        onClick={(event) => {
          event.preventDefault();
          performRibbonAction['add']?.();
        }}
      >
        <strong>Add {selectedTab}</strong>
      </a>{" "}
      or{" "}
      <a
        href="#"
        onClick={(event) => {
          event.preventDefault();
          performRibbonAction['bulk']?.();
        }}
      >
        <strong>Bulk Upload {selectedTab}s</strong>
      </a>{" "}
      above to upload.
    </StyledNoMediaWrapper>
  );
};

/** -------------------------------------------------------------------------------
 * Renders the media manager upload dialog.
 * @param param0 The props for the media manager upload dialog component.
 * @returns The rendered media manager upload dialog component.
 ** ------------------------------------------------------------------------------- */
const MediaManagerUploadDialog = ({

  isBulkUpload,
  selectedTab,
  closeDialog,
  dialogRef,
  controls,
  ACCEPT_BY_TYPE,
  uploadSingleFileHandler,
  onAllUploadsComplete,
}: MediaManagerUploadDialogProps) => {
  return (
    <Dialog
      title={
        isBulkUpload
          ? `Bulk Upload ${selectedTab}s`
          : `Upload ${selectedTab}`
      }
      closeDialog={closeDialog}
      dialogRef={dialogRef}
      controls={controls}
      footerButtons={[
        {
          color: "danger",
          label: "Close",
          onClick: closeDialog,
        },
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
        onAllUploadsComplete={onAllUploadsComplete}
      />
    </Dialog>
  );
};

/** ===============================================================================
 * Renders the media manager page.
 * @returns The rendered media manager page component.
 ** =============================================================================== */
const MediaManagerPage = () => {
  const {
    MEDIA_TYPES,
    ribbonIcons,
    selectedTab,
    selectTab,
    performRibbonAction,
    filteredItems,
    isBulkUpload,
    closeDialog,
    dialogRef,
    dialogControls,
    formatLabel,
    isItemChecked,
    handleCheckClick,
    uncheckItem,
    ACCEPT_BY_TYPE,
    uploadSingleFileHandler,
    refreshMediaAfterUpload,
    viewedMedia,
    viewedMediaType,
    viewDialogRef,
    viewDialogControls,
    deleteDialogRef,
    deleteDialogControls,
    selectedMedia,
    deleteMedia,
  } = useMediaManager();

  const selectedTabCheckedCount = filteredItems.filter((item) => isItemChecked(item.id)).length;


  /** -------------------------------------------------------------------------------
   * Renders a single ribbon button.
   * @param param0 The props for the ribbon button component.
   * @returns The rendered ribbon button component.
   ** ------------------------------------------------------------------------------- */
  const RibbonButton = ({
    item,
  }: {
    item: RibbonIcon;
  }) => {
    const allowBulk =
      item.action.toLowerCase() === "bulk";

    const label = allowBulk
      ? `Bulk Upload ${selectedTab}s`
      : `${item.action} ${selectedTab}`;

    const handleClick = () => {
      performRibbonAction[item.action.toLowerCase()]?.();
    };

    return (
      <Button
        color="transparent"
        type="button"
        onClick={handleClick}
      >
        <SVGIcon icon={item.icon} />
        {label}
      </Button>
    );
  };



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


        <StyledHeader>
          Media Manager
        </StyledHeader>


        <StyledRibbon>
          <>
          {Object.entries(ribbonIcons)
            .filter(([group]) => group !== "Selected" || selectedTabCheckedCount > 0)
            .map(([group, icons]) => (
            <div className="group-wrapper" key={group}>
              <label className="group-label"> {group} {formatLabel(selectedTab)} </label>
              <div className="icons">
                {icons.map((item) => (
                  <RibbonButton key={item.action} item={item} />
                ))}
              </div>
            </div>
          ))}
          </>
        </StyledRibbon>

        <StyledContent>
          <Render if={filteredItems.length === 0}>
            <NoMediaUploaded
              selectedTab={selectedTab}
              performRibbonAction={performRibbonAction}
            />
          </Render>

          <Render if={filteredItems.length > 0}>
            <StyledMediaGrid aria-multiselectable="true">
              {filteredItems.map((item ) => (
                <MediaItem
                  key={item.id}
                  item={item}
                  isItemChecked={() => isItemChecked(item.id)}
                  toggleItemCheck={() => handleCheckClick(item.id)}
                  uncheckItem={() => uncheckItem(item.id)}
                />
              ))}
            </StyledMediaGrid>
          </Render>
        </StyledContent>


        <StyledFooter>
          <Render if={selectedTabCheckedCount > 0}>
            <p>{selectedTabCheckedCount} {selectedTab}{selectedTabCheckedCount > 1 ? 's' : ''} selected</p>
          </Render>
        </StyledFooter>

      </StyledMediaManagerPage>


      <MediaManagerUploadDialog
        isBulkUpload={isBulkUpload}
        selectedTab={selectedTab}
        closeDialog={closeDialog}
        dialogRef={dialogRef}
        controls={dialogControls}
        ACCEPT_BY_TYPE={ACCEPT_BY_TYPE}
        uploadSingleFileHandler={uploadSingleFileHandler}
        onAllUploadsComplete={refreshMediaAfterUpload}
      />

      <ViewMedia
        media={viewedMedia}
        type={viewedMediaType}
        dialogRef={viewDialogRef}
        controls={viewDialogControls}
      />

      <DeleteMedia
        dialogRef={deleteDialogRef}
        controls={deleteDialogControls}
        items={selectedMedia}
        onDelete={deleteMedia}
      />

    </PageTemplate>
  );
};


export default MediaManagerPage;
