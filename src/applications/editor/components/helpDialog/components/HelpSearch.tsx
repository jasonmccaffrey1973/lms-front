import Button from "../../../../../sharedComponents/Button/Button";
import SVGIcon from "../../../../../sharedComponents/SVG/SVGIcon";
import { StyledSearchForm } from "../HelpDialog.styles";

const HelpSearch = () => {
  return (
    <StyledSearchForm>
      <input type="search" placeholder="Search help..." />
      <Button type="submit" color="primary">
        <SVGIcon icon="search" />
      </Button>
    </StyledSearchForm>
  );
};

export default HelpSearch;