import type { IAIModel } from "./aICard.types";
import { useId } from "react";

import Button from "../../../../../../sharedComponents/Button/Button";
import SVGButton from "../../../../../../sharedComponents/buttons/SVGButton/SVGButton";
import SVGIcon from "../../../../../../sharedComponents/SVG/SVGIcon";
import StyledAICard from "./aICard.styles";
import useAICard from "./useAICard";

const AICard = ({ model }: { model: IAIModel }) => {
    const { isExpanded, toggleExpanded, isEditing, toggleEditing } = useAICard();
    const contentId = useId();
    return (
        <StyledAICard data-expanded={isExpanded}>
            <header>
                <Button 
                    color="transparent"
                    className="title"
                    onClick={toggleExpanded}
                    aria-expanded={isExpanded}
                    aria-controls={contentId}
                >
                    {model.name}
                </Button>
                <SVGButton
                    image={<SVGIcon icon={isEditing ? "close" : "editSquare"} />}
                    color="transparent"
                    className="edit-button"
                    onClick={toggleEditing}
                />
            </header>
            <div
                id={contentId}
                className="content"
                aria-expanded={isExpanded}
                aria-hidden={!isExpanded}
            >
            </div>
            <footer>
                
            </footer>
        </StyledAICard>        
    );
}

export default AICard;
