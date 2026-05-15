'use client'

import { useEffect, useMemo, useState } from 'react'
import { Users, MessageSquare, Key, UserCircle, Home } from 'lucide-react'
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

type DashboardPageProps = {
  slug: string[]
}

const adminNavItems = [
  { name: 'Users', path: '/dashboard/users', icon: <Users size={18} /> },
  { name: 'Messages', path: '/dashboard/messages', icon: <MessageSquare size={18} /> },
  { name: 'Plans', path: '/dashboard/plans', icon: <Key size={18} /> },
  { name: 'Organizations', path: '/dashboard/organizations', icon: <Users size={18} /> },
  { name: 'Account', path: '/dashboard/account', icon: <UserCircle size={18} /> },
]

const subjectNavItems = [
  { name: 'API Keys', icon: <Key size={18} /> },
  { name: 'Usage', icon: <MessageSquare size={18} /> },
  { name: 'Account', icon: <UserCircle size={18} /> },
]

const getSectionFromSlug = (slug: string[]) => {
  if (slug.length === 0) {
    return { section: 'home' as const }
  }

  if (slug[0] === 'messages' && slug[1]) {
    return { section: 'message-detail' as const, messageId: slug[1] }
  }

  return { section: slug[0] }
}

export default function DashboardPage({ slug }: DashboardPageProps) {
  const router = useRouter()
  const { user, token } = useAuth()
  const [activeTab, setActiveTab] = useState('API Keys')

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

    if (!isAdmin && routeState.section !== 'home') {
      router.replace('/dashboard')
    }
  }, [isAdmin, routeState.section, router, token, user])

  if (!token) {
    return null
  }

  if (!user) {
    return <div className="min-h-screen bg-black text-gray-300 flex items-center justify-center">Loading...</div>
  }

  if (isAdmin && routeState.section === 'home') {
    return null
  }

  if (!isAdmin && routeState.section !== 'home') {
    return null
  }

  const effectiveTab = subjectNavItems.some((item) => item.name === activeTab)
    ? activeTab
    : subjectNavItems[0]?.name ?? 'Account'

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

  return (
    <div className="flex flex-col min-h-screen bg-[#000000] font-sans text-gray-100">
      <div className="flex flex-col lg:flex-row flex-1">
        <aside className="hidden lg:flex lg:w-64 border-r border-white/5 flex-shrink-0 flex-col bg-[#000000]">
          <div className="p-6 flex items-center gap-2">
            <Image src="/icons/ambalay-logo.png" alt="Logo" width={40} height={20} className="h-5 w-10" />
            <h4 className="text-md font-medium tracking-tight text-white">AmbaLay Maps</h4>
          </div>

          <div className="px-4 mt-4">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white transition-colors group"
            >
              <span className="text-gray-500 group-hover:text-white">
                <Home size={18} />
              </span>
              Back to Home
            </Link>
          </div>

          <nav className="flex-1 px-4 mt-2">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">Navigation</p>
            <ul className="space-y-1">
              {isAdmin
                ? adminNavItems.map((item) => {
                    const active = item.path === `/dashboard/${slug.join('/')}` || `/dashboard/${slug.join('/')}`.startsWith(`${item.path}/`)

                    return (
                      <li key={item.name}>
                        <Link
                          href={item.path}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group ${
                            active
                              ? 'bg-[#8cff2e]/10 text-[#8cff2e] font-semibold border-l-4 border-[#8cff2e] rounded-l-none'
                              : 'text-gray-400 hover:text-white transition-colors'
                          }`}
                        >
                          <span className={active ? 'text-[#8cff2e]' : 'text-gray-500 group-hover:text-white'}>{item.icon}</span>
                          {item.name}
                        </Link>
                      </li>
                    )
                  })
                : subjectNavItems.map((item) => (
                    <li key={item.name}>
                      <button
                        onClick={() => setActiveTab(item.name)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group ${
                          effectiveTab === item.name
                            ? 'bg-[#8cff2e]/10 text-[#8cff2e] font-semibold border-l-4 border-[#8cff2e] rounded-l-none'
                            : 'text-gray-400 hover:text-white transition-colors'
                        }`}
                      >
                        <span className={effectiveTab === item.name ? 'text-[#8cff2e]' : 'text-gray-500 group-hover:text-white'}>
                          {item.icon}
                        </span>
                        <span>{item.name}</span>
                      </button>
                    </li>
                  ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-6 lg:p-10 bg-[#070707] overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col gap-4 mb-8">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors lg:hidden"
              >
                <Home size={18} />
                <span className="text-sm">Home</span>
              </Link>
              <div className="flex flex-wrap gap-2 lg:hidden overflow-x-auto pb-2">
                {isAdmin
                  ? adminNavItems.map((item) => {
                      const active = item.path === `/dashboard/${slug.join('/')}` || `/dashboard/${slug.join('/')}`.startsWith(`${item.path}/`)

                      return (
                        <Link
                          key={item.name}
                          href={item.path}
                          className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition-all ${
                            active ? 'bg-[#8cff2e] text-black shadow-lg' : 'bg-white/5 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          <span>{item.icon}</span>
                          <span>{item.name}</span>
                        </Link>
                      )
                    })
                  : subjectNavItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => setActiveTab(item.name)}
                        className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition-all ${
                          effectiveTab === item.name ? 'bg-[#8cff2e] text-black shadow-lg' : 'bg-white/5 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                      </button>
                    ))}
              </div>
            </div>

            {isAdmin ? (
              renderAdminContent()
            ) : (
              <>
                {effectiveTab === 'API Keys' && <ApiKeys />}
                {effectiveTab === 'Usage' && <Usage />}
                {effectiveTab === 'Account' && <AccountSettings />}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
