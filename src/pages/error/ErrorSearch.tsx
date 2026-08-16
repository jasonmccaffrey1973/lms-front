import { StyledSearchErrorForm } from "./error.styles"

import useErrorPagesHook from "./useErrorPagesHook";

const ErrorSearch = () => {
    const { handleSearchSubmit, serchSubmitted, searchSuggestions } = useErrorPagesHook();

    return (
        <StyledSearchErrorForm aria-label="Error Search Form" role="search" onSubmit={(e) => handleSearchSubmit(e)}>
            <label htmlFor="error-search-input">Find what You Are Looking For</label>
            <input id="error-search-input" name="search" type="search" placeholder="Search..." list="error-search-suggestions" />
            <datalist id="error-search-suggestions">
                {searchSuggestions.map((link) => (
                    <option key={link.href} value={link.href}>{link.label}</option>
                ))}
            </datalist>
            <button disabled={serchSubmitted}>Search</button>
        </StyledSearchErrorForm>
    )
}

export default ErrorSearch