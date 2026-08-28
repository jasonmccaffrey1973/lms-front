import { forwardRef } from "react";
import StyledButton from "./Button.styles";
import type { ButtonProps } from "./Button.types";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            action,
            onClick,
            type = "button",
            color,
            textColor,
            children,
            ...rest
        },
        ref
    ) => {
        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (action) action();
            if (onClick) onClick(e);
        };

        return (
            <StyledButton
                ref={ref}
                type={type}
                $color={color}
                $textColor={textColor}
                onClick={handleClick}
                {...rest}
            >
                {children}
            </StyledButton>
        );
    }
);

Button.displayName = "Button";

export default Button;