import { useState } from "react"
import type { LucideIcon } from "lucide-react"
import { Car, Utensils, ShoppingBag, Truck, Building2, Heart, Home } from "lucide-react"

interface Industry {
  id: string
  name: string
  icon: LucideIcon   
  title: string
  desc: string
  stack: string[]
}

const industries: Industry[] = [
  { 
    id: "taxi", 
    name: "Taxi Hailing", 
    icon: Car, 
    title: "Taxi Hailing", 
    desc: "Power ride-hailing platforms with real-time routing, ETA predictions, and driver-rider matching optimized for African road networks.", 
    stack: ["Directions API", "Trip Tracking", "AI Routing", "Geocoding"] 
  },
  { id: "food", name: "Food Delivery", icon: Utensils, title: "Food Delivery", desc: "Optimize delivery routes and ensure hot meals arrive on time with precise geocoding.", stack: ["Routing", "Distance Matrix"] },
  { id: "ecommerce", name: "E-commerce", icon: ShoppingBag, title: "E-commerce", desc: "Streamline checkout with address autocomplete and precise delivery location pins.", stack: ["Places API", "Geocoding"] },
  { id: "logistics", name: "Postal & Logistics", icon: Truck, title: "Postal & Logistics", desc: "Manage large fleets and complex delivery schedules with our advanced matrix API.", stack: ["Matrix API", "Fleet Routing"] },
  { id: "government", name: "Government", icon: Building2, title: "Government", desc: "Improve urban planning and public service distribution with accurate geospatial data.", stack: ["Mapping", "Data Viz"] },
  { id: "ngos", name: "NGOs", icon: Heart, title: "NGOs", desc: "Visualize impact and coordinate field operations in remote or unmapped areas.", stack: ["Offline Maps", "Elevation"] },
  { id: "realestate", name: "Real Estate", icon: Home, title: "Real Estate", desc: "Showcase properties with high-quality maps and local points of interest.", stack: ["Static Maps", "Places"] },
]

export default function IndustriesSection() {
  const [activeTab, setActiveTab] = useState("taxi")
  const activeData = industries.find((i) => i.id === activeTab) || industries[0]

  return (
    <section className="px-6 md:px-12 py-24 bg-black">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-14">
          <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight leading-tight">
            Powering mobility <br />
            <span className="text-gray-500">across sectors</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-4 flex flex-col space-y-1">
            {industries.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 text-left border ${
                  activeTab === item.id
                    ? "bg-[#8cff2e]/5 border-[#8cff2e]/20 text-[#8cff2e]"
                    : "text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/5"
                }`}
              >
                <item.icon 
                  size={18} 
                  className={activeTab === item.id ? "text-[#8cff2e]" : "text-gray-500"} 
                />
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8">
            {/* GLOWING CARD SECTION */}
            <div className="relative group">
              {/* This div acts as the glow "halo" behind the card */}
              <div className="absolute -inset-0.5 bg-[#8cff2e]/20 rounded-[32px] blur opacity-30 transition duration-1000"></div>
              
              <div className="relative bg-[#0A0A0A] border border-[#8cff2e]/20 rounded-[32px] p-8 md:p-12 min-h-[420px] flex flex-col justify-center shadow-[0_0_40px_-15px_rgba(140,255,46,0.3)] transition-all duration-500">
                
                <div className="flex items-center gap-4 mb-6">
                  <activeData.icon className="text-[#8cff2e]" size={32} />
                  <h3 className="text-3xl font-medium text-white">{activeData.title}</h3>
                </div>
                
                <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl">
                  {activeData.desc}
                </p>

                <div>
                  <p className="text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-5">API STACK</p>
                  <div className="flex flex-wrap gap-2.5">
                    {activeData.stack.map((api) => (
                      <span 
                        key={api} 
                        className="px-4 py-1.5 rounded-lg bg-[#8cff2e]/10 border border-[#8cff2e]/20 text-[#8cff2e] text-[11px] font-semibold"
                      >
                        {api}
                      </span>
                    ))}
                  </div>
                </div>
                
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}