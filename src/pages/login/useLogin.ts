import type { ComponentProps } from "react"
import { useState } from "react"
import { useAuth } from "../../auth"
import { useNavigate } from "react-router-dom"

const GRAPHQL_HTTP_URL = import.meta.env.VITE_GRAPHQL_HTTP_URL

type GraphQLError = {
    message?: string
}

type LoginMutationResponse = {
    data?: {
        login?: {
            token?: string
            user?: {
                id?: string
                username?: string
                email?: string
            }
        }
    }
    errors?: GraphQLError[]
}

type RegisterMutationResponse = {
    data?: {
        register?: {
            token?: string
            user?: {
                id?: string
                username?: string
                email?: string
            }
        }
    }
    errors?: GraphQLError[]
}

const LOGIN_MUTATION = `
mutation Login($login: String!, $password: String!, $deviceName: String) {
    login(login: $login, password: $password, device_name: $deviceName) {
    token
    user {
      id
      username
      email
    }
  }
}
`

const REGISTER_MUTATION = `
mutation Register(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
    $passwordConfirmation: String!
    $deviceName: String
) {
    register(
        name: $name
        username: $username
        email: $email
        password: $password
        password_confirmation: $passwordConfirmation
        device_name: $deviceName
    ) {
        token
        user {
            id
            username
            email
        }
    }
}
`

const getFieldValue = (formData: FormData, key: string) => {
    const value = formData.get(key)
    if (typeof value !== "string") {
        return ""
    }
    return value.trim()
}


/** =======================================================================================
 * Custom hook for managing login-related forms and their state.
 * @param initialErrorMessage Optional initial error message to display.
 * @returns An object containing state and handlers for login, forgot-password, and 
 * create-account forms.
 ** ======================================================================================== */

const useLogin = (initialErrorMessage?: string) => {
    const [hasError, setHasError] = useState(Boolean(initialErrorMessage))
    const [errorMsg, setErrorMsg] = useState(initialErrorMessage || "")
    const { setToken, logout } = useAuth()
        const navigate = useNavigate()

    const verifyTokenAndNavigate = async (token: string, failureMsg: string) => {
        try {
            const verifyResp = await fetch(GRAPHQL_HTTP_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ query: `query Me { me { id username email } }` }),
            })

            if (!verifyResp.ok) {
                throw new Error(`Token verification failed (${verifyResp.status})`)
            }

            const verifyPayload = await verifyResp.json()
            const me = verifyPayload?.data?.me
            if (!me) {
                throw new Error("Token verification returned no user")
            }

            navigate("/dashboard")
            return true
        }
        catch (err) {
            logout()
            setHasError(true)
            setErrorMsg(failureMsg?.toString() || "")
            console.error("Token verification failed:", err)
            return false
        }
    }

    /** ---------------------------------------------------------------------------------------
     * Clears the error state and message.
     ** --------------------------------------------------------------------------------------- */
    const clearError = () => {
        setHasError(false)
        setErrorMsg("")
    }

    /** ---------------------------------------------------------------------------------------
     * Handles the login form submission.
     * @param e The form submission event.
     ** --------------------------------------------------------------------------------------- */
    const handleLoginSubmit: NonNullable<ComponentProps<"form">["onSubmit"]> = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const login = getFieldValue(formData, "username")
        const password = getFieldValue(formData, "password")

        if (!login || !password) {
            setHasError(true)
            setErrorMsg("Username/email and password are required.")
            return
        }

        void (async () => {
            try {
                const response = await fetch(GRAPHQL_HTTP_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        query: LOGIN_MUTATION,
                        variables: {
                            login,
                            password,
                            deviceName: "web-client",
                        },
                    }),
                })

                if (!response.ok) {
                    setHasError(true)
                    setErrorMsg(`Login request failed (${response.status}).`)
                    return
                }

                const payload = await response.json() as LoginMutationResponse

                if (payload.errors?.length) {
                    setHasError(true)
                    setErrorMsg(payload.errors[0]?.message || "Login failed.")
                    return
                }

                const token = payload.data?.login?.token
                if (!token) {
                    setHasError(true)
                    setErrorMsg("Login failed: token was not returned by the server.")
                    return
                }

                clearError()
                // set token in memory and persist to localStorage
                setToken(token, true)
                // verify token by requesting current user, then redirect
                if (!(await verifyTokenAndNavigate(token, "Login failed: token validation failed."))) {
                    return
                }
                console.log("Login successful", {
                    token,
                    user: payload.data?.login?.user,
                })
            }
            catch (err) {
                console.error("Login request failed:", err)
                setHasError(true)
                setErrorMsg("Unable to reach the server. Please try again.")
            }
        })()
    }

    /** ---------------------------------------------------------------------------------------
     * Handles the forgot-password form submission.
     * @param e The form submission event.
     ** --------------------------------------------------------------------------------------- */
    const handleForgotPasswordSubmit: NonNullable<ComponentProps<"form">["onSubmit"]> = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const email = formData.get("email")
        console.log({ email })
    }

    /** ---------------------------------------------------------------------------------------
     * Handles the create-account form submission.
     * @param e The form submission event.
     ** --------------------------------------------------------------------------------------- */
    const handleCreateAccountSubmit: NonNullable<ComponentProps<"form">["onSubmit"]> = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const username = getFieldValue(formData, "username")
        const email = getFieldValue(formData, "email")
        const password = getFieldValue(formData, "password")
        const passwordConfirmation = getFieldValue(formData, "confirm-password")

        if (!username || !email || !password || !passwordConfirmation) {
            setHasError(true)
            setErrorMsg("All fields are required.")
            return
        }

        if (password !== passwordConfirmation) {
            setHasError(true)
            setErrorMsg("Passwords do not match.")
            return
        }

        void (async () => {
            try {
                const response = await fetch(GRAPHQL_HTTP_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        query: REGISTER_MUTATION,
                        variables: {
                            name: username,
                            username,
                            email,
                            password,
                            passwordConfirmation,
                            deviceName: "web-client",
                        },
                    }),
                })

                if (!response.ok) {
                    setHasError(true)
                    setErrorMsg(`Create account request failed (${response.status}).`)
                    return
                }

                const payload = await response.json() as RegisterMutationResponse

                if (payload.errors?.length) {
                    setHasError(true)
                    setErrorMsg(payload.errors[0]?.message || "Create account failed.")
                    return
                }

                const token = payload.data?.register?.token
                if (!token) {
                    setHasError(true)
                    setErrorMsg("Create account failed: token was not returned by the server.")
                    return
                }

                clearError()
                // set token in memory and persist to localStorage
                setToken(token, true)
                // verify token by requesting current user, then redirect
                if (!(await verifyTokenAndNavigate(token, "Registration succeeded but token validation failed."))) {
                    return
                }
                console.log("Registration successful", {
                    token,
                    user: payload.data?.register?.user,
                })
            }
            catch (err) {
                console.error("Registration request failed:", err)  
                setHasError(true)
                setErrorMsg("Unable to reach the server. Please try again.")
            }
        })()
    }

    /** ---------------------------------------------------------------------------------------
     * Returns the state and handlers for the login forms.
     ** --------------------------------------------------------------------------------------- */
    return {
        hasError,
        errorMsg,
        setHasError,
        setErrorMsg,
        clearError,
        handleLoginSubmit,
        handleForgotPasswordSubmit,
        handleCreateAccountSubmit,
    }
}

export default useLogin