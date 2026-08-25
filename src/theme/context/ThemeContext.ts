import { createContext } from "react"

export type ThemeMode = "system" | "light" | "dark"

export type ThemeContextType = {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
