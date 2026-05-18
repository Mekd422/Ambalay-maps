'use client'

import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import NextLink from 'next/link'
import {
  useParams as useNextParams,
  usePathname,
  useRouter,
} from 'next/navigation'

const NAVIGATION_STATE_KEY = '__next_router_state__'

type NavigateOptions = {
  replace?: boolean
  state?: unknown
}

type ToValue = string

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string
  children: ReactNode
}

const readNavigationState = (href: string) => {
  if (typeof window === 'undefined') {
    return null
  }

  const raw = sessionStorage.getItem(NAVIGATION_STATE_KEY)

  if (!raw) {
    return null
  }

  try {
    const stored = JSON.parse(raw) as Record<string, unknown>
    return stored[href] ?? null
  } catch {
    return null
  }
}

const writeNavigationState = (href: string, state: unknown) => {
  if (typeof window === 'undefined') {
    return
  }

  const raw = sessionStorage.getItem(NAVIGATION_STATE_KEY)
  let stored: Record<string, unknown> = {}

  if (raw) {
    try {
      stored = JSON.parse(raw) as Record<string, unknown>
    } catch {
      stored = {}
    }
  }

  if (state == null) {
    delete stored[href]
  } else {
    stored[href] = state
  }

  sessionStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(stored))
}

export function Link({ to, children, ...props }: LinkProps) {
  return (
    <NextLink href={to} {...props}>
      {children}
    </NextLink>
  )
}

export const HashLink = Link
export const NavLink = Link

export function useNavigate() {
  const router = useRouter()

  return (to: ToValue | number, options?: NavigateOptions) => {
    if (typeof to === 'number') {
      window.history.go(to)
      return
    }

    writeNavigationState(to, options?.state)

    if (options?.replace) {
      router.replace(to)
      return
    }

    router.push(to)
  }
}

export function useLocation() {
  const pathname = usePathname()
  const [search, setSearch] = useState('')
  const [hash, setHash] = useState('')

  useEffect(() => {
    const syncLocation = () => {
      setHash(window.location.hash)
      setSearch(window.location.search)
    }

    syncLocation()
    window.addEventListener('hashchange', syncLocation)
    window.addEventListener('popstate', syncLocation)

    return () => {
      window.removeEventListener('hashchange', syncLocation)
      window.removeEventListener('popstate', syncLocation)
    }
  }, [pathname])

  const href = `${pathname}${search}${hash}`

  return {
    pathname,
    search,
    hash,
    state:
      readNavigationState(href) ?? readNavigationState(`${pathname}${search}`),
  }
}

export function useSearchParams(): [
  URLSearchParams,
  (
    next: URLSearchParams | string | string[][] | Record<string, string>,
    options?: { replace?: boolean },
  ) => void,
] {
  const pathname = usePathname()
  const router = useRouter()
  const [search, setSearch] = useState('')

  useEffect(() => {
    const syncSearch = () => setSearch(window.location.search)

    syncSearch()
    window.addEventListener('popstate', syncSearch)

    return () => window.removeEventListener('popstate', syncSearch)
  }, [pathname])

  const currentParams = useMemo(() => new URLSearchParams(search), [search])

  const setSearchParams = (
    next: URLSearchParams | string | string[][] | Record<string, string>,
    options?: { replace?: boolean },
  ) => {
    const params =
      next instanceof URLSearchParams ? next : new URLSearchParams(next)
    const href = params.toString()
      ? `${pathname}?${params.toString()}`
      : pathname
    setSearch(params.toString() ? `?${params.toString()}` : '')

    if (options?.replace) {
      router.replace(href)
      return
    }

    router.push(href)
  }

  return [currentParams, setSearchParams]
}

export function useParams<T extends Record<string, string | string[]>>() {
  return useNextParams<T>()
}

export function Navigate({
  to,
  replace = false,
}: {
  to: string
  replace?: boolean
}) {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(to, { replace })
  }, [navigate, replace, to])

  return null
}

export function BrowserRouter({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export function Routes({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export function Route(props: {
  path?: string
  element?: ReactNode
  children?: ReactNode
  index?: boolean
}) {
  void props
  return null
}
