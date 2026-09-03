import { useState, useId } from "react";

const useInput = ({ value: initialValue, onChange: externalOnChange }: { value: string; onChange: (value: string) => void; }) => {
    const [value, setValue] = useState(initialValue);
    const handleChange = (newValue: string) => {
        setValue(newValue);
        externalOnChange(newValue);
    };

    const inputId = useId(); // Generate a unique ID for the input element

    return {
        value,
        onChange: handleChange,
        id: inputId,
    };
};

export default useInput;