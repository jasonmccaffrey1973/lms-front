import { createContext } from "react"

export type AuthProfile = {
  firstName?: string | null
  lastName?: string | null
  avatarUrl?: string | null
}

export type AuthContextType = {
  token: string | null
  user: AuthProfile | null
  isAuthenticated: boolean
  setToken: (token: string | null, persist?: boolean) => void
  setUser: (user: AuthProfile | null) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
