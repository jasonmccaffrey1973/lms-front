import { useContext } from "react"
import { ApolloContext } from "../context/ApolloContext"

export const useApollo = () => {
  const context = useContext(ApolloContext)
  if (!context) {
    throw new Error("useApollo must be used within an ApolloProvider")
  }
  return context
}

export default useApollo
