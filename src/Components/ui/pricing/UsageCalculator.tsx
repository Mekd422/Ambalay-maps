import React, { useState } from 'react'

interface PricingTierProps {
  title: string
  pricePerUnit: number
  unitLabel?: string
  freeTier?: number
}

const PricingTier = ({
  title,
  pricePerUnit,
  unitLabel = 'Requests',
  freeTier = 0,
}: PricingTierProps) => {
  const [requests, setRequests] = useState<number>(0)
  const maxRequests = 10000000

  const billableRequests = Math.max(0, requests - freeTier)
  const totalCost = (billableRequests * pricePerUnit).toLocaleString(
    undefined,
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    },
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setRequests(isNaN(value) ? 0 : value)
  }

  const progressPercent = (requests / maxRequests) * 100

  return (
    <div className="mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-6 font-sora dark:border-white/10 dark:bg-[#111]">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h3>
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          {totalCost} Birr
        </span>
      </div>

      <div className="space-y-6">
        <input
          type="range"
          min="0"
          max={maxRequests}
          step="1000"
          value={requests}
          onChange={handleInputChange}
          style={{
            background: `linear-gradient(to right, #22c55e 0%, #22c55e ${progressPercent}%, #e5e7eb ${progressPercent}%, #e5e7eb 100%)`,
          }}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg accent-[#8cff2e] dark:accent-[#8cff2e]"
        />

        <div className="flex items-start justify-between">
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500">0</span>
            {freeTier > 0 && (
              <span className="mt-2 rounded bg-green-100 px-2 py-0.5 text-[10px] font-bold uppercase text-green-700 dark:bg-green-900/30 dark:text-green-400">
                Included
              </span>
            )}
          </div>

          {freeTier > 0 && <span className="text-sm text-gray-500">50K</span>}

          <div className="relative">
            <input
              type="number"
              value={requests === 0 ? '' : requests}
              placeholder="0"
              onChange={handleInputChange}
              className="w-32 rounded-lg border border-gray-300 bg-white px-3 py-2 text-right text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#8cff2e] dark:border-white/20 dark:bg-black dark:text-white"
            />
            <span className="mt-1 block text-center text-[10px] font-medium uppercase text-gray-500">
              {unitLabel}
            </span>
          </div>

          <span className="text-sm text-gray-500">10M</span>
        </div>
      </div>
    </div>
  )
}

export default function UsageCalculator() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12 font-sora">
      <div className="mb-10 text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
          Calculate Your Usage Cost
        </h2>
      </div>

      <PricingTier
        title="Geocoding"
        pricePerUnit={0.002}
        unitLabel="Requests"
      />

      <PricingTier title="Matrix" pricePerUnit={0.005} unitLabel="Requests" />

      <PricingTier title="Route" pricePerUnit={0.007} unitLabel="Requests" />

      <PricingTier title="Tiles" pricePerUnit={0.007} unitLabel="Requests" />

      <PricingTier title="Trips" pricePerUnit={0.007} unitLabel="Requests" />

      {/* <PricingTier 
        title="LLM" 
        pricePerUnit={0.007} 
        unitLabel="Requests"
      />

      <PricingTier 
        title="Optimized Route API" 
        pricePerUnit={0.007} 
        unitLabel="Requests"
      /> */}
    </section>
  )
}
