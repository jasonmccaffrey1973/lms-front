import React, { useCallback, useMemo, useState } from "react"
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import { CombinedGraphQLErrors } from "@apollo/client/errors"
import { onError } from "@apollo/client/link/error"
import { setContext } from "@apollo/client/link/context"
import { ApolloProvider as ApolloReactProvider } from "@apollo/client/react"
import { getAuthToken, setAuthToken } from "../tokenStore"
import { setAuthUser } from "../userStore"
import { ApolloContext, type ApolloConfig } from "../context/ApolloContext"

const AUTH_ERROR_MESSAGES = new Set(["Authentication is required.", "Unauthenticated."])

const handleUnauthorized = () => {
  setAuthToken(null, false)
  setAuthUser(null)
  if (typeof window === "undefined") return
  if (window.location.pathname === "/login") return
  window.location.assign("/login")
}

const buildClient = (config: ApolloConfig | null) => {
  const endpoint = config?.endpoint ?? ""
  const httpLink = new HttpLink({ uri: endpoint })
  const errorLink = onError(({ error }) => {
    if (CombinedGraphQLErrors.is(error)) {
      const hasAuthMessage = error.errors.some((item) => AUTH_ERROR_MESSAGES.has(item.message))
      if (hasAuthMessage) {
        handleUnauthorized()
        return
      }
    }

    if ("statusCode" in error && error.statusCode === 401) {
      handleUnauthorized()
    }
  })
  const authLink = setContext((_, { headers }) => {
    const token = getAuthToken()

    return {
      headers: {
        ...config?.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    }
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: errorLink.concat(authLink).concat(httpLink),
  })
}

export const ApolloProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const defaultEndpoint = import.meta.env.VITE_GRAPHQL_HTTP_URL

  const [config, setConfigState] = useState<ApolloConfig | null>(() => {
    if (typeof defaultEndpoint === "string" && defaultEndpoint.trim().length > 0) {
      return { endpoint: defaultEndpoint.trim() }
    }
    return null
  })

  const setConfig = useCallback((newConfig: ApolloConfig) => {
    setConfigState(newConfig)
  }, [])

  const clearConfig = useCallback(() => {
    setConfigState(null)
  }, [])

  const client = useMemo(() => buildClient(config), [config])
  const isReady = Boolean(config?.endpoint)

  return (
    <ApolloContext.Provider value={{ config, setConfig, clearConfig, isReady }}>
      <ApolloReactProvider client={client}>{children}</ApolloReactProvider>
    </ApolloContext.Provider>
  )
}

export default ApolloProvider
