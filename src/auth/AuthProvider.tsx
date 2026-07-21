import React, { useState } from "react"
import { AuthContext } from "./AuthContext"

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(() => {
    try {
      return localStorage.getItem("auth_token")
    } catch {
      return null
    }
  })

  const setToken = (t: string | null, persist = false) => {
    setTokenState(t)
    try {
      if (persist && t) {
        localStorage.setItem("auth_token", t)
      } else {
        localStorage.removeItem("auth_token")
      }
    } catch {
      // ignore storage errors
    }
  }

  const logout = () => setToken(null, false)

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: Boolean(token), setToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
