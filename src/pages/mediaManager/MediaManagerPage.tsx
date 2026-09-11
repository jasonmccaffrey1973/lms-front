
import PageTemplate from "../../templates/PageTemplate";
import Button from "../../sharedComponents/Button/Button";
// import MediaDialog from "../../applications/media/components/MediaDialog";
import {StyledMediaManagerPage, StyledTabBar, StyledTab, StyledRibbon, StyledContent, StyledHeader, StyledFooter } from "./MediaManager.styles";
import useMediaManager from "./useMediaManager";
import type { RibbonIcon } from "./MediaManager.types";
import SVGIcon from "../../sharedComponents/SVG/SVGIcon";




const MediaTab = ({ type, selectedType, action  }: { type: string; selectedType?: string; action?: () => void }) => {
  return (
    <StyledTab aria-selected={selectedType === type} onClick={action}>{type}</StyledTab>
  );
};

const MediaManagerPage = () => {
  const { MEDIA_TYPES, ribbonIcons, selectedTab, selectTab, performRibbonAction } = useMediaManager();  

  const RibbonButton = ({ item }: { item: RibbonIcon }) => {
    const label = `${item.action === "Bulk" ? "Bulk Upload" : item.action} ${item.action === "Bulk" ? selectedTab+'s' : selectedTab}`;
    return (
      <Button color="transparent" key={selectedTab + item.action} type="button" onClick={() => performRibbonAction[item.action.toLowerCase()]?.()}>
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
              <MediaTab key={type} type={type} selectedType={selectedTab} action={() => selectTab(type)} />
            ))}
        </StyledTabBar>
        <StyledHeader>
            Media Manager
        </StyledHeader>
        <StyledRibbon>
            <div className="button-wrapper">
                <label>{selectedTab}</label>
                <div className="icons">
                    {ribbonIcons.map((item) => (
                        <RibbonButton key={item.action} item={item} />
                    ))}
                </div>
            </div>
        </StyledRibbon>
        <StyledContent>
        </StyledContent>
        <StyledFooter>
            <Button type="button" color="danger">
                Cancel
            </Button>
            <Button type="submit" color="success">
                Upload
            </Button>
        </StyledFooter>
      </StyledMediaManagerPage>
    </PageTemplate>
  );
};

export default MediaManagerPage;

{/* 
        {dialogOpen ? (
          <MediaDialog
            open={dialogOpen}
            initialMode={dialogMode}
            allowMultiple={true}
            title="Bulk Upload Media"
            onClose={closeDialog}
            onUpload={uploadMedia}
            onUrlSubmit={addUrlMedia}
          />
        ) : null} */}