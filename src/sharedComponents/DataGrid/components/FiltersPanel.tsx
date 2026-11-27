import Render from "../../Render"
import type { DataGridFetchFacetOptions, DataGridFilter } from "../dataGrid.types"
import FilterFacet from "./FilterFacet/FilterFacet"

type FiltersPanelProps = {
  fields: string[]
  filters: DataGridFilter[]
  noneSelectedFields: string[]
  setFieldFilters: (field: string, values: string[]) => void
  setFacetNoneSelected: (field: string, selected: boolean) => void
  search: string
  fetchFacetOptions?: DataGridFetchFacetOptions
  clearFilters: () => void
}

const FiltersPanel = ({ fields, filters, noneSelectedFields, setFieldFilters, setFacetNoneSelected, search, fetchFacetOptions, clearFilters }: FiltersPanelProps) => {

  return (
    <section className="datagrid-filters-panel" aria-label="Data filters">
      <h2>Filters</h2>
      <button type="button" onClick={clearFilters}>
        Clear all
      </button>
      <div className="datagrid-filters-panel__fields">
        <Render if={fields.length === 0}>
          <p>No filterable fields available.</p>
        </Render>
        <Render if={fields.length > 0}>
          {fields.map((field) => (
            <FilterFacet 
              key={field}
              name={field}
              filters={filters}
              noneSelected={noneSelectedFields.includes(field)}
              setFieldFilters={setFieldFilters}
              setFacetNoneSelected={setFacetNoneSelected}
              search={search}
              fetchFacetOptions={fetchFacetOptions}
            />
          ))}
        </Render>
      </div>
    </section>
  )
}

export default FiltersPanel
