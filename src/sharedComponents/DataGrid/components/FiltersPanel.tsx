import type { DataGridFilter } from "../dataGrid.types"
import FilterFacet from "./FilterFacet/FilterFacet"

type FiltersPanelProps = {
  fields: string[]
  filters: DataGridFilter[]
  setFilter: (field: string, value: string) => void
  clearFilters: () => void
}

const FiltersPanel = ({ fields, filters, clearFilters }: FiltersPanelProps) => {
  const filterMap = new Map(filters.map((item) => [item.field, item.value]))

  return (
    <section className="datagrid-filters-panel" aria-label="Data filters">
      <h2>Filters</h2>
      <button type="button" onClick={clearFilters}>
        Clear all
      </button>
      <div className="datagrid-filters-panel__fields">
        {fields.length === 0 ? (
          <p>No filterable fields available.</p>
        ) : (
          fields.map((field) => (
            // <label key={field}>
            //   <span>{field}</span>
            //   <input
            //     type="text"
            //     value={filterMap.get(field) ?? ""}
            //     onChange={(event) => setFilter(field, event.target.value)}
            //   />
            // </label>
            <FilterFacet 
              key={field}
              label={field}
              options={filterMap.get(field) ? [{ label: filterMap.get(field)!, value: filterMap.get(field)! }] : []}
              value={filterMap.get(field) ? [filterMap.get(field)!] : []}
            />

          ))
        )}
      </div>
    </section>
  )
}

export default FiltersPanel
