import { AuthTokens } from '@/types/auth'

const AUTH_TOKENS_KEY = 'auth_tokens'

export function getAuthTokens(): AuthTokens | null {
  if (typeof window === 'undefined') return null
  
  const tokens = localStorage.getItem(AUTH_TOKENS_KEY)
  return tokens ? JSON.parse(tokens) : null
}

export function setAuthTokens(tokens: AuthTokens): void {
  localStorage.setItem(AUTH_TOKENS_KEY, JSON.stringify(tokens))
}

export function removeAuthTokens(): void {
  localStorage.removeItem(AUTH_TOKENS_KEY)
}

