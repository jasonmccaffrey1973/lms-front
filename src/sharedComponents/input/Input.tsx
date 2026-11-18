import { StyledInputWrapper } from "./Input.styles";
import type { InputProps } from "./Input.types";
import useInput from "./useInput";

const Input = ({ value, onChange, placeholder, label, type = "text", required, disabled }: InputProps) => {
    const { id: inputId } = useInput();
    
    const shouldDisableAutocomplete = type === 'password';

    return (
        <StyledInputWrapper>
            <label htmlFor={inputId}>
                {label}
            </label>
            <input
                id={inputId}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                type={type}
                required={required}
                disabled={disabled}
                autoComplete={shouldDisableAutocomplete ? 'new-password' : 'off'}
            />

        </StyledInputWrapper>
    );
};

export default Input;