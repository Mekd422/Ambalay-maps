import React, { useState } from 'react'
import { Copy, ChevronDown } from 'lucide-react'

interface ApiResponse {
  code?: string
  status?: string
  data?: any
}

const MapPlayground = () => {
  const [apiToken, setApiToken] = useState<string>('')
  const [selectedService, setSelectedService] = useState<string>('Geocoding')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [copiedCurl, setCopiedCurl] = useState<boolean>(false)

  const services = ['Geocoding', 'Reverse Geocoding', 'Route', 'Matrix', 'Trip Tracking']

  const generateCurlCommand = () => {
    const baseUrl = 'https://mapapi.ambalay.app/api/v1'
    const endpoint = selectedService === 'Geocoding' ? '/geocoding' : '/reverse'
    return `curl -X GET "${baseUrl}${endpoint}?name=${searchQuery}&apikey=${apiToken || 'yourapitoken'}"`
  }

  const handleSearch = async () => {
    if (!apiToken || !searchQuery) {
      alert('Please provide both API token and search query')
      return
    }

    setIsLoading(true)
    try {
      setTimeout(() => {
        setApiResponse({
          code: '200',
          status: 'success',
          data: {
            results: [
              {
                name: searchQuery,
                coordinates: { lat: 9.0286, lng: 38.7469 },
                address: 'Addis Ababa, Ethiopia',
              },
            ],
          },
        })
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCurl(true)
    setTimeout(() => setCopiedCurl(false), 2000)
  }

  return (
    <div className="flex h-full min-h-screen w-full flex-col gap-0 bg-[#050505]">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#0A0A0A] p-6">
        <h1 className="text-2xl font-bold text-white">Map Playground</h1>
        <p className="mt-2 text-sm text-gray-400">Test API endpoints and visualize map data in real-time</p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-96 overflow-y-auto border-r border-white/5 bg-[#0A0A0A] p-6">
          {/* API Token */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-white">Your API Token</label>
            <input
              type="password"
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
              placeholder="Paste your API token here"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-gray-500 transition-colors hover:bg-white/10 focus:border-[#8cff2e] focus:outline-none focus:ring-1 focus:ring-[#8cff2e]"
            />
            <button className="mt-2 w-full rounded-lg bg-[#8cff2e] px-4 py-2 text-sm font-medium text-black transition-all hover:bg-[#a8ff4a]">
              Add Token
            </button>
          </div>

          {/* Service Selector */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-white">Service</label>
            <div className="relative">
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10 focus:border-[#8cff2e] focus:outline-none focus:ring-1 focus:ring-[#8cff2e]"
              >
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-white">Search</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter location name or coordinates"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-gray-500 transition-colors hover:bg-white/10 focus:border-[#8cff2e] focus:outline-none focus:ring-1 focus:ring-[#8cff2e]"
            />
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="mt-2 w-full rounded-lg bg-[#8cff2e] px-4 py-2 text-sm font-medium text-black transition-all hover:bg-[#a8ff4a] disabled:opacity-50"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {/* Request Samples */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-white">Request Samples</h3>
            <div className="space-y-2 rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="mb-2 text-xs font-medium text-gray-400">cURL</p>
                  <code className="block break-words rounded bg-[#000] p-2 text-xs text-[#8cff2e]">{generateCurlCommand()}</code>
                </div>
                <button
                  onClick={() => copyToClipboard(generateCurlCommand())}
                  className="mt-5 rounded p-2 text-gray-400 transition-colors hover:text-white"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Response Samples */}
          {apiResponse && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-white">Response</h3>
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <pre className="overflow-auto text-xs text-gray-300">
                  {JSON.stringify(apiResponse, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Right Map Area */}
        <div className="flex-1 bg-gradient-to-br from-blue-50 to-green-50">
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
                <svg className="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 003 16.382V5.618a1 1 0 011.553-.894L9 7.882" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700">Map Integration Ready</h3>
              <p className="mt-2 text-sm text-gray-500">Maps will display here when integrated</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapPlayground