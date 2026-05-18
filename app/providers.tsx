'use client'

import type { ReactNode } from 'react'
import { AuthProvider } from '../src/context/AuthProvider'
import { ThemeProvider } from '../src/context/ThemeContext'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  )
}
