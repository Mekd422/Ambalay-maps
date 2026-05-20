'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  Search,
  FileText,
  MapPin,
  Compass,
  Menu,
  X,
  Pencil,
  Database,
  Layout,
  Sparkles,
  Moon,
  Gauge,
} from 'lucide-react'

import QuickstartContent from '../content/docs/Quickstart.mdx'
import BestPractices from '../content/docs/BestPractices.mdx'
import FAQ from '../content/docs/FAQ.mdx'
import DeveloperSupprt from '../content/docs/DeveloperSupport.mdx'
import ServicesOverview from '../content/docs/services/ServicesOverview.mdx'
import TilesContent from '../content/docs/services/Tiles.mdx'
import GeocodingContent from '../content/docs/services/Geocoding.mdx'
import RouteContent from '../content/docs/services/Route.mdx'
import MatrixContent from '../content/docs/services/Matrix.mdx'
import TripsContent from '../content/docs/services/Trips.mdx'
import ReverseGeocodingContent from '../content/docs/services/ReverseGeocoding.mdx'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  documentationSlugByTitle,
  documentationTitleBySlug,
} from './documentationPages'
import ApiPlayground from '../Components/ui/ApiPlayground'
import MapPlayground from '../Components/ui/MapPlayground'

interface SidebarGroup {
  group: string
  items: string[]
}

interface SidebarContentProps {
  sidebarLinks: SidebarGroup[]
  activePage: string
  onPageSelect: (page: string) => void
  searchQuery: string
  onSearchChange: (value: string) => void
}

interface CategoryCardProps {
  icon: React.ReactNode
  title: string
  desc: string
  onClick?: () => void
}

interface FeatureItemProps {
  icon: React.ReactNode
  title: string
  desc: string
}

const documentationHref = (page: string) =>
  `/documentation/${documentationSlugByTitle.get(page) ?? 'overview'}`

const Documentation = () => {
  const navigate = useNavigate()
  const params = useParams<{ slug?: string }>()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [activeView, setActiveView] = useState<'docs' | 'api-playground' | 'map-playground'>('docs')
  const docsBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    '{BASE_URL}'
  const activePage =
    documentationTitleBySlug.get(params.slug ?? 'overview') ?? 'Overview'

  const sidebarLinks: SidebarGroup[] = [
    { group: 'Introduction', items: ['Overview', 'Quickstart Guide'] },
    {
      group: 'API Reference',
      items: [
        'Services Overview',
        'Tiles',
        'Geocoding',
        'Reverse Geocoding',
        'Route',
        'Matrix',
        'Trips',
      ],
    },
    {
      group: 'Resources',
      items: ['Best Practices', 'FAQ & Troubleshooting', 'Developer Support'],
    },
  ]

  const filteredSidebarLinks = sidebarLinks
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.toLowerCase().includes(searchQuery.trim().toLowerCase()),
      ),
    }))
    .filter((group) => group.items.length > 0)

  const handleSidebarPageSelect = () => {
    setSearchQuery('')
    setIsMobileMenuOpen(false)
  }

  const handlePageChange = (page: string) => {
    const nextSlug = documentationSlugByTitle.get(page)

    if (!nextSlug) {
      return
    }

    setSearchQuery('')
    setIsMobileMenuOpen(false)
    navigate(documentationHref(page))
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [activePage])

  const renderContent = () => {
    const mdxWrapper = (Content: React.ComponentType<{ baseUrl?: string }>) => (
      <article className="docs-content prose prose-invert max-w-none prose-headings:font-bold prose-h1:mb-8 prose-h1:text-4xl prose-h3:mt-10 prose-h3:text-xl prose-p:text-[15px] prose-p:leading-7 prose-li:text-[15px] prose-li:leading-7 prose-strong:text-white prose-code:text-[#8cff2e] prose-pre:border prose-pre:border-white/10 prose-pre:bg-[#0A0A0A]">
        <Content baseUrl={docsBaseUrl} />
      </article>
    )

    if (activePage === 'Quickstart Guide') return mdxWrapper(QuickstartContent)
    if (activePage === 'Services Overview') return mdxWrapper(ServicesOverview)
    if (activePage === 'Tiles') return mdxWrapper(TilesContent)
    if (activePage === 'Geocoding') return mdxWrapper(GeocodingContent)
    if (activePage === 'Route') return mdxWrapper(RouteContent)
    if (activePage === 'Matrix') return mdxWrapper(MatrixContent)
    if (activePage === 'Trips') return mdxWrapper(TripsContent)
    if (activePage === 'Reverse Geocoding') return mdxWrapper(ReverseGeocodingContent)
    if (activePage === 'Best Practices') return mdxWrapper(BestPractices)
    if (activePage === 'FAQ & Troubleshooting') return mdxWrapper(FAQ)
    if (activePage === 'Developer Support') return mdxWrapper(DeveloperSupprt)

    return (
      <div className="flex flex-col items-center text-center">
        <div className="mb-5 inline-flex items-center gap-3 self-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
          <span className="rounded-full bg-[#8cff2e] px-2 py-0.5 text-xs font-black uppercase leading-none text-black">
            New
          </span>
          <span className="text-sm font-medium text-gray-300">
            Better async handling
          </span>
        </div>

        <h1 className="mb-4 text-2xl font-bold tracking-tight md:text-4xl">
          AmbaLay Maps Documentation
        </h1>
        <p className="mb-6 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg">
          Explore AmbaLay Maps API's features, integrations, and ways of
          implementation.
        </p>

        <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => handlePageChange('Quickstart Guide')}
            className="w-full rounded-xl bg-white px-8 py-3 text-sm font-bold text-black shadow-lg shadow-white/5 transition-all hover:bg-gray-200 sm:w-auto"
          >
            Quickstart Guide
          </button>
          <span className="text-sm font-medium italic text-gray-500">or</span>
          <button className="w-full rounded-xl border border-white/10 bg-white/5 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-white/10 sm:w-auto">
            Start a new project
          </button>
        </div>

        <div className="w-full text-left">
          <h2 className="mb-10 text-2xl font-medium tracking-tight md:text-3xl">
            Explore by categories
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <CategoryCard
              icon={<FileText className="text-blue-400" size={24} />}
              title="Quick Start Guide"
              desc="Learn how to use the API and follow best practices for the software"
              onClick={() => handlePageChange('Quickstart Guide')}
            />
            <CategoryCard
              icon={<MapPin className="text-blue-400" size={24} />}
              title="Geocoding"
              desc="Convert addresses to coordinates or perform reverse lookups."
              onClick={() => handlePageChange('Geocoding')}
            />
            <CategoryCard
              icon={<Compass className="text-blue-400" size={24} />}
              title="Route"
              desc="Calculate routes with response envelopes and validation rules."
              onClick={() => handlePageChange('Route')}
            />
            <CategoryCard
              icon={<FileText className="text-blue-400" size={24} />}
              title="Best Practices"
              desc="Use current integration guidance for auth, quota handling, and response parsing."
              onClick={() => handlePageChange('Best Practices')}
            />
          </div>
        </div>

        <div className="mt-32 grid w-full grid-cols-1 gap-x-16 gap-y-12 pb-20 text-left md:grid-cols-2">
          <FeatureItem
            icon={<Pencil className="text-indigo-500" size={20} />}
            title="Flexible Map Customization"
            desc="Easily configure map styles, layers, and UI components using simple APIs. Adapt AmbaLay Maps to match your product’s design and functionality without complexity."
          />
          {/* <FeatureItem
            icon={<Database className="text-indigo-500" size={20} />}
            title=" Centralized Data Management"
            desc="Control and manage map data, locations, and documentation from a single system. Update content seamlessly without needing full redeployments."
          /> */}
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
          {/* <FeatureItem
            icon={<Gauge className="text-indigo-500" size={20} />}
            title=" Built for African Context"
            desc="Optimized for African infrastructure with better local data coverage, reliable routing, and performance in low-connectivity conditions."
          /> */}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050505] font-sora text-white selection:bg-[#8cff2e] selection:text-black">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 h-16 border-b border-white/5 bg-[#050505]/50 backdrop-blur-md">
        <div className="flex h-full w-full items-center justify-between px-6 lg:pl-24 lg:pr-12">
          <div className="flex items-center gap-4 lg:gap-8">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="-ml-2 p-2 text-gray-400 transition-colors hover:text-white lg:hidden"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link to="/" className="flex items-center gap-3">
              <Image
                src="/icons/ambalay-logo.png"
                alt="AmbaLay Maps Logo"
                width={40}
                height={80}
                className="h-20 w-10 object-contain"
              />
              <span className="text-sm font-semibold tracking-tight">
                AmbaLay Maps
              </span>
            </Link>
          </div>

          <div className="hidden items-center gap-6 text-sm sm:flex">
            <Link
              to="/"
              className="text-gray-400 transition-all hover:text-[#8cff2e]"
            >
              Home
            </Link>
            <button
              onClick={() => setActiveView('docs')}
              className={`rounded-md px-3 py-1 transition-all ${
                activeView === 'docs'
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:text-[#8cff2e]'
              }`}
            >
              Documentation
            </button>
            <button
              onClick={() => setActiveView('api-playground')}
              className={`rounded-md px-3 py-1 transition-all ${
                activeView === 'api-playground'
                  ? 'bg-[#8cff2e] text-black font-semibold'
                  : 'text-gray-400 hover:text-[#8cff2e]'
              }`}
            >
              API Playground
            </button>
            <button
              onClick={() => setActiveView('map-playground')}
              className={`rounded-md px-3 py-1 transition-all ${
                activeView === 'map-playground'
                  ? 'bg-[#8cff2e] text-black font-semibold'
                  : 'text-gray-400 hover:text-[#8cff2e]'
              }`}
            >
              Map Playground
            </button>
          </div>
        </div>
      </nav>
      <div className="flex">
        {/* Mobile Sidebar - Hidden for playgrounds */}
        {activeView === 'docs' && (
          <div
            className={`fixed inset-0 z-40 transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <aside
              className={`absolute left-0 top-0 h-full w-72 border-r border-white/10 bg-[#050505] p-6 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
              <div className="mt-12">
                <SidebarContent
                  sidebarLinks={filteredSidebarLinks}
                  activePage={activePage}
                  onPageSelect={handleSidebarPageSelect}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
              </div>
            </aside>
          </div>
        )}

        {/* Desktop Sidebar - Hidden for playgrounds */}
        {activeView === 'docs' && (
          <aside className="no-scrollbar sticky top-16 hidden h-[calc(100vh-64px)] w-72 shrink-0 overflow-y-auto border-r border-white/10 pr-8 pt-12 lg:ml-24 lg:block">
            <SidebarContent
              sidebarLinks={filteredSidebarLinks}
              activePage={activePage}
              onPageSelect={handleSidebarPageSelect}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </aside>
        )}

        {/* Main Content */}
        <main className="relative flex flex-1 flex-col items-center px-6 pb-24 pt-16 md:px-12">
          <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[800px] -translate-x-1/2 bg-purple-900/10 blur-[140px]" />
          {activeView === 'docs' ? (
            <div className="w-full max-w-4xl">{renderContent()}</div>
          ) : activeView === 'api-playground' ? (
            <div className="w-full">
              <ApiPlayground />
            </div>
          ) : (
            <div className="w-full">
              <MapPlayground />
            </div>
          )}
        </main>
      </div>

      <footer className="relative w-full border-t border-white/10 bg-[#050505] py-16">
        <div className="flex w-full flex-col items-center justify-between gap-4 px-6 md:flex-row lg:px-24">
          {/* Left */}
          <div className="text-sm text-gray-500">
            AmbaLay Maps · © 2026 All rights reserved
          </div>

          {/* Right */}
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="/privacy-policy" className="transition hover:text-white">
              Privacy Policy
            </Link>

            <Link
              to="/terms-of-service"
              className="transition hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .docs-content table {
          display: block;
          width: max-content;
          min-width: 100%;
          overflow-x: auto;
          border-collapse: collapse;
        }

        .docs-content th,
        .docs-content td {
          vertical-align: top;
        }

        .docs-content img {
          max-width: 100%;
          height: auto;
        }
      `}</style>
    </div>
  )
}

const SidebarContent = ({
  sidebarLinks,
  activePage,
  onPageSelect,
  searchQuery,
  onSearchChange,
}: SidebarContentProps) => (
  <>
    <div className="relative mb-8">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        size={14}
      />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search documentation..."
        className="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-9 pr-10 text-sm transition-all focus:border-[#8cff2e]/50 focus:outline-none"
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
            <h4 className="mb-4 font-sora text-xs font-bold uppercase tracking-[0.15em] text-white/40">
              {group.group}
            </h4>
            <ul className="space-y-4 border-l border-white/5 pl-4">
              {group.items.map((item, i) => (
                <li key={i}>
                  <Link
                    to={documentationHref(item)}
                    onClick={() => onPageSelect(item)}
                    className={`block w-full text-left text-sm transition-colors ${activePage === item ? 'font-medium text-[#8cff2e]' : 'text-gray-500 hover:text-white'}`}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )}
  </>
)

const CategoryCard = ({ icon, title, desc, onClick }: CategoryCardProps) => (
  <div
    onClick={onClick}
    className="group flex h-full cursor-pointer flex-col rounded-[24px] border border-white/5 bg-[#0A0A0A] p-8 text-left transition-all hover:border-white/10 hover:bg-[#111111]"
  >
    <div className="mb-6 w-fit rounded-xl bg-white/5 p-3 transition-transform group-hover:scale-110">
      {icon}
    </div>
    <h3 className="mb-3 text-xl font-bold transition-colors group-hover:text-white">
      {title}
    </h3>
    <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
  </div>
)

const FeatureItem = ({ icon, title, desc }: FeatureItemProps) => (
  <div className="group flex gap-4">
    <div className="mt-1 shrink-0">{icon}</div>
    <div className="flex flex-col gap-1">
      <h4 className="text-base font-bold tracking-tight text-white">{title}</h4>
      <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
    </div>
  </div>
)

export default Documentation
