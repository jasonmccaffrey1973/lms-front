import SVGIcon from "../../SVG/SVGIcon"

type SearchProps = {
  serchValue: string
  handleSearch: (value: string) => void
  clearSearch: () => void
}

const Search = ({ serchValue, handleSearch }: SearchProps) => {
  return (
    <>
      <input
        id="search"
        type="search"
        value={serchValue || ""}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <label htmlFor="search">
        <SVGIcon icon="search" />
      </label>

    </>
  )
}

export default Search