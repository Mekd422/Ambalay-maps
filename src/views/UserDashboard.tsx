import { useState } from 'react'
import { Users, MessageSquare, Key, UserCircle, Home } from 'lucide-react'
import Image from 'next/image'
import AccountSettings from '../Components/ui/dashboard/Account'
import User from '../Components/ui/dashboard/User'
import ApiKeys from '../Components/ui/dashboard/ApiKeys'
import ContactMessages from '../Components/ui/dashboard/Messages'
import { useAuth } from '../context/useAuth'
import Organizations from '../Components/ui/dashboard/Organizations'
import Plans from '../Components/ui/dashboard/Plans'
import Usage from '../Components/ui/dashboard/Usage'
import MessageDetail from '../Components/ui/dashboard/MessageDetail'
import AdminRoute from '../Components/AdminRoute'
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'

const Dashboard = () => {
  const { user } = useAuth()
  const isAdmin = user?.accessLevel === 'ADMIN'
  const location = useLocation()

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
    { name: 'API Keys', icon: <Key size={18} /> },
    { name: 'Usage', icon: <MessageSquare size={18} /> },
    { name: 'Account', icon: <UserCircle size={18} /> },
  ]

  const navItems = isAdmin ? adminNavItems : subjectNavItems
  const [activeTab, setActiveTab] = useState(
    navItems.find((item) => !('comingSoon' in item) || !item.comingSoon)
      ?.name ?? 'Account',
  )
  const effectiveTab = navItems.some((item) => item.name === activeTab)
    ? activeTab
    : (navItems[0]?.name ?? 'Account')
  const isAdminSubRoute = location.pathname !== '/dashboard'

  if (!isAdmin && isAdminSubRoute) {
    return <Navigate to="/dashboard" replace />
  }

  const isAdminItemActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`)

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
              to="/"
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
                    const active = isAdminItemActive(item.path)

                    return (
                      <li key={item.name}>
                        <NavLink
                          to={item.path}
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
                        </NavLink>
                      </li>
                    )
                  })
                : subjectNavItems.map((item) => (
                    <li key={item.name}>
                      <button
                        onClick={() => setActiveTab(item.name)}
                        className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                          effectiveTab === item.name
                            ? 'rounded-l-none border-l-4 border-[#8cff2e] bg-[#8cff2e]/10 font-semibold text-[#8cff2e]'
                            : 'text-gray-400 transition-colors hover:text-white'
                        }`}
                      >
                        <span
                          className={
                            effectiveTab === item.name
                              ? 'text-[#8cff2e]'
                              : 'text-gray-500 group-hover:text-white'
                          }
                        >
                          {item.icon}
                        </span>
                        <span>{item.name}</span>
                      </button>
                    </li>
                  ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto bg-[#070707] p-4 md:p-6 lg:p-10">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex flex-col gap-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white lg:hidden"
              >
                <Home size={18} />
                <span className="text-sm">Home</span>
              </Link>
              <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 lg:hidden">
                {isAdmin
                  ? adminNavItems.map((item) => {
                      const active = isAdminItemActive(item.path)

                      return (
                        <NavLink
                          key={item.name}
                          to={item.path}
                          className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition-all ${
                            active
                              ? 'bg-[#8cff2e] text-black shadow-lg'
                              : 'bg-white/5 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          <span>{item.icon}</span>
                          <span>{item.name}</span>
                        </NavLink>
                      )
                    })
                  : subjectNavItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => setActiveTab(item.name)}
                        className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold transition-all ${
                          effectiveTab === item.name
                            ? 'bg-[#8cff2e] text-black shadow-lg'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                      </button>
                    ))}
              </div>
            </div>

            {isAdmin ? (
              <Routes>
                <Route index element={<Navigate to="users" replace />} />
                <Route
                  path="users"
                  element={
                    <AdminRoute>
                      <User />
                    </AdminRoute>
                  }
                />
                <Route
                  path="messages"
                  element={
                    <AdminRoute>
                      <ContactMessages />
                    </AdminRoute>
                  }
                />
                <Route
                  path="messages/:id"
                  element={
                    <AdminRoute>
                      <MessageDetail />
                    </AdminRoute>
                  }
                />
                <Route
                  path="plans"
                  element={
                    <AdminRoute>
                      <Plans />
                    </AdminRoute>
                  }
                />
                <Route
                  path="organizations"
                  element={
                    <AdminRoute>
                      <Organizations />
                    </AdminRoute>
                  }
                />
                <Route
                  path="account"
                  element={
                    <AdminRoute>
                      <AccountSettings />
                    </AdminRoute>
                  }
                />
                <Route
                  path="*"
                  element={<Navigate to="/dashboard/users" replace />}
                />
              </Routes>
            ) : (
              <>
                {effectiveTab === 'API Keys' && <ApiKeys />}
                {effectiveTab === 'Usage' && <Usage />}
                {effectiveTab === 'Account' && <AccountSettings />}

                {effectiveTab !== 'Account' &&
                  effectiveTab !== 'API Keys' &&
                  effectiveTab !== 'Usage' && (
                    <div className="rounded-md border border-red-900 bg-[#1a0c0e] px-6 py-4 text-sm text-red-400">
                      Failed to load {activeTab.toLowerCase()}
                    </div>
                  )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
