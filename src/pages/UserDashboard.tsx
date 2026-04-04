import { 
  Users, 
  MessageSquare,  
  Key, 
  UserCircle 
} from 'lucide-react';
import logo_white from "../assets/icons/download.svg"; 
import { useLocation } from "react-router-dom";
import Navbar from "../Components/layout/Navbar"; 

const Dashboard = () => {
  const location = useLocation();

  // Check navigation state first, fallback to localStorage if page is refreshed
  const userName = location.state?.userName || localStorage.getItem("userName") || "User";

  const navItems = [
    { name: 'Users', icon: <Users size={18} />, active: true },
    { name: 'Messages', icon: <MessageSquare size={18} /> },
    { name: 'API Keys', icon: <Key size={18} /> },
    { name: 'Account', icon: <UserCircle size={18} /> },
  ];

  return (
    // Updated: Background changed to deep black, font changed to white/gray, sans-serif
    <div className="flex flex-col h-screen bg-[#000000] font-sans text-gray-100">
      
      {/* 1. Integrated Unified Navbar (assuming Navbar handles its own dark styling) */}
      <Navbar />

      {/* 2. Main Layout Container (pt-20 to push content below fixed Navbar) */}
      <div className="flex flex-1 pt-[76px] overflow-hidden">
        
        {/* Sidebar - Updated styling */}
        <aside className="w-64 border-r border-white/5 flex flex-col bg-[#000000]">
          
          <div className="p-6 flex items-center gap-2 md:hidden lg:flex">
            {/* Update logo asset to a white or neon green variant */}
            <img src={logo_white} alt="AmbaLay Maps Logo" className="h-8 w-8" />
            <h4 className="text-md font-medium tracking-tight text-white">
              AmbaLay Maps
            </h4>
          </div>

          <nav className="flex-1 px-4 mt-2">
            {/* Updated navigation title styling */}
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 px-2">
              Navigation
            </p>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group ${
                      item.active 
                        // Updated active item styling: Neon green text, left border, and slight background
                        ? 'bg-[#8cff2e]/10 text-[#8cff2e] font-semibold border-l-4 border-[#8cff2e] rounded-l-none' 
                        // Updated hover styling: Bright white text
                        : 'text-gray-400 hover:text-white transition-colors'
                    }`}
                  >
                    {/* Updated icon styling */}
                    <span className={item.active ? 'text-[#8cff2e]' : 'text-gray-500 group-hover:text-white'}>
                        {item.icon}
                    </span>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Dynamic Page Content area - Updated background and text color */}
        <main className="flex-1 p-10 bg-[#070707] overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                {/* Updated page title styling */}
               <h1 className="text-2xl font-bold text-white">Users</h1>
               {/* Updated user greeting styling */}
               <span className="text-sm text-gray-500 font-medium md:hidden">
                 Logged in as: {userName}
               </span>
            </div>
            
            {/* Error state match - Updated for visibility in dark mode (deep red tone) */}
            <div className="bg-[#1a0c0e] border border-red-900 text-red-400 px-6 py-4 rounded-md text-sm shadow-sm">
              Failed to load users
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;