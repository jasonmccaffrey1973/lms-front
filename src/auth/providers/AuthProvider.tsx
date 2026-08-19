import React, { useState } from "react"
import { AuthContext, type AuthProfile } from "../context/AuthContext"
import { getAuthToken, setAuthToken } from "../tokenStore"
import { getAuthUser, setAuthUser } from "../userStore"

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(() => getAuthToken())
  const [user, setUserState] = useState<AuthProfile | null>(() => getAuthUser())

  const setToken = (t: string | null, persist = false) => {
    setAuthToken(t, persist)
    setTokenState(t)
  }

  const setUser = (nextUser: AuthProfile | null) => {
    setAuthUser(nextUser)
    setUserState(nextUser)
  }

  const logout = () => {
    setToken(null, false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: Boolean(token), setToken, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
