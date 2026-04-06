import { useState } from 'react'; 
import { Users, MessageSquare, Key, UserCircle } from 'lucide-react'; 
import logo_white from "../assets/icons/download.svg"; 
import { useLocation } from "react-router-dom";
import Navbar from "../Components/layout/Navbar"; 
import AccountSettings from '../Components/ui/dashboard/Account'; 

const Dashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Users'); 
  
  // 1. userName is defined here
  const userName = location.state?.userName || localStorage.getItem("userName") || "User";

  const navItems = [
    { name: 'Users', icon: <Users size={18} /> },
    { name: 'Messages', icon: <MessageSquare size={18} /> },
    { name: 'API Keys', icon: <Key size={18} /> },
    { name: 'Account', icon: <UserCircle size={18} /> },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#000000] font-sans text-gray-100">
      <Navbar />

      <div className="flex flex-1 pt-[76px] overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/5 flex flex-col bg-[#000000]">
          <div className="p-6 flex items-center gap-2 md:hidden lg:flex">
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
                      activeTab === item.name 
                        ? 'bg-[#8cff2e]/10 text-[#8cff2e] font-semibold border-l-4 border-[#8cff2e] rounded-l-none' 
                        : 'text-gray-400 hover:text-white transition-colors'
                    }`}
                  >
                    <span className={activeTab === item.name ? 'text-[#8cff2e]' : 'text-gray-500 group-hover:text-white'}>
                        {item.icon}
                    </span>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Dynamic Content Area */}
        <main className="flex-1 p-10 bg-[#070707] overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            
            {/* 2. Added a header to display userName (fixes 'unused variable' warning) */}
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
               <h1 className="text-2xl font-bold text-white">
                 {activeTab === 'Account' ? 'Account Settings' : activeTab}
               </h1>
               <div className="text-right hidden sm:block">
                 <p className="text-[10px] text-gray-500 uppercase tracking-widest">Logged in as</p>
                 <p className="text-sm font-medium text-[#8cff2e]">{userName}</p>
               </div>
            </div>

            {activeTab === 'Account' ? (
              // 3. Pass userName to initialName (fixes 'missing prop' error)
              <AccountSettings initialName={userName} />
            ) : (
              <div className="bg-[#1a0c0e] border border-red-900 text-red-400 px-6 py-4 rounded-md text-sm shadow-sm">
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