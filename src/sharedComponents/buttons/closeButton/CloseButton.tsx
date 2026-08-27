import SVGButton from "../SVGButton/SVGButton";

const CloseButton = ({ color, hover, disabled }: { color?: string; hover?: string; disabled?: boolean }) => {
	return (
		<SVGButton image="close" color={color} hover={hover} disabled={disabled} />
	)
}

export default CloseButton;