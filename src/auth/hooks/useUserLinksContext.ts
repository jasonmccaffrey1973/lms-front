import { useContext } from "react"
import { UserLinksContext } from "../context/UserLinksContext"

export const useUserLinksContext = () => {
  const context = useContext(UserLinksContext)
  if (!context) {
    throw new Error("useUserLinksContext must be used within a UserLinksProvider")
  }

  return context
}

export default useUserLinksContext
