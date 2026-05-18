import { createContext } from 'react'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role?: string
  accessLevel: 'SUBJECT' | 'ADMIN'
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string, user?: User | null) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
