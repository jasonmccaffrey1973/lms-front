import capitalizeWord from "../../../../helperFunctions/capitalizeWord"
import Button from "../../../Button/Button"
import SVGIcon from "../../../SVG/SVGIcon"
import { StyledFilterFacet } from "./filterFacet.styles"
import type { FilterFacetProps } from "./filterFacet.types"
import useFilterFacet from "./useFilterFacet"

const FilterFacet = ({ name, filters, noneSelected, setFieldFilters, setFacetNoneSelected, search, fetchFacetOptions }: FilterFacetProps) => {
  const {
    options,
    searchValue,
    handleSearchChange,
    isOptionSelected,
    toggleOption,
    getOptionAction,
    toggleFacetOpen,
    isFacetOpen,
    hasMore,
    optionsListRef,
    loadMoreSentinelRef,
    clearAllFilters,
  } = useFilterFacet({ name, filters, noneSelected, setFieldFilters, setFacetNoneSelected, search, fetchFacetOptions })
  const displayName = capitalizeWord(name)
  return (
    <StyledFilterFacet>
      <Button
        className="facet-header"
        type="button"
        color="transparent"
        onClick={toggleFacetOpen}
        aria-controls={`facet-body-${name}`}
        aria-expanded={isFacetOpen}
      >
        <h2 className="facet-title">{displayName}</h2>
        <span className="icon-wrapper"><SVGIcon icon="chevronDown" /></span>
      </Button>
      <div className="facet-body" aria-expanded={isFacetOpen} id={`facet-body-${name}`}>
        <div className="facet-body-inner">
          <div className="facet-search-wrapper">
            <label className="svg-wrapper" htmlFor={`facet-search-${name}`}>
              <SVGIcon icon="search" />
            </label>
            <input
              type="search"
              placeholder={`Search ${displayName} Options...`}
              id={`facet-search-${name}`}
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
          <ul className="facet-options-wrapper" ref={optionsListRef}>
            {options.map((option) => {
              const selected = isOptionSelected(option)
              const optionAction = getOptionAction(option)
              return (
                <li key={option.value}>
                  <Button
                    type="button"
                    color="transparent"
                    onClick={() => toggleOption(option)}
                    className="facet-option-wrapper-btn"
                    role="checkbox"
                    aria-checked={selected}
                  >
                    <span className="selected-icon-wrapper"><SVGIcon icon={selected ? "checkMark" : "empty"} /></span>
                    <span className="label-wrapper">
                      {option.label}
                      {option.count !== undefined ? <span className="facet-option-count">{option.count}</span> : null}
                    </span>
                  </Button>
                  <Button
                    type="button"
                    color="transparent"
                    className="facet-option-button"
                    onClick={optionAction.action}
                    aria-label={`${optionAction.label} ${option.label}`}
                  >
                    {optionAction.label}
                  </Button>
                </li>
              )
            })}
            {hasMore ? <li ref={loadMoreSentinelRef} className="facet-load-sentinel" aria-hidden="true" /> : null}
          </ul>
          <Button type="button" className="facet-reset-button" color="primary" onClick={clearAllFilters}>Reset</Button>
        </div>
      </div>
      <div className="facet-footer">
      </div>
    </StyledFilterFacet>
  )
}

export default FilterFacet
