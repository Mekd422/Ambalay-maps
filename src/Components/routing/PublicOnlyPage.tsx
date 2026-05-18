'use client'

import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../context/useAuth'

export default function PublicOnlyPage({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { token, user } = useAuth()

  useEffect(() => {
    if (token && user) {
      router.replace('/dashboard')
    }
  }, [router, token, user])

  if (token && user) {
    return null
  }

  return <>{children}</>
}
