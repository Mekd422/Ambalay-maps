'use client'

import { useEffect, useMemo } from 'react'
import {
  Users,
  MessageSquare,
  Key,
  UserCircle,
  Home,
  CreditCard,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AccountSettings from './Account'
import User from './User'
import ApiKeys from './ApiKeys'
import ContactMessages from './Messages'
import { useAuth } from '../../../context/useAuth'
import Organizations from './Organizations'
import Plans from './Plans'
import Usage from './Usage'
import MessageDetail from './MessageDetail'
import Billing from './Billing'
import BillingInvoiceDetail from './BillingInvoiceDetail'
import BillingReturn from './BillingReturn'

type DashboardPageProps = {
  slug: string[]
}

const adminNavItems = [
  { name: 'Users', path: '/dashboard/users', icon: <Users size={18} /> },
  {
    name: 'Messages',
    path: '/dashboard/messages',
    icon: <MessageSquare size={18} />,
  },
  { name: 'Plans', path: '/dashboard/plans', icon: <Key size={18} /> },
  {
    name: 'Organizations',
    path: '/dashboard/organizations',
    icon: <Users size={18} />,
  },
  {
    name: 'Account',
    path: '/dashboard/account',
    icon: <UserCircle size={18} />,
  },
]

const subjectNavItems = [
  { name: 'API Keys', path: '/dashboard/api-keys', icon: <Key size={18} /> },
  { name: 'Usage', path: '/dashboard/usage', icon: <MessageSquare size={18} /> },
  { name: 'Plans', path: '/dashboard/plans', icon: <Key size={18} /> },
  { name: 'Billing', path: '/dashboard/billing', icon: <CreditCard size={18} /> },
  { name: 'Account', path: '/dashboard/account', icon: <UserCircle size={18} /> },
]

const subjectAllowedSections = new Set([
  'home',
  'api-keys',
  'usage',
  'plans',
  'billing',
  'billing-invoice',
  'billing-return',
  'account',
])

const getSectionFromSlug = (slug: string[]) => {
  if (slug.length === 0) {
    return { section: 'home' as const }
  }

  if (slug[0] === 'messages' && slug[1]) {
    return { section: 'message-detail' as const, messageId: slug[1] }
  }

  if (slug[0] === 'billing' && slug[1] === 'invoices' && slug[2]) {
    return { section: 'billing-invoice' as const, invoiceId: slug[2] }
  }

  if (slug[0] === 'billing' && slug[1] === 'return') {
    return { section: 'billing-return' as const }
  }

  return { section: slug[0] }
}

export default function DashboardPage({ slug }: DashboardPageProps) {
  const router = useRouter()
  const { user, token } = useAuth()

  const routeState = useMemo(() => getSectionFromSlug(slug), [slug])
  const isAdmin = user?.accessLevel === 'ADMIN'

  useEffect(() => {
    if (!token) {
      router.replace('/login')
      return
    }

    if (!user) {
      return
    }

    if (isAdmin && routeState.section === 'home') {
      router.replace('/dashboard/users')
      return
    }

    if (!isAdmin && routeState.section === 'home') {
      router.replace('/dashboard/api-keys')
      return
    }

    if (!isAdmin && !subjectAllowedSections.has(routeState.section)) {
      router.replace('/dashboard/api-keys')
    }
  }, [isAdmin, routeState.section, router, token, user])

  if (!token) {
    return null
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-gray-300">
        Loading...
      </div>
    )
  }

  if (isAdmin && routeState.section === 'home') {
    return null
  }

  if (!isAdmin && !subjectAllowedSections.has(routeState.section)) {
    return null
  }

  const renderAdminContent = () => {
    switch (routeState.section) {
      case 'users':
        return <User />
      case 'messages':
        return <ContactMessages />
      case 'message-detail':
        return <MessageDetail messageId={routeState.messageId} />
      case 'plans':
        return <Plans />
      case 'organizations':
        return <Organizations />
      case 'account':
        return <AccountSettings />
      default:
        router.replace('/dashboard/users')
        return null
    }
  }

  const renderSubjectContent = () => {
    switch (routeState.section) {
      case 'api-keys':
        return <ApiKeys />
      case 'usage':
        return <Usage />
      case 'plans':
        return <Plans />
      case 'billing':
        return <Billing />
      case 'billing-invoice': {
        const invoiceId = 'invoiceId' in routeState ? routeState.invoiceId : null

        return invoiceId ? <BillingInvoiceDetail invoiceId={invoiceId} /> : null
      }
      case 'billing-return':
        return <BillingReturn />
      case 'account':
        return <AccountSettings />
      default:
        router.replace('/dashboard/api-keys')
        return null
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#000000] font-sans text-gray-100">
      <div className="flex flex-1 flex-col lg:flex-row">
        <aside className="hidden flex-shrink-0 flex-col border-r border-white/5 bg-[#000000] lg:flex lg:w-64">
          <div className="flex items-center gap-2 p-6">
            <Image
              src="/icons/ambalay-logo.png"
              alt="Logo"
              width={40}
              height={20}
              className="h-5 w-10"
            />
            <h4 className="text-md font-medium tracking-tight text-white">
              AmbaLay Maps
            </h4>
          </div>

          <div className="mt-4 px-4">
            <Link
              href="/"
              className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-400 transition-colors hover:text-white"
            >
              <span className="text-gray-500 group-hover:text-white">
                <Home size={18} />
              </span>
              Back to Home
            </Link>
          </div>

          <nav className="mt-2 flex-1 px-4">
            <p className="mb-4 px-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
              Navigation
            </p>
            <ul className="space-y-1">
              {isAdmin
                ? adminNavItems.map((item) => {
                    const active =
                      item.path === `/dashboard/${slug.join('/')}` ||
                      `/dashboard/${slug.join('/')}`.startsWith(`${item.path}/`)

                    return (
                      <li key={item.name}>
                        <Link
                          href={item.path}
                          className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                            active
                              ? 'rounded-l-none border-l-4 border-[#8cff2e] bg-[#8cff2e]/10 font-semibold text-[#8cff2e]'
                              : 'text-gray-400 transition-colors hover:text-white'
                          }`}
                        >
                          <span
                            className={
                              active
                                ? 'text-[#8cff2e]'
                                : 'text-gray-500 group-hover:text-white'
                            }
                          >
                            {item.icon}
                          </span>
                          {item.name}
                        </Link>
                      </li>
                    )
                  })
                : subjectNavItems.map((item) => {
                    const active =
                      item.path === `/dashboard/${slug.join('/')}` ||
                      `/dashboard/${slug.join('/')}`.startsWith(`${item.path}/`)

                    return (
                      <li key={item.name}>
                        <Link
                          href={item.path}
                          className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                            active
                              ? 'rounded-l-none border-l-4 border-[#8cff2e] bg-[#8cff2e]/10 font-semibold text-[#8cff2e]'
                              : 'text-gray-400 transition-colors hover:text-white'
                          }`}
                        >
                          <span
                            className={
                              active
                                ? 'text-[#8cff2e]'
                                : 'text-gray-500 group-hover:text-white'
                            }
                          >
                            {item.icon}
                          </span>
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    )
                  })}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto bg-[#070707] p-4 md:p-6 lg:p-10">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex flex-col gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white lg:hidden"
              >
                <Home size={18} />
                <span className="text-sm">Home</span>
              </Link>
              <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 lg:hidden">
                {isAdmin
                  ? adminNavItems.map((item) => {
                      const active =
                        item.path === `/dashboard/${slug.join('/')}` ||
                        `/dashboard/${slug.join('/')}`.startsWith(
                          `${item.path}/`,
                        )

                      return (
                        <Link
                          key={item.name}
                          href={item.path}
                          className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition-all ${
                            active
                              ? 'bg-[#8cff2e] text-black shadow-lg'
                              : 'bg-white/5 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          <span>{item.icon}</span>
                          <span>{item.name}</span>
                        </Link>
                      )
                    })
                  : subjectNavItems.map((item) => {
                      const active =
                        item.path === `/dashboard/${slug.join('/')}` ||
                        `/dashboard/${slug.join('/')}`.startsWith(
                          `${item.path}/`,
                        )

                      return (
                        <Link
                          key={item.name}
                          href={item.path}
                          className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition-all ${
                            active
                              ? 'bg-[#8cff2e] text-black shadow-lg'
                              : 'bg-white/5 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          <span>{item.icon}</span>
                          <span>{item.name}</span>
                        </Link>
                      )
                    })}
              </div>
            </div>

            {isAdmin ? renderAdminContent() : renderSubjectContent()}
          </div>
        </main>
      </div>
    </div>
  )
}
