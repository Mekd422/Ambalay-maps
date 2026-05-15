import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Search, FileText, MapPin, Compass,
  Menu, X, Pencil, Database, Layout, Sparkles, Moon, Gauge 
} from 'lucide-react';

import QuickstartContent from '../content/docs/Quickstart.mdx';
import BestPractices from "../content/docs/BestPractices.mdx"
import FAQ from "../content/docs/FAQ.mdx"
import DeveloperSupprt from "../content/docs/DeveloperSupport.mdx"
import ServicesOverview from "../content/docs/services/ServicesOverview.mdx"
import TilesContent from "../content/docs/services/Tiles.mdx"
import GeocodingContent from "../content/docs/services/Geocoding.mdx"
import RouteContent from "../content/docs/services/Route.mdx"
import MatrixContent from "../content/docs/services/Matrix.mdx"
import TripsContent from "../content/docs/services/Trips.mdx"
import { Link } from "react-router-dom"

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
  const docsBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || "{BASE_URL}";

  const sidebarLinks: SidebarGroup[] = [
    { group: "Introduction", items: ["Overview", "Quickstart Guide"] },
    { group: "API Reference", items: ["Services Overview", "Tiles", "Geocoding", "Route", "Matrix", "Trips"] },
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
    const mdxWrapper = (Content: React.ComponentType<{ baseUrl?: string }>) => (
      <article className="prose prose-invert prose-headings:font-bold prose-h1:text-4xl prose-h1:mb-8 prose-h3:text-xl prose-h3:mt-10 prose-code:text-[#8cff2e] prose-pre:bg-[#0A0A0A] prose-pre:border prose-pre:border-white/10 prose-strong:text-white max-w-none">
        <Content baseUrl={docsBaseUrl} />
      </article>
    );

    if (activePage === "Quickstart Guide") return mdxWrapper(QuickstartContent);
    if (activePage === "Services Overview") return mdxWrapper(ServicesOverview);
    if (activePage === "Tiles") return mdxWrapper(TilesContent);
    if (activePage === "Geocoding") return mdxWrapper(GeocodingContent);
    if (activePage === "Route") return mdxWrapper(RouteContent);
    if (activePage === "Matrix") return mdxWrapper(MatrixContent);
    if (activePage === "Trips") return mdxWrapper(TripsContent);
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
              icon={<Compass className="text-blue-400" size={24} />} 
              title="Route" 
              desc="Calculate routes with response envelopes and validation rules." 
              onClick={() => handlePageChange("Route")}
            />
            <CategoryCard 
              icon={<FileText className="text-blue-400" size={24} />} 
              title="Best Practices" 
              desc="Use current integration guidance for auth, quota handling, and response parsing." 
              onClick={() => handlePageChange("Best Practices")}
            />
          </div>
        </div>

        <div className="w-full mt-32 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 text-left pb-20">
          <FeatureItem 
            icon={<Pencil className="text-indigo-500" size={20} />}
            title="Flexible Map Customization"
            desc="Easily configure map styles, layers, and UI components using simple APIs. Adapt AmbaLay Maps to match your product’s design and functionality without complexity."
          />
          <FeatureItem 
            icon={<Database className="text-indigo-500" size={20} />}
            title=" Centralized Data Management"
            desc="Control and manage map data, locations, and documentation from a single system. Update content seamlessly without needing full redeployments."
          />
          <FeatureItem 
            icon={<Layout className="text-indigo-500" size={20} />}
            title="High-Performance Mapping Engine"
            desc="Leverage powerful routing, geocoding, and spatial processing components built for speed, accuracy, and scalability across real-world use cases."
          />
          <FeatureItem 
            icon={<Sparkles className="text-indigo-500" size={20} />}
            title="Smart Documentation System"
            desc="Automatically structured documentation and navigation based on your APIs and data, keeping everything organized and up to date with minimal effort."
          />
          <FeatureItem 
            icon={<Moon className="text-indigo-500" size={20} />}
            title=" Adaptive UI Experience"
            desc="Native support for dark and light modes, ensuring a smooth and accessible experience for users in any environment."
          />
          <FeatureItem 
            icon={<Gauge className="text-indigo-500" size={20} />}
            title=" Built for African Context"
            desc="Optimized for African infrastructure with better local data coverage, reliable routing, and performance in low-connectivity conditions."
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
              <Image src="/icons/ambalay-logo.png" alt="AmbaLay Maps Logo" width={40} height={80} className="w-10 h-20 object-contain" />
              <span className="font-semibold text-sm tracking-tight">AmbaLay Maps</span>
            </Link>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-sm">
            <Link to="/" className="text-gray-400 hover:text-[#8cff2e] transition-all">Home</Link>
            <span className="bg-white/10 px-3 py-1 rounded-md text-white transition-all">
              Documentation
            </span>
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
      <Link to="/privacy-policy" className="hover:text-white transition">
        Privacy Policy
      </Link>

      <Link to="/terms-of-service" className="hover:text-white transition">
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
