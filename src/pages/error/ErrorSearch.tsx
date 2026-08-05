import { StyledSearchErrorForm } from "./error.styles"

import useErrorPagesHook from "./useErrorPagesHook";

const ErrorSearch = () => {
    const { handleSearchSubmit, serchSubmitted } = useErrorPagesHook();
    return (
        <StyledSearchErrorForm aria-label="Error Search Form" role="search" onSubmit={(e) => handleSearchSubmit(e)}>
            <label htmlFor="error-search-input">Find what You Are Looking For</label>
            <input id="error-search-input" name="search" type="search" placeholder="Search..." />
            <button disabled={serchSubmitted}>Search</button>
        </StyledSearchErrorForm>
    )
}

export default ErrorSearch