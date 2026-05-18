import axios from 'axios'

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export const setAuthToken = (token: string | null) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete API.defaults.headers.common['Authorization']
  }
}

const handleUnauthorized = (error: unknown) => {
  if (
    axios.isAxiosError(error) &&
    error.response?.status === 401
  ) {
    const authHeader = error.config?.headers?.Authorization

    if (typeof window !== 'undefined' && authHeader) {
      localStorage.removeItem('token')
      sessionStorage.removeItem('token')
      setAuthToken(null)
    }
  }

  return Promise.reject(error)
}

API.interceptors.response.use((response) => response, handleUnauthorized)

export default API
