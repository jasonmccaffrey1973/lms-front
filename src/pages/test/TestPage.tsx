import Button from "../../sharedComponents/Button/Button";
import Render from "../../sharedComponents/Render";
import SVGIcon from "../../sharedComponents/SVG/SVGIcon";
import { StyledSelectionCheck } from "./TestPage.styles";
import useTestPage from "./useTestPage";



const TestPage = () => {
  const { uncheckItem, isItemChecked } = useTestPage();

  return (
    <StyledSelectionCheck>
      <Render if={isItemChecked()}>
        <Button color="transparent" onClick={uncheckItem}>
          <SVGIcon icon="checkMark" />
        </Button>
      </Render>
    </StyledSelectionCheck>
  );
}

export default TestPage;