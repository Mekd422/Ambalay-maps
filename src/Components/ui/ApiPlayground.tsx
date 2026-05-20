import React, { useState } from 'react'
import { ChevronRight, Copy, Code, Shield, Package } from 'lucide-react'

const ApiPlayground = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('overview')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('shell')
  const [copiedCode, setCopiedCode] = useState<boolean>(false)

  const categories = [
    { id: 'overview', name: 'Overview', description: 'API Overview' },
    { id: 'find-nearest', name: 'Find Nearest', description: 'Find Nearest Destination and Compare Routes' },
    { id: 'matrix', name: 'Matrix', description: 'Matrix Service' },
    { id: 'optimization', name: 'Optimization', description: 'Route Optimization' },
    { id: 'direction', name: 'Direction', description: 'Direction Service' },
    { id: 'places', name: 'Places', description: 'Places Service' },
  ]

  const codeExamples: Record<string, Record<string, string>> = {
    shell: {
      overview: `curl -X GET "https://docs.ambalay.app/api/v1" \\
  -H "Accept: application/json"`,
      'find-nearest': `curl -X GET "https://docs.ambalay.app/api/v1/nearest" \\
  -H "Accept: application/json" \\
  -d '{"lat": 9.0286, "lng": 38.7469}'`,
      matrix: `curl -X POST "https://docs.ambalay.app/api/v1/matrix" \\
  -H "Content-Type: application/json" \\
  -d '{"sources": [], "destinations": []}'`,
    },
    python: {
      overview: `import requests

response = requests.get(
    "https://docs.ambalay.app/api/v1"
)
print(response.json())`,
      'find-nearest': `import requests

response = requests.get(
    "https://docs.ambalay.app/api/v1/nearest",
    json={"lat": 9.0286, "lng": 38.7469}
)
print(response.json())`,
    },
    javascript: {
      overview: `const response = await fetch(
  'https://docs.ambalay.app/api/v1'
);
const data = await response.json();
console.log(data);`,
      'find-nearest': `const response = await fetch(
  'https://docs.ambalay.app/api/v1/nearest',
  {
    method: 'POST',
    body: JSON.stringify({
      lat: 9.0286,
      lng: 38.7469
    })
  }
);`,
    },
  }

  const getCodeExample = () => {
    return codeExamples[selectedLanguage]?.[selectedCategory] || 'Code example not available'
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <div className="flex h-full min-h-screen w-full flex-col gap-0 bg-[#050505]">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#0A0A0A] p-6">
        <h1 className="text-2xl font-bold text-white">ambalay</h1>
        <p className="mt-2 text-sm text-[#8cff2e]">Download OpenAPI Document</p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar Navigation */}
        <div className="w-72 overflow-y-auto border-r border-white/5 bg-[#0A0A0A] p-6">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-gray-500 transition-colors hover:bg-white/10 focus:border-[#8cff2e] focus:outline-none focus:ring-1 focus:ring-[#8cff2e]"
            />
          </div>

          <div className="space-y-2">
            <div className="mb-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">API Sections</h3>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left rounded-lg px-3 py-2 text-sm transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-[#8cff2e] text-black font-medium'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{category.name}</span>
                    {selectedCategory === category.id && <ChevronRight size={16} />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-900 to-slate-800 p-8">
          <div className="max-w-4xl">
            {/* Header Section */}
            <div className="mb-12">
              <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <span className="text-xs font-medium text-gray-400">OAS 3.0.1</span>
              </div>

              <h2 className="mb-4 text-4xl font-bold text-white">ambalay</h2>
              <a href="#" className="text-sm text-[#8cff2e] hover:underline">
                Download OpenAPI Document
              </a>
            </div>

            {/* Server Section */}
            <div className="mb-12 rounded-lg border border-white/10 bg-white/5 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                <Code size={20} className="text-[#8cff2e]" />
                SERVER
              </h3>
              <input
                type="text"
                value="https://docs.ambalay.app"
                readOnly
                className="w-full rounded-lg border border-white/10 bg-[#000] px-4 py-3 text-sm text-gray-300"
              />
            </div>

            {/* Authentication Section */}
            <div className="mb-12 rounded-lg border border-white/10 bg-white/5 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                <Shield size={20} className="text-[#8cff2e]" />
                AUTHENTICATION
              </h3>
              <select className="w-full rounded-lg border border-white/10 bg-[#000] px-4 py-2 text-sm text-gray-300">
                <option>None</option>
                <option>API Key</option>
                <option>Bearer Token</option>
              </select>
            </div>

            {/* Client Libraries Section */}
            <div className="mb-12 rounded-lg border border-white/10 bg-white/5 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                <Package size={20} className="text-[#8cff2e]" />
                CLIENT LIBRARIES
              </h3>
              <div className="mb-6 flex flex-wrap gap-2">
                {['Shell', 'Ruby', 'Node.js', 'PHP', 'Python'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang.toLowerCase().replace('.', ''))}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      selectedLanguage === lang.toLowerCase().replace('.', '')
                        ? 'bg-[#8cff2e] text-black'
                        : 'border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <div className="relative rounded-lg border border-white/10 bg-[#000] p-4">
                <pre className="overflow-x-auto text-xs text-gray-300">
                  <code>{getCodeExample()}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(getCodeExample())}
                  className="absolute right-4 top-4 rounded-lg bg-[#8cff2e] p-2 text-black transition-all hover:bg-[#a8ff4a]"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>

            {/* Additional Resources */}
            <div className="rounded-lg border border-white/10 bg-white/5 p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">Available Endpoints</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-start gap-3 border-l-2 border-[#8cff2e] pl-4">
                    <div>
                      <p className="font-medium text-white">{category.name}</p>
                      <p className="text-sm text-gray-400">{category.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApiPlayground