import { Link } from "react-router-dom";
import { StyledErrorPageLinks } from "./error.styles"
import useErrorPagesHook from "./useErrorPagesHook";

const ErrorLinks = () => {

	const { errorPageLinks } = useErrorPagesHook();

	return (
		<>
			<StyledErrorPageLinks aria-label="Error Page Links" role="navigation">
				<h3>Popular Destinations</h3>
				{errorPageLinks().map((link, index) => (
					<li key={index}>
						<Link to={link.href}>{link.label}</Link>
					</li>
				))}
			</StyledErrorPageLinks>
		</>
	)
}

export default ErrorLinks;