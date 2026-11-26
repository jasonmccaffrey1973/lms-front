import SVGIcon from "../../../../SVG/SVGIcon"
import type { SearchProps } from "./search.types"

const Search = ({ searchValue, handleSearch }: SearchProps) => {
  return (
    <>
      <input
        id="search"
        type="search"
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
        aria-label="Search all fields"
      />
      <label htmlFor="search">
        <SVGIcon icon="search" />
      </label>

    </>
  )
}

export default Search