import React, { useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { getAuthToken, setAuthToken } from "../tokenStore"

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(() => getAuthToken())

  const setToken = (t: string | null, persist = false) => {
    setAuthToken(t, persist)
    setTokenState(t)
  }

  const logout = () => setToken(null, false)

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: Boolean(token), setToken, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
