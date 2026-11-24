import SVGIcon from "../../SVG/SVGIcon"

type SearchProps = {
  searchValue: string
  handleSearch: (value: string) => void
}

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