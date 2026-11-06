import StyledSVGButton from "./SVGButton.styles";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type SVGButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "color"> & {
	image: ReactNode;
	color?: string;
	hover?: string;
};

const SVGButton = ({ image, color, hover, type = "button", ...buttonProps }: SVGButtonProps) => {
	return (
		<StyledSVGButton color={color} hover={hover} type={type} {...buttonProps}>
			{image}
		</StyledSVGButton>
	)
}

export default SVGButton;
