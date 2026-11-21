import useDataFilters from "./useDataFilters";
import StyledDataFilters from "./dataFilters.styles";
import Render from "../../../Render";

const DataFilters = () => {

    const { numberOfFilters } = useDataFilters();

  return (
    <StyledDataFilters>
        <Render if={numberOfFilters !== 0}>
            <></>
            {/* Add your filter components here */}
        </Render>
    </StyledDataFilters>
  )
}

export default DataFilters