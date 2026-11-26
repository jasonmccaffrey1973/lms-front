import Button from "../../../Button/Button"
import SVGIcon from "../../../SVG/SVGIcon"
import { StyledFilterFacet } from "./filterFacet.styles"
import type { FilterFacetProps } from "./filterFacet.types"


const FilterFacet = ({ label, options, value}: FilterFacetProps) => {
    return (
        <StyledFilterFacet>
            <Button 
                className="facet-header"
                type="button"
                color="transparent"
                onClick={() => console.log('clicked')}

            >
                <h2 className="facet-title">{label}</h2>
                <span className="icon-wrapper"><SVGIcon icon="chevronDown" /></span>
            </Button>
            <div className="facet-body">
                <ul className="facet-options-wrapper">
                    {options.map(option => (
                        <li key={option.value} className={`facet-option ${value?.includes(option.value) ? 'selected' : ''}`}>
                            {option.label}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="facet-footer">
                
            </div>
        </StyledFilterFacet>
    )
}

export default FilterFacet