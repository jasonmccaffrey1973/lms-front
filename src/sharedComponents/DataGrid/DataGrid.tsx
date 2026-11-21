import Search from "./components/Search"
import StyledDataGrid from "./dataGrid.styles"
import type { UseDataGridProps } from "./dataGrid.typs"
import useDataGrid from "./useDataGrid"

const DataGrid = <TData extends Record<string, unknown>,>({ initialData = [] }: UseDataGridProps<TData>) => {

    const { serchValue, handleSearch, clearSearch } = useDataGrid<TData>({ initialData })

  return (
    <StyledDataGrid>
        <div className="grid-header">
            <div className="data-header-left-wrapper">
            </div>

            <div className="data-header-search-wrapper">
                <form  className="data-search-form">    
                    <Search
                    serchValue={serchValue}
                    handleSearch={handleSearch}
                    clearSearch={clearSearch}
                    />
                </form>
            </div>
            <div className="data-header-right-wrapper">
            </div>
        </div>
        <div className="grid-body">
            
                
        </div>
        <div className="grid-footer">

        </div>
    </StyledDataGrid>
  )
}

export default DataGrid