import PageTemplate from "../../templates/PageTemplate"
import { StyledBackdropImage, StyledContentRibbon, StyledStatusCode, StyledMessage, StyledSearchWrapper, StyledLinksWrapper } from "./error.styles"
import STATUS_CODES from "../../constants"
import ErrorSearch from "./ErrorSearch";
import ErrorLinks from "./ErrorLinks";
import useErrorBackdropImages from "./useErrorBackdropImages";



/** -------------------------------------------------------------------------------
 * Error component that renders the error page with a backdrop image, status code,
 * friendly message, search component, and links component.
 * @param param0 Object containing the status code.
 * @returns JSX.Element representing the error page.
 * ------------------------------------------------------------------------------- */
const ErrorPage = ({ statusCode }: { statusCode: number }) => {
	const {  displayText, friendlyMessage } = STATUS_CODES[statusCode as keyof typeof STATUS_CODES] ?? { displayText: "404", friendlyMessage: "Page Not Found" };
	const backdropImages = useErrorBackdropImages(statusCode);

	return (
		<PageTemplate>
			<StyledBackdropImage
				$horizontalImage={backdropImages.horizontal}
				$verticalImage={backdropImages.vertical}
			>
				<StyledContentRibbon>
					<StyledStatusCode>
						<h1>{displayText}</h1>
					</StyledStatusCode>
					<StyledMessage>
						<h2>{friendlyMessage}</h2>
					</StyledMessage>
					<StyledSearchWrapper>
						<ErrorSearch />
					</StyledSearchWrapper>
					<StyledLinksWrapper>
						<ErrorLinks />	
					</StyledLinksWrapper>
				</StyledContentRibbon>
			</StyledBackdropImage>
		</PageTemplate>
	)
}

export default ErrorPage