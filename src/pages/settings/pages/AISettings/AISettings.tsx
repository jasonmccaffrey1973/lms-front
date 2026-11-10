import { StyledSettingsPageWrapper } from "../../settings.styles";
import ExistingAI from "./components/existingAI/ExistingAI";
// import NewAIForm from "./components/newAIForm/NewAIForm";

const AISettings = () => {
    return (
        <StyledSettingsPageWrapper>
            <ExistingAI />
            {/* <NewAIForm /> */}
        </StyledSettingsPageWrapper>
    );
};

export default AISettings;