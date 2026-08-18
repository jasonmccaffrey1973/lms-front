import StyledSVGButton from "./SVGButton.styles";
import type { ReactNode } from "react";

const SVGButton = ({image, color, hover, disabled}: {image: ReactNode, color?: string, hover?: string, disabled?: boolean}) => {
	return (
		<StyledSVGButton color={color} hover={hover} disabled={disabled}>
			{image}
		</StyledSVGButton>
	)
}

export default SVGButton;