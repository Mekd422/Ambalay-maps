import { useState, useEffect, type ReactNode } from 'react'
import axios from 'axios'
import { getCurrentUser } from '../api/auth'
import { setAuthToken } from '../api/axios'
import { AuthContext, type User } from './AuthContext'

const AUTH_TOKEN_STORAGE_KEY = 'token'

const getStoredToken = () => {
  if (typeof window === 'undefined') {
    return null
  }

  return (
    localStorage.getItem(AUTH_TOKEN_STORAGE_KEY) ??
    sessionStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
  )
}

const clearStoredToken = () => {
  if (typeof window === 'undefined') {
    return
  }

  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY)
  sessionStorage.removeItem(AUTH_TOKEN_STORAGE_KEY)
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(() => {
    return getStoredToken()
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

        if (axios.isAxiosError(err) && [401, 403].includes(err.response?.status ?? 0)) {
          setToken(null)
          setUser(null)
          clearStoredToken()
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
      localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, newToken)
      sessionStorage.removeItem(AUTH_TOKEN_STORAGE_KEY)
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    clearStoredToken()
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
