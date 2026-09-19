import { StyledSelectionCheck } from "./selectedCheck.styles";
import Render from "../Render";
import Button from "../Button/Button";
import SVGIcon from "../SVG/SVGIcon";

const SelectedCheck = ({ isItemChecked, uncheckItem }: { isItemChecked: () => boolean; uncheckItem: () => void }) => {
    return (
        <StyledSelectionCheck>
          <Render if={isItemChecked()}>
            <Button color="transparent" onClick={uncheckItem} className="selected-check-button">
              <SVGIcon icon="checkMark" />
            </Button>
          </Render>
        </StyledSelectionCheck>
    );
};

export default SelectedCheck;