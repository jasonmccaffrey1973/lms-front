import SVGIcon, {type SVGIconName} from "../SVG/SVGIcon";
import StyledSVGButton from "./SVGButton.styles";



const SVGButton = ({image, color, hover, disabled}: {image: SVGIconName, color?: string, hover?: string, disabled?: boolean}) => {
	return (
		<StyledSVGButton color={color} hover={hover} disabled={disabled}>
			<SVGIcon icon={image} />
		</StyledSVGButton>
	)
}

export default SVGButton;