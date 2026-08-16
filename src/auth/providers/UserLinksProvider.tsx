import React, { useMemo } from "react"
import { useAuth } from "../hooks/useAuth"
import { useUserLinks } from "../../queries/useNavigationQueries"
import { UserLinksContext, type UserLinksContextValue } from "../context/UserLinksContext"

export const UserLinksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth()
  const { data, loading, error } = useUserLinks(token)

  const links = useMemo(() => {
    if (!token) {
      return []
    }

    return data?.navigation ?? []
  }, [data, token])

  const value = useMemo<UserLinksContextValue>(
    () => ({
      links,
      loading,
      error,
    }),
    [links, loading, error],
  )

  return <UserLinksContext.Provider value={value}>{children}</UserLinksContext.Provider>
}

export default UserLinksProvider
