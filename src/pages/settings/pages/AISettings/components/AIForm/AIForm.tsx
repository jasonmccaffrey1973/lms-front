import StyledAIForm from "./aiForm.styles";
import useAIForm from "./useAIForm";

const AIForm = () => {
    const { handleAiFirmSubmit } = useAIForm();
    return (
        <StyledAIForm method="post" onSubmit={(e) => handleAiFirmSubmit(e)}>

        </StyledAIForm>
    );
};

export default AIForm;