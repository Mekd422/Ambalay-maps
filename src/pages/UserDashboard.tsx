import { useState } from 'react';
import { Users, MessageSquare, Key, UserCircle } from 'lucide-react'; 
import logo_white from "../assets/icons/AMBALAY LOGO.png"; 
import Navbar from "../Components/layout/Navbar"; 
import AccountSettings from '../Components/ui/dashboard/Account'; 
import User from '../Components/ui/dashboard/User';
import ApiKeys from '../Components/ui/dashboard/ApiKeys';
import ContactMessages from '../Components/ui/dashboard/Messages';
import { useAuth } from '../context/useAuth';
import MyOrganization from "../Components/ui/dashboard/MyOrganization";
import Organizations from "../Components/ui/dashboard/Organizations";
import Plans from "../Components/ui/dashboard/Plans";
import Usage from "../Components/ui/dashboard/Usage";

const Dashboard = () => {
  const { user } = useAuth();
  const isAdmin = user?.accessLevel === 'ADMIN';

  const adminNavItems = [
    { name: 'Users', icon: <Users size={18} /> },
    { name: 'Messages', icon: <MessageSquare size={18} /> },
    { name: 'Account', icon: <UserCircle size={18} /> },
    { name: 'Organizations', icon: <Users size={18} /> },
    { name: 'Plans', icon: <Key size={18} /> },
  ];

  const subjectNavItems = [
    { name: 'API Keys', icon: <Key size={18} /> },
    { name: 'Account', icon: <UserCircle size={18} /> },
    { name: 'My Organization', icon: <UserCircle size={18} /> },
    { name: 'Plans', icon: <Key size={18} /> },
    { name: 'Usage', icon: <MessageSquare size={18} /> },
  ];

  const navItems = isAdmin ? adminNavItems : subjectNavItems;
  const [activeTab, setActiveTab] = useState(navItems[0]?.name ?? 'Account');
  const effectiveTab = navItems.some((item) => item.name === activeTab)
    ? activeTab
    : navItems[0]?.name ?? 'Account';

  return (
    <div className="flex flex-col min-h-screen bg-[#000000] font-sans text-gray-100">
      <Navbar />

      <div className="flex flex-col lg:flex-row flex-1 pt-[76px]">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex lg:w-64 border-r border-white/5 flex-shrink-0 flex-col bg-[#000000]">
          <div className="p-6 flex items-center gap-2">
            <img src={logo_white} alt="Logo" className="h-8 w-8" />
            <h4 className="text-md font-medium tracking-tight text-white">AmbaLay Maps</h4>
          </div>

          <nav className="flex-1 px-4 mt-2">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">Navigation</p>
            <ul className="space-y-1">
              {navItems.map((item) => (
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
              ))}
            </ul>
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-6 lg:p-10 bg-[#070707] overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col gap-4 mb-8 border-b border-white/5 pb-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    {effectiveTab === 'Account' ? 'Account Settings' : effectiveTab}
                  </h1>
                </div>
                <div className="flex flex-wrap gap-2 lg:hidden overflow-x-auto pb-2">
                  {navItems.map((item) => (
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
            </div>

            {effectiveTab === "Users" && <User />}
            {effectiveTab === "Account" && <AccountSettings />}
            {effectiveTab === "API Keys" && <ApiKeys />}
            {effectiveTab === "Messages" && <ContactMessages />}
            {effectiveTab === "My Organization" && <MyOrganization />}
            {effectiveTab === "Organizations" && <Organizations />}
            {effectiveTab === "Plans" && <Plans />}
            {effectiveTab === "Usage" && <Usage />}

            {effectiveTab !== "Users" &&
              effectiveTab !== "Account" &&
              effectiveTab !== "API Keys" &&
              effectiveTab !== "Messages" && 
              effectiveTab !== "My Organization" &&
              effectiveTab !== "Organizations" &&
              effectiveTab !== "Plans" &&
              effectiveTab !== "Usage" &&
              (
                <div className="bg-[#1a0c0e] border border-red-900 text-red-400 px-6 py-4 rounded-md text-sm">
                  Failed to load {activeTab.toLowerCase()}
                </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;