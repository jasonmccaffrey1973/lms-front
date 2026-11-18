type InputProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: "text" | "number" | "password" | "email" | "url" | "tel" | "search" | "date" | "time" | "datetime-local" | "month" | "week" | "color";
    label?: string;
    required?: boolean;
    disabled?: boolean;
};

export type { InputProps };