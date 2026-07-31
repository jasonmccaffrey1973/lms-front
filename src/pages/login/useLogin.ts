import type { ComponentProps } from "react"
import { useEffect, useRef, useState } from "react"
import { useApolloClient } from "@apollo/client/react"
import { useLoginMutation, useRegisterMutation } from "../../queries/useLoginQueries"
import { ME_GQL } from "../../queries/authQueries.ts"
import { useAuth } from "../../auth"
import { useNavigate } from "react-router-dom"

const isObjectRecord = (value: unknown): value is Record<string, unknown> => {
    return typeof value === "object" && value !== null
}

const readStatusCode = (value: unknown): number | undefined => {
    if (!isObjectRecord(value)) {
        return undefined
    }

    const statusCode = value.statusCode
    if (typeof statusCode === "number") {
        return statusCode
    }

    return undefined
}

const isUnauthorizedError = (error: unknown) => {
    const directStatus = readStatusCode(error)
    if (directStatus === 401) {
        return true
    }

    if (isObjectRecord(error)) {
        const networkStatus = readStatusCode(error.networkError)
        if (networkStatus === 401) {
            return true
        }

        const causeStatus = readStatusCode(error.cause)
        if (causeStatus === 401) {
            return true
        }

        const message = error.message
        if (typeof message === "string") {
            const normalized = message.toLowerCase()
            if (normalized.includes("unauthorized") || normalized.includes("401")) {
                return true
            }
        }
    }

    return false
}


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
    const [isLoginSubmitting, setIsLoginSubmitting] = useState(false)
    const isMountedRef = useRef(true)
    const { setToken, logout } = useAuth()
    const navigate = useNavigate()
    const apolloClient = useApolloClient()
    const { login: performLogin } = useLoginMutation()
    const { register: performRegister } = useRegisterMutation()

    useEffect(() => {
        return () => {
            isMountedRef.current = false
        }
    }, [])

    const setLoginSubmitting = (value: boolean) => {
        if (isMountedRef.current) {
            setIsLoginSubmitting(value)
        }
    }

    const verifyTokenAndNavigate = async (failureMsg: string) => {
        try {
            const verifyResp = await apolloClient.query({
                query: ME_GQL,
                fetchPolicy: "no-cache",
            })

            const me = verifyResp.data?.me
            if (!me) {
                throw new Error("Token verification returned no user")
            }

            navigate("/dashboard")
            return true
        }
        catch (err) {
            logout()
            void apolloClient.clearStore().catch(() => undefined)
            setHasError(true)
            if (isUnauthorizedError(err)) {
                setErrorMsg("Session validation failed. Please sign in again.")
            }
            else {
                setErrorMsg(failureMsg?.toString() || "")
            }
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
        setLoginSubmitting(true)
        const formData = new FormData(e.currentTarget)
        const loginValue = getFieldValue(formData, "username")
        const password = getFieldValue(formData, "password")

        if (!loginValue || !password) {
            setHasError(true)
            setErrorMsg("Username/email and password are required.")
            setLoginSubmitting(false)
            return
        }

        void (async () => {
            try {
                const response = await performLogin({
                    variables: {
                        login: loginValue,
                        password,
                        deviceName: "web-client",
                    },
                    errorPolicy: "all",
                })

                if (response.error) {
                    setHasError(true)
                    setErrorMsg(response.error.message || "Login failed.")
                    setLoginSubmitting(false)
                    return
                }

                const token = response.data?.login?.token
                if (!token) {
                    setHasError(true)
                    setErrorMsg("Login failed: token was not returned by the server.")
                    setLoginSubmitting(false)
                    return
                }

                clearError()
                // set token in memory and persist to localStorage
                setToken(token, true)
                // verify token by requesting current user, then redirect
                if (!(await verifyTokenAndNavigate("Login failed: token validation failed."))) {
                    setLoginSubmitting(false)
                    return
                }

                setLoginSubmitting(false)
                console.log("Login successful", {
                    token,
                    user: response.data?.login?.user,
                })
            }
            catch (err) {
                console.error("Login request failed:", err)
                setHasError(true)
                setErrorMsg("Unable to reach the server. Please try again.")
                setLoginSubmitting(false)
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
                const response = await performRegister({
                    variables: {
                        name: username,
                        username,
                        email,
                        password,
                        passwordConfirmation,
                        deviceName: "web-client",
                    },
                    errorPolicy: "all",
                })

                if (response.error) {
                    setHasError(true)
                    setErrorMsg(response.error.message || "Create account failed.")
                    return
                }

                const token = response.data?.register?.token
                if (!token) {
                    setHasError(true)
                    setErrorMsg("Create account failed: token was not returned by the server.")
                    return
                }

                clearError()
                // set token in memory and persist to localStorage
                setToken(token, true)
                // verify token by requesting current user, then redirect
                if (!(await verifyTokenAndNavigate("Registration succeeded but token validation failed."))) {
                    return
                }
                console.log("Registration successful", {
                    token,
                    user: response.data?.register?.user,
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
        isLoginSubmitting,
        handleLoginSubmit,
        handleForgotPasswordSubmit,
        handleCreateAccountSubmit,
    }
}

export default useLogin