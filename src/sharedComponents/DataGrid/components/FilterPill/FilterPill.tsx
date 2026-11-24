import type { FilterPillProps } from "./filterPill.types"
import Button from "../../../Button/Button"
import SVGIcon from "../../../SVG/SVGIcon"
import { StyledPillWrapper } from "./filterPill.styles"

const FilterPill = ({ label, onRemove }: FilterPillProps) => {
    return (
        <StyledPillWrapper data-filter-name={label}>
            <Button color="transparent" type="button" className="filter-pill">
                {label}
            </Button>
            <Button color="transparent" type="button" className="filter-pill-close" onClick={onRemove} aria-label={`Remove filter ${label}`}>
                <SVGIcon icon="close" />
            </Button>
        </StyledPillWrapper>
    )
}

export default FilterPill