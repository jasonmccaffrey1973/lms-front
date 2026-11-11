import type { aiFormSubmitEvent } from "./aiForm.types";

const useAIForm = () => {
    const handleAiFirmSubmit = (e: aiFormSubmitEvent) => {
        e.preventDefault();
        // Add your form submission logic here
    };

    return {
        handleAiFirmSubmit,
    };
};

export default useAIForm;
