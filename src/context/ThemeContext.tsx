import { createContext, useEffect, useState } from 'react'

type Theme = 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme] = useState<Theme>('dark')

  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  const toggleTheme = () => {
    // Theme switching has been removed, this is intentionally a no-op.
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext }
