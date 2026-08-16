import { createContext } from "react"
import type { NavigationItem } from "../../queries/useNavigationQueries"

export type UserLinksContextValue = {
  links: NavigationItem[]
  loading: boolean
  error?: Error
}

export const UserLinksContext = createContext<UserLinksContextValue | undefined>(undefined)
