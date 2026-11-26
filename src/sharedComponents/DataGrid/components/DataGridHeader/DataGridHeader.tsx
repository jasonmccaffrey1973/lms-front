import { Link } from "react-router-dom"
import Render from "../../../Render"
import SVGIcon from "../../../SVG/SVGIcon"
import Search from "./Search/Search"
import Button from "../../../Button/Button"
import type { DataGridHeaderProps } from "./dataGridHeader.types"

const DataGridHeader = ({ title, searchValue, setSearchValue,  openFilters, activeFilterCount, newRecord }: DataGridHeaderProps) => {

    const singularTitle = title?.trim().endsWith("s") ? title?.slice(0, -1) : title
    const recordLabel = singularTitle ?? "Record"

    return (
        <>
        <div className="data-header-left-wrapper">
            <Render if={!!title}>
            <h2 className="data-grid-title"><Link to="/admin">Admin</Link> <SVGIcon icon="chevronRight" /> <span className="current-page">{title}</span></h2>
            </Render>
        </div>

        <div className="data-header-search-wrapper">
            <form className="data-search-form" role="search" onSubmit={(event) => event.preventDefault()}>
                <Search searchValue={searchValue} handleSearch={setSearchValue} />
            </form>
        </div>
        <div className="data-header-right-wrapper">
            <Button
            type="button"
            color="success"
            aria-label={`New ${recordLabel}`}
            title={`New ${recordLabel}`}
            className={`new-${title?.toLowerCase()}-button`}
            onClick={newRecord({ type: singularTitle })}
            >
                <span className="icon-wrapper"><SVGIcon icon="plus" /></span>
                New {recordLabel}
            </Button>
            <Button
            type="button"
            color="transparent"
            textColor="var(--app-text)"
            aria-label="Open data filters"
            title="Filters"
            className="data-filter-button"
            onClick={openFilters}
            >
            <SVGIcon icon="filter" />
            {activeFilterCount > 0 ? (
                <span className="filter-count" aria-hidden="true" />
            ) : null}
            </Button>
        </div>
        </>
    )
}

export default DataGridHeader