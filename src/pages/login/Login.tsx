import { Link } from "react-router-dom"
import type { ComponentProps } from "react"
import {
    StyledLogin,
    StyledFormGroup,
    StyledFormLinks,
    StyledButtonGroup,
    StyledPasswordInputWrapper,
} from "./Login.styles"
import useLogin from "./useLogin"
import Render from "../../sharedComponents/Render"
import SVGIcon from "../../sharedComponents/SVG/SVGIcon"

type LoginProps = {
    pageForm?: "login" | "forgot-password" | "create-account" | "logout",
    errorMessage?: string
}

type FormProps = {
    onSubmit: NonNullable<ComponentProps<"form">["onSubmit"]>
    clearError: () => void
    isSubmitting?: boolean
}

type LoginFormProps = Omit<FormProps, "PasswordInput"> & {
    togglePasswordVisibility: () => void
    isPasswordVisible: boolean
}

/** ---------------------------------------------------------------------------------------
 * Renders the login page with different forms based on the `pageForm` prop.
 * @param pageForm Determines which form to display: "login", "forgot-password", or "create-account".
 * @param errorMessage Optional error message to display if there's an error.
 ** --------------------------------------------------------------------------------------- */
const Login = ({ pageForm = "login", errorMessage }: LoginProps) => {
    const {
        hasError,
        errorMsg,
        clearError,
        isLoginSubmitting,
        handleLoginSubmit,
        handleForgotPasswordSubmit,
        handleCreateAccountSubmit,
        togglePasswordVisibility,
        isPasswordVisible,
    } = useLogin(errorMessage)

    
    return (
        <StyledLogin>
            <main className="left-column">
                <Render if={hasError}>
                    <div className="error-message">{errorMsg}</div>
                </Render>
                <Render if={pageForm === "forgot-password"}>
                    <ForgotPasswordForm
                        onSubmit={handleForgotPasswordSubmit}
                        clearError={clearError}
                    />
                </Render>
                <Render if={pageForm === "create-account"}>
                    <CreateAccountForm
                        onSubmit={handleCreateAccountSubmit}
                        clearError={clearError}
                    />
                </Render>
                <Render if={pageForm === "login"}>
                    <LoginForm
                        onSubmit={handleLoginSubmit}
                        clearError={clearError}
                        isSubmitting={isLoginSubmitting}
                        togglePasswordVisibility={togglePasswordVisibility}
                        isPasswordVisible={isPasswordVisible}
                    />
                </Render>
            </main>
            <div className="right-column">Right Column</div>
        </StyledLogin>
    )
}

/** ---------------------------------------------------------------------------------------
 * Renders the login form with username/email, password, and helper links. 
 ** --------------------------------------------------------------------------------------- */
const LoginForm = ({ onSubmit, clearError, isSubmitting = false, togglePasswordVisibility, isPasswordVisible }: LoginFormProps) => {
    const passwordInputType = isPasswordVisible ? "text" : "password";
    return (
        <form method="post" onSubmit={onSubmit} onChange={clearError}>
            <StyledFormGroup>
                <label htmlFor="username">Username / Email</label>
                <input type="text" id="username" name="username" />
            </StyledFormGroup>
            <StyledFormGroup>
                <label htmlFor="password">Password</label>
                <StyledPasswordInputWrapper>
                    <input type={passwordInputType} id="password" name="password" />
                    <button type="button" onClick={togglePasswordVisibility}>
                        <SVGIcon icon={isPasswordVisible ? "visibilityOff" : "visibilityOn"} />
                    </button>
                </StyledPasswordInputWrapper>
            </StyledFormGroup>
            <StyledButtonGroup>
                <LoginLinks />
                <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>
            </StyledButtonGroup>
        </form>
    )
}

const LoginLinks = () => (
    <StyledFormLinks>
        <Link to="/forgot-password">Forgot your Password</Link>
        <Link to="/register">Create an Account</Link>
    </StyledFormLinks>
)

/** ---------------------------------------------------------------------------------------
 * Renders the forgot-password form for requesting a reset link by email. 
 ** --------------------------------------------------------------------------------------- */
const ForgotPasswordForm = ({ onSubmit, clearError }: FormProps) => {
    return (
        <form method="post" onSubmit={onSubmit} onChange={clearError}>
            <StyledFormGroup>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
            </StyledFormGroup>
            <StyledButtonGroup>
                <ForgotPasswordLinks />
                <button type="submit" className="btn btn-secondary">Send Reset Link</button>
            </StyledButtonGroup>
        </form>
    )
}

const ForgotPasswordLinks = () => (
    <StyledFormLinks>
        <Link to="/login">Return to Login</Link>
        {/* <Link to="/register">Create an Account</Link> */}
    </StyledFormLinks>
)

/** ---------------------------------------------------------------------------------------
 * Renders the create-account form for registering a new user.
 ** --------------------------------------------------------------------------------------- */
const CreateAccountForm = ({ onSubmit, clearError }: FormProps) => {
    return (
        <form method="post" onSubmit={onSubmit} onChange={clearError}>
            <StyledFormGroup>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" />
            </StyledFormGroup>
            <StyledFormGroup>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
            </StyledFormGroup>
            <StyledFormGroup>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />
            </StyledFormGroup>
            <StyledFormGroup>
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" name="confirm-password" />
            </StyledFormGroup>
            <StyledButtonGroup>
                <CreateAccountLinks />
                <button type="submit" className="btn btn-primary">Create Account</button>
            </StyledButtonGroup>
        </form>
    )
}

const CreateAccountLinks = () => (
    <StyledFormLinks>
        <Link to="/login">Return to Login</Link>
        {/* <Link to="/forgot-password">Forgot your Password</Link> */}
    </StyledFormLinks>
)

export default Login