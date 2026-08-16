import { createContext } from "react"

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

export const ApolloContext = createContext<ApolloState | undefined>(undefined)
