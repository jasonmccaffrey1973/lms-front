import { useId } from "react";

const useInput = () => {
    const inputId = useId();

    return {
        id: inputId,
    };
};

export default useInput;