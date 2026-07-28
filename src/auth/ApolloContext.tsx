import React, { createContext, useCallback, useContext, useMemo, useState } from "react"
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import { ApolloProvider as ApolloReactProvider } from "@apollo/client/react"

export interface ApolloConfig {
  endpoint: string
  headers?: Record<string, string>
}

export interface ApolloState {
  config: ApolloConfig | null
  setConfig: (config: ApolloConfig) => void
  clearConfig: () => void
  isReady: boolean
}

const ApolloContext = createContext<ApolloState | undefined>(undefined)

const buildClient = (config: ApolloConfig | null) => {
  const endpoint = config?.endpoint ?? ""

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: endpoint,
      headers: config?.headers,
    }),
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

export const useApollo = () => {
  const context = useContext(ApolloContext)
  if (!context) {
    throw new Error("useApollo must be used within an ApolloProvider")
  }
  return context
}
