import { createContext } from "react"

export type AuthContextType = {
  token: string | null
  isAuthenticated: boolean
  setToken: (token: string | null, persist?: boolean) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
