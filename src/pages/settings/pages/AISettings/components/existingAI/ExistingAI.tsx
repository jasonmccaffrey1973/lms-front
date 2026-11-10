import AICard from "../AICard/AICard";
import useExistingAI from "./useExistingAI";

const ExistingAI = () => {

    const { getExistingAIModels } = useExistingAI();
    

    return (
        <div className="existing-ai">
            {getExistingAIModels().map((model, index) => (
                <AICard key={index} model={model} />
            ))}
        </div>
    );
}
export default ExistingAI;