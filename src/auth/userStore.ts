import type { AuthProfile } from "./context/AuthContext"

const AUTH_USER_KEY = "auth_user"

const loadPersistedUser = (): AuthProfile | null => {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<AuthProfile>

    return {
      firstName: typeof parsed.firstName === "string" ? parsed.firstName : null,
      lastName: typeof parsed.lastName === "string" ? parsed.lastName : null,
      avatarUrl: typeof parsed.avatarUrl === "string" ? parsed.avatarUrl : null,
    }
  } catch {
    return null
  }
}

export const getAuthUser = (): AuthProfile | null => {
  const cachedUser = loadPersistedUser()
  if (cachedUser) return cachedUser

  return null
}

export const setAuthUser = (user: AuthProfile | null) => {
  try {
    if (user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(AUTH_USER_KEY)
    }
  } catch {
    // ignore storage errors
  }
}
