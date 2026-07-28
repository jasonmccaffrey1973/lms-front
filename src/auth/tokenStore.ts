const AUTH_TOKEN_KEY = "auth_token"

const loadPersistedToken = () => {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY)
  } catch {
    return null
  }
}

let currentToken: string | null = loadPersistedToken()

export const getAuthToken = () => currentToken

export const setAuthToken = (token: string | null, persist = false) => {
  currentToken = token

  try {
    if (persist && token) {
      localStorage.setItem(AUTH_TOKEN_KEY, token)
    } else {
      localStorage.removeItem(AUTH_TOKEN_KEY)
    }
  } catch {
    // ignore storage errors
  }
}