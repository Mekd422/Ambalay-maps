import React, { useState } from 'react';

interface PricingTierProps {
  title: string;
  pricePerUnit: number;
  unitLabel?: string; 
  freeTier?: number;  
}

const PricingTier = ({ title, pricePerUnit, unitLabel = "Requests", freeTier = 0 }: PricingTierProps) => {
  const [requests, setRequests] = useState<number>(0);
  const maxRequests = 10000000;

  const billableRequests = Math.max(0, requests - freeTier);
  const totalCost = (billableRequests * pricePerUnit).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setRequests(isNaN(value) ? 0 : value);
  };

  const progressPercent = (requests / maxRequests) * 100;

  return (
    <div className="bg-gray-50 dark:bg-[#111] p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-6 font-sora">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
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
            background: `linear-gradient(to right, #22c55e 0%, #22c55e ${progressPercent}%, #e5e7eb ${progressPercent}%, #e5e7eb 100%)`
          }}
          className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-[#8cff2e] dark:accent-[#8cff2e]"
        />
        
        <div className="flex justify-between items-start">
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500">0</span>
            {freeTier > 0 && (
              <span className="mt-2 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] rounded font-bold uppercase">
                Included
              </span>
            )}
          </div>

          {freeTier > 0 && (
            <span className="text-sm text-gray-500">50K</span>
          )}

          <div className="relative">
            <input
              type="number"
              value={requests === 0 ? '' : requests}
              placeholder="0"
              onChange={handleInputChange}
              className="w-32 px-3 py-2 bg-white dark:bg-black border border-gray-300 dark:border-white/20 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-[#8cff2e] text-gray-900 dark:text-white"
            />
            <span className="block text-[10px] text-center text-gray-500 mt-1 uppercase font-medium">
              {unitLabel}
            </span>
          </div>

          <span className="text-sm text-gray-500">10M</span>
        </div>
      </div>
    </div>
  );
};

export default function UsageCalculator() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-12 font-sora">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Calculate Your Usage Cost
        </h2>
      </div>

      <PricingTier 
        title="Geocoding" 
        pricePerUnit={0.002} 
        unitLabel="Requests"
      />
      
      <PricingTier 
        title="Matrix" 
        pricePerUnit={0.005} 
        unitLabel="Requests"
      />

      <PricingTier 
        title="Route" 
        pricePerUnit={0.007} 
        unitLabel="Requests"
      />

      <PricingTier 
        title="Tiles" 
        pricePerUnit={0.007} 
        unitLabel="Requests"
      />

      <PricingTier 
        title="Trips" 
        pricePerUnit={0.007} 
        unitLabel="Requests"
      />
      
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
  );
}