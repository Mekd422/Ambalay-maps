import React, { useState } from 'react';
import { 
  Search, FileText, MapPin, HelpCircle, Compass, 
  Menu, X, Pencil, Database, Layout, Sparkles, Moon, Gauge 
} from 'lucide-react';

import QuickstartContent from '../content/docs/Quickstart.mdx';
import AuthenticationContent from '../content/docs/Authentication.mdx';
import Routing from '../content/docs/Routing.mdx';
import Geocoding from '../content/docs/Geocoding.mdx';
import ReverseGeocoding from "../content/docs/ReverseGeocoding.mdx";
import StaticMaps from "../content/docs/StaticMaps.mdx";
import MatrixAPI from "../content/docs/MatrixAPI.mdx";
import LLM from "../content/docs/LLM.mdx"
import OptimizedRoute from "../content/docs/OptimizedRoute.mdx"
import EmbeddingMap from "../content/docs/EmbeddingMap.mdx"
import GeocodingAddress from "../content/docs/GeocodingAddress.mdx"
import RouteCalculation from "../content/docs/RouteCalculation.mdx"
import BestPractices from "../content/docs/BestPractices.mdx"
import FAQ from "../content/docs/FAQ.mdx"
import DeveloperSupprt from "../content/docs/DeveloperSupport.mdx"
import { Link } from "react-router-dom"
import logo from "../assets/icons/AMBALAY LOGO.png";

interface SidebarGroup {
  group: string;
  items: string[];
}

interface SidebarContentProps {
  sidebarLinks: SidebarGroup[];
  activePage: string;
  onPageSelect: (page: string) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick?: () => void;
}

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const Documentation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>("Overview");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const sidebarLinks: SidebarGroup[] = [
    { group: "Introduction", items: ["Overview", "Quickstart Guide", "Getting Started", "Authentication"] },
    { group: "API Reference", items: ["Routing", "Geocoding", "Reverse Geocoding", "Static Maps", "Matrix API", "LLM", "Optimized Route API"] },
    { group: "Tutorials", items: ["Embedding a Map", "Geocoding an Address", "Calculating a Route"] },
    { group: "Resources", items: ["Best Practices", "FAQ & Troubleshooting", "Developer Support"] }
  ];

  const filteredSidebarLinks = sidebarLinks
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.toLowerCase().includes(searchQuery.trim().toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0);

  const handlePageChange = (page: string) => {
    setActivePage(page);
    setSearchQuery("");
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    const mdxWrapper = (Content: React.ComponentType) => (
      <article className="prose prose-invert prose-headings:font-bold prose-h1:text-4xl prose-h1:mb-8 prose-h3:text-xl prose-h3:mt-10 prose-code:text-[#8cff2e] prose-pre:bg-[#0A0A0A] prose-pre:border prose-pre:border-white/10 prose-strong:text-white max-w-none">
        <Content />
      </article>
    );

    if (activePage === "Quickstart Guide") return mdxWrapper(QuickstartContent);
    if (activePage === "Authentication") return mdxWrapper(AuthenticationContent);
    if (activePage === "Routing") return mdxWrapper(Routing);
    if (activePage === "Geocoding") return mdxWrapper(Geocoding);
    if (activePage === "Reverse Geocoding") return mdxWrapper(ReverseGeocoding);
    if (activePage === "Static Maps") return mdxWrapper(StaticMaps);
    if (activePage === "Matrix API") return mdxWrapper(MatrixAPI);
    if (activePage === "LLM") return mdxWrapper(LLM);
    if (activePage === "Optimized Route API") return mdxWrapper(OptimizedRoute);
    if (activePage === "Embedding a Map") return mdxWrapper(EmbeddingMap);
    if (activePage === "Geocoding an Address") return mdxWrapper(GeocodingAddress);
    if (activePage === "Calculating a Route") return mdxWrapper(RouteCalculation);
    if (activePage === "Best Practices") return mdxWrapper(BestPractices);
    if (activePage === "FAQ & Troubleshooting") return mdxWrapper(FAQ);
    if (activePage === "Developer Support") return mdxWrapper(DeveloperSupprt);

    return (
      <div className="flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-5 self-center">
          <span className="bg-[#8cff2e] text-black text-xs font-black px-2 py-0.5 rounded-full uppercase leading-none">New</span>
          <span className="text-sm text-gray-300 font-medium">Better async handling</span>
        </div>

        <h1 className="text-2xl md:text-4xl font-bold mb-4 tracking-tight">
          AmbaLay Maps Documentation
        </h1>
        <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
          Explore AmbaLay Maps API's features, integrations, and ways of implementation.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button 
            onClick={() => handlePageChange("Quickstart Guide")}
            className="w-full sm:w-auto bg-white text-black px-8 py-3 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all shadow-lg shadow-white/5"
          >
            Quickstart Guide
          </button>
          <span className="text-gray-500 text-sm font-medium italic">or</span>
          <button className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-white/10 transition-all">
            Start a new project
          </button>
        </div>

        <div className="w-full text-left">
          <h2 className="text-2xl md:text-3xl font-medium mb-10 tracking-tight">Explore by categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CategoryCard 
              icon={<FileText className="text-blue-400" size={24} />} 
              title="Quick Start Guide" 
              desc="Learn how to use the API and follow best practices for the software" 
              onClick={() => handlePageChange("Quickstart Guide")}
            />
            <CategoryCard 
              icon={<MapPin className="text-blue-400" size={24} />} 
              title="Geocoding" 
              desc="Convert addresses to coordinates or perform reverse lookups." 
              onClick={() => handlePageChange("Geocoding")}
            />
            <CategoryCard 
              icon={<HelpCircle className="text-blue-400" size={24} />} 
              title="Authentication" 
              desc="Learn about API keys and how to secure your integration." 
              onClick={() => handlePageChange("Authentication")}
            />
            <CategoryCard 
              icon={<Compass className="text-blue-400" size={24} />} 
              title="Routing API" 
              desc="Learn how to calculate routes between locations with turn by turn directions" 
              onClick={() => handlePageChange("Routing")}
            />
          </div>
        </div>

        <div className="w-full mt-32 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 text-left pb-20">
          <FeatureItem 
            icon={<Pencil className="text-indigo-500" size={20} />}
            title="Easily editable"
            desc="Modify colors and text with ease via premade assets and CSS variables."
          />
          <FeatureItem 
            icon={<Database className="text-indigo-500" size={20} />}
            title="CMS Powered"
            desc="Edit and manage all documentation pages exclusively within CMS mode."
          />
          <FeatureItem 
            icon={<Layout className="text-indigo-500" size={20} />}
            title="Premium Components"
            desc="Finely crafted UI components with multiple states and variables."
          />
          <FeatureItem 
            icon={<Sparkles className="text-indigo-500" size={20} />}
            title="Auto-Generated"
            desc="Pages and navigation are generated automatically from your content folder."
          />
          <FeatureItem 
            icon={<Moon className="text-indigo-500" size={20} />}
            title="Dark and Light Mode"
            desc="Native support for both themes delivering a magnificent user experience."
          />
          <FeatureItem 
            icon={<Gauge className="text-indigo-500" size={20} />}
            title="Optimized SEO"
            desc="Designed to improve the discoverability of your documentation."
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sora selection:bg-[#8cff2e] selection:text-black">
      {/* Navigation */}
      <nav className="h-16 border-b border-white/5 bg-[#050505]/50 backdrop-blur-md sticky top-0 z-50">
        <div className="w-full h-full flex items-center justify-between px-6 lg:pl-24 lg:pr-12">
          <div className="flex items-center gap-4 lg:gap-8">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="AmbaLay Maps Logo" className=" w-10 h-20 object-contain" />
              <span className="font-semibold text-sm tracking-tight">AmbaLay Maps</span>
            </Link>
            <div className="hidden sm:flex items-center gap-6 text-sm">
              <Link to="/" className="text-white hover:text-[#8cff2e] transition-all">Home</Link>
              <span className="bg-white/10 px-3 py-1 rounded-md text-white transition-all">Documentation</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Mobile Sidebar */}
        <div className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className={`absolute left-0 top-0 h-full w-72 bg-[#050505] border-r border-white/10 p-6 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="mt-12">
              <SidebarContent
                sidebarLinks={filteredSidebarLinks}
                activePage={activePage}
                onPageSelect={handlePageChange}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>
          </aside>
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0 border-r border-white/10 pt-12 pr-8 lg:ml-24 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto no-scrollbar">
          <SidebarContent
            sidebarLinks={filteredSidebarLinks}
            activePage={activePage}
            onPageSelect={handlePageChange}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 pt-16 pb-24 px-6 md:px-12 relative flex flex-col items-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-900/10 blur-[140px] -z-10 pointer-events-none" />
          <div className="w-full max-w-4xl">
            {renderContent()}
          </div>
        </main>
      </div>

      <footer className="w-full relative bg-[#050505] py-16 border-t border-white/10">
  <div className="w-full px-6 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-4">
    
    {/* Left */}
    <div className="text-sm text-gray-500">
      AmbaLay Maps · © 2026 All rights reserved
    </div>

    {/* Right */}
    <div className="flex gap-6 text-sm text-gray-500">
      <Link to="/privacy" className="hover:text-white transition">
        Privacy Policy
      </Link>

      <Link to="/terms" className="hover:text-white transition">
        Terms of Service
      </Link>
    </div>

  </div>
</footer>
    </div>
  );
};


const SidebarContent = ({ sidebarLinks, activePage, onPageSelect, searchQuery, onSearchChange }: SidebarContentProps) => (
  <>
    <div className="relative mb-8">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
      <input 
        type="text" 
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search documentation..." 
        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-10 text-xs focus:outline-none focus:border-[#8cff2e]/50 transition-all"
      />
    </div>

    {sidebarLinks.length === 0 ? (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-gray-400">
        No documentation pages match your search.
      </div>
    ) : (
      <div className="space-y-8">
      {sidebarLinks.map((group, idx) => (
        <div key={idx}>
          <h4 className="text-[11px] font-sora font-bold uppercase tracking-[0.15em] text-white/40 mb-4">
            {group.group}
          </h4>
          <ul className="space-y-3 pl-4 border-l border-white/5">
            {group.items.map((item, i) => (
              <li key={i}>
                <button 
                  onClick={() => onPageSelect(item)}
                  className={`text-xs transition-colors block text-left w-full ${activePage === item ? 'text-[#8cff2e] font-medium' : 'text-gray-500 hover:text-white'}`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    )}
  </>
);

const CategoryCard = ({ icon, title, desc, onClick }: CategoryCardProps) => (
  <div 
    onClick={onClick}
    className="bg-[#0A0A0A] border border-white/5 rounded-[24px] p-8 hover:bg-[#111111] hover:border-white/10 transition-all cursor-pointer group text-left h-full flex flex-col"
  >
    <div className="mb-6 p-3 bg-white/5 w-fit rounded-xl group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const FeatureItem = ({ icon, title, desc }: FeatureItemProps) => (
  <div className="flex gap-4 group">
    <div className="mt-1 shrink-0">{icon}</div>
    <div className="flex flex-col gap-1">
      <h4 className="text-base font-bold text-white tracking-tight">{title}</h4>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default Documentation;