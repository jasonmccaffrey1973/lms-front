import Button from "../../sharedComponents/Button/Button";
import SVGIcon from "../../sharedComponents/SVG/SVGIcon";
import { StyledSearchErrorForm } from "./error.styles";
import useErrorPagesHook from "./useErrorPagesHook";

const ErrorSearch = () => {
    const { handleSearchSubmit, searchSubmitted, searchSuggestions } = useErrorPagesHook();

    return (
        <StyledSearchErrorForm aria-label="Error Search Form" role="search" onSubmit={handleSearchSubmit}>
            <label htmlFor="error-search-input">Find what You Are Looking For</label>
            <input id="error-search-input" name="search" type="search" placeholder="Search..." list="error-search-suggestions" />
            <datalist id="error-search-suggestions">
                {searchSuggestions.map((link) => (
                    <option key={link.href} value={link.href}>{link.label}</option>
                ))}
            </datalist>
            <Button disabled={searchSubmitted} type="submit" color="primary" aria-label="Search">
                <SVGIcon icon="search" />
            </Button>
        </StyledSearchErrorForm>
    );
};

export default ErrorSearch;