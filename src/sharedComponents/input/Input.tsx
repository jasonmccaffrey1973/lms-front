import { StyledInputWrapper } from "./Input.styles";
import type { InputProps } from "./Input.types";
import useInput from "./useInput";

const Input = ({ value, onChange, placeholder, label, type = "text" }: InputProps) => {
    const { id: inputId, onChange: handleChange, value: inputValue } = useInput({value, onChange});
    return (
        <StyledInputWrapper>
            <label htmlFor={inputId}>
                {label}
            </label>
            <input
                id={inputId}
                value={inputValue}
                onChange={(e) => {
                    onChange(e.target.value);
                    handleChange(e.target.value);
                }}
                placeholder={placeholder}
                type={type}
            />

        </StyledInputWrapper>
    );
};

export default Input;