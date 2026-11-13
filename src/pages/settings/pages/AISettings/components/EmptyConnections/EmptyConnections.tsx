import Button from "../../../../../../sharedComponents/Button/Button";
import { StyledEmptyConnectionWrapper } from "./emptyConnections.styles";

const EmptyConnections = ({ onNew }: { onNew: () => void }) => {
  return (
    <StyledEmptyConnectionWrapper>
      <p>No AI connections available.</p>
      
        <Button type="button" color="transparent" onClick={onNew}>
          Add Connection
        </Button>
      
    </StyledEmptyConnectionWrapper>
  );
};

export default EmptyConnections;