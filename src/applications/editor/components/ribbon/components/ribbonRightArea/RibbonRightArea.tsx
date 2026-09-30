import ButtonDropDown from "../../../../../../sharedComponents/buttonDropDown/ButtonDropDown";
import ZoomSelector from "../../../zoomSelector/ZoomSelector";
import RibbonItem from "../RibbonItem";
import { StyledRibbonRightArea } from "./ribbonRightArea.styles";
import useRibbonRightArea from "./useRibbonRightArea";

const RibbonRightArea = () => {
  const { zoomLevel, handleZoomChange, zoomLabel } = useRibbonRightArea();

  return (
    <StyledRibbonRightArea aria-label="Ribbon right area" className="ribbon-right-area">
      {/* ZOOM MENU */}
      <ButtonDropDown icon="zoom" label={zoomLabel} isActive={false}>
        {({ close }) => (
          <ZoomSelector
            value={zoomLevel}
            onChange={handleZoomChange}
            onCancel={close}
          />
        )}
      </ButtonDropDown>
      {/* HELP DIALOG */}
      <RibbonItem
        icon="help"
        label="Help"
      />
    </StyledRibbonRightArea>
  );
};

export default RibbonRightArea;
