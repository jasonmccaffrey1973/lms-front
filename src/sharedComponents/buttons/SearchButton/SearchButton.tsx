import SVGButton from "../SVGButton/SVGButton";
import SearchSVG from "../SVG/SearchSVG";

const SearchButton = ({ color, hover, disabled }: { color?: string; hover?: string; disabled?: boolean }) => {
	return (
		<SVGButton image={<SearchSVG />} color={color} hover={hover} disabled={disabled} />
	)
}

export default SearchButton;