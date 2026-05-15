import { useState, useEffect, type ReactNode } from 'react'
import { getCurrentUser } from '../api/auth'
import { setAuthToken } from '../api/axios'
import { AuthContext, type User } from './AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') {
      return null
    }

    return sessionStorage.getItem('token')
  })

  useEffect(() => {
    setAuthToken(token)

    if (!token) return

    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (err) {
        console.error('Failed to fetch user', err)
        setToken(null)
        setUser(null)
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('token')
        }
      }
    }

    fetchUser()
  }, [token])

  const login = async (newToken: string, newUser?: User | null) => {
    setToken(newToken)
    if (newUser) {
      setUser(newUser)
    }
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('token', newToken)
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('token')
    }
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
