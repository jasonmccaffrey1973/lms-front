import { useEffect, useMemo, useState } from "react"
import { ThemeContext, type ThemeMode } from "../context/ThemeContext"

const THEME_STORAGE_KEY = "app-theme"

const getStoredTheme = (): ThemeMode => {
  const value = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (value === "light" || value === "dark" || value === "system") {
    return value
  }
  return "system"
}

const applyThemeToRoot = (theme: ThemeMode) => {
  const root = document.documentElement

  if (theme === "system") {
    root.removeAttribute("data-theme")
    root.style.colorScheme = "light dark"
    return
  }

  root.setAttribute("data-theme", theme)
  root.style.colorScheme = theme
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => getStoredTheme())

  useEffect(() => {
    applyThemeToRoot(theme)
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const value = useMemo(() => ({ theme, setTheme }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
