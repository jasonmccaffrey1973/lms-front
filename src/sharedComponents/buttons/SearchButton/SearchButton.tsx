import SVGButton from "../SVGButton/SVGButton";

const SearchButton = ({ color, hover, disabled }: { color?: string; hover?: string; disabled?: boolean }) => {
	return (
		<SVGButton image="search" color={color} hover={hover} disabled={disabled} />
	)
}

export default SearchButton;