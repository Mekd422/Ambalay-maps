import { useState } from 'react';
import { Users, MessageSquare, Key, UserCircle, Home } from 'lucide-react';
import logo_white from "../assets/icons/AMBALAY LOGO.png";
import AccountSettings from '../Components/ui/dashboard/Account';
import User from '../Components/ui/dashboard/User';
import ApiKeys from '../Components/ui/dashboard/ApiKeys';
import ContactMessages from '../Components/ui/dashboard/Messages';
import { useAuth } from '../context/useAuth';
import MyOrganization from "../Components/ui/dashboard/MyOrganization";
import Organizations from "../Components/ui/dashboard/Organizations";
import Plans from "../Components/ui/dashboard/Plans";
import Usage from "../Components/ui/dashboard/Usage";
import MessageDetail from '../Components/ui/dashboard/MessageDetail';
import AdminRoute from '../Components/AdminRoute';
import { Link, NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const isAdmin = user?.accessLevel === 'ADMIN';
  const location = useLocation();

  const adminNavItems = [
    { name: 'Users', path: '/dashboard/users', icon: <Users size={18} /> },
    { name: 'Messages', path: '/dashboard/messages', icon: <MessageSquare size={18} /> },
    { name: 'Plans', path: '/dashboard/plans', icon: <Key size={18} /> },
    { name: 'Organizations', path: '/dashboard/organizations', icon: <Users size={18} /> },
    { name: 'Account', path: '/dashboard/account', icon: <UserCircle size={18} /> },
  ];

  const subjectNavItems = [
    { name: 'My Organization', icon: <UserCircle size={18} /> },
    { name: 'API Keys', icon: <Key size={18} /> },
    { name: 'Plans', icon: <Key size={18} /> },
    { name: 'Usage', icon: <MessageSquare size={18} /> },
    { name: 'Account', icon: <UserCircle size={18} /> },
  ];

  const navItems = isAdmin ? adminNavItems : subjectNavItems;
  const [activeTab, setActiveTab] = useState(navItems[0]?.name ?? 'Account');
  const effectiveTab = navItems.some((item) => item.name === activeTab)
    ? activeTab
    : navItems[0]?.name ?? 'Account';
  const isAdminSubRoute = location.pathname !== '/dashboard';

  if (!isAdmin && isAdminSubRoute) {
    return <Navigate to="/dashboard" replace />;
  }

  const adminPageTitle = (() => {
    if (location.pathname.startsWith('/dashboard/messages/')) {
      return 'Message Detail';
    }

    const currentItem = adminNavItems.find(
      (item) => location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
    );

    return currentItem?.name ?? 'Dashboard';
  })();

  const isAdminItemActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <div className="flex flex-col min-h-screen bg-[#000000] font-sans text-gray-100">
      <div className="flex flex-col lg:flex-row flex-1">
        <aside className="hidden lg:flex lg:w-64 border-r border-white/5 flex-shrink-0 flex-col bg-[#000000]">
          <div className="p-6 flex items-center gap-2">
            <img src={logo_white} alt="Logo" className="h-5 w-10" />
            <h4 className="text-md font-medium tracking-tight text-white">AmbaLay Maps</h4>
          </div>

          <div className="px-4 mt-4">
            <Link
              to="/"
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
              {isAdmin ? (
                adminNavItems.map((item) => {
                  const active = isAdminItemActive(item.path);

                  return (
                    <li key={item.name}>
                      <NavLink
                        to={item.path}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group ${
                          active
                            ? 'bg-[#8cff2e]/10 text-[#8cff2e] font-semibold border-l-4 border-[#8cff2e] rounded-l-none'
                            : 'text-gray-400 hover:text-white transition-colors'
                        }`}
                      >
                        <span className={active ? 'text-[#8cff2e]' : 'text-gray-500 group-hover:text-white'}>
                          {item.icon}
                        </span>
                        {item.name}
                      </NavLink>
                    </li>
                  );
                })
              ) : (
                subjectNavItems.map((item) => (
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
                      {item.name}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-6 lg:p-10 bg-[#070707] overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col gap-4 mb-8 border-b border-white/5 pb-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <Link
                    to="/"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors lg:hidden"
                  >
                    <Home size={18} />
                    <span className="text-sm">Home</span>
                  </Link>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    {isAdmin ? adminPageTitle : (effectiveTab === 'Account' ? 'Account Settings' : effectiveTab)}
                  </h1>
                </div>
                <div className="flex flex-wrap gap-2 lg:hidden overflow-x-auto pb-2">
                  {isAdmin ? (
                    adminNavItems.map((item) => {
                      const active = isAdminItemActive(item.path);

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
                      );
                    })
                  ) : (
                    subjectNavItems.map((item) => (
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
                    ))
                  )}
                </div>
              </div>
            </div>

            {isAdmin ? (
              <Routes>
                <Route index element={<Navigate to="users" replace />} />
                <Route path="users" element={<AdminRoute><User /></AdminRoute>} />
                <Route path="messages" element={<AdminRoute><ContactMessages /></AdminRoute>} />
                <Route path="messages/:id" element={<AdminRoute><MessageDetail /></AdminRoute>} />
                <Route path="plans" element={<AdminRoute><Plans /></AdminRoute>} />
                <Route path="organizations" element={<AdminRoute><Organizations /></AdminRoute>} />
                <Route path="account" element={<AdminRoute><AccountSettings /></AdminRoute>} />
                <Route path="*" element={<Navigate to="/dashboard/users" replace />} />
              </Routes>
            ) : (
              <>
                {effectiveTab === "Account" && <AccountSettings />}
                {effectiveTab === "API Keys" && <ApiKeys />}
                {effectiveTab === "My Organization" && <MyOrganization />}
                {effectiveTab === "Plans" && <Plans />}
                {effectiveTab === "Usage" && <Usage />}

                {effectiveTab !== "Account" &&
                  effectiveTab !== "API Keys" &&
                  effectiveTab !== "My Organization" &&
                  effectiveTab !== "Plans" &&
                  effectiveTab !== "Usage" && (
                    <div className="bg-[#1a0c0e] border border-red-900 text-red-400 px-6 py-4 rounded-md text-sm">
                      Failed to load {activeTab.toLowerCase()}
                    </div>
                  )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
