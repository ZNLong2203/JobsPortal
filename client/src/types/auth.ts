export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface User {
  id: string
  email: string
  role: 'admin' | 'hr' | 'user'
  name: string
}

