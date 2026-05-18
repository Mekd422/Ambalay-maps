import React, { useState } from 'react';

interface Tier {
  min: number;
  max?: number;
  pricePerUnit?: number;
  label: string;
  custom?: boolean;
}

interface PricingTierProps {
  title: string;
  unitLabel: string;
  tiers: Tier[];
  maxAmount: number;
}

const formatNumber = (value: number) =>
  value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

const calculateCost = (amount: number, tiers: Tier[]) => {
  let cost = 0;
  let customThreshold: number | null = null;

  for (const tier of tiers) {
    if (tier.custom && amount > tier.min) {
      customThreshold = tier.min;
      break;
    }

    const tierStart = tier.min;
    const tierEnd = tier.max !== undefined ? Math.min(amount, tier.max) : amount;
    const tierQuantity = Math.max(0, tierEnd - tierStart);

    if (tier.pricePerUnit !== undefined && tierQuantity > 0) {
      cost += tierQuantity * tier.pricePerUnit;
    }
  }

  return { cost, customThreshold };
};

const PricingTier = ({ title, unitLabel, tiers, maxAmount }: PricingTierProps) => {
  const [quantity, setQuantity] = useState<number>(0);
  const progressPercent = (quantity / maxAmount) * 100;
  const { cost } = calculateCost(quantity, tiers);
  const totalCost = cost.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(isNaN(value) ? 0 : Math.max(0, Math.min(value, maxAmount)));
  };

  const customTier = tiers.find((tier) => tier.custom && quantity > tier.min);

  return (
    <div className="bg-gray-50 dark:bg-[#111] p-6 rounded-2xl border border-gray-200 dark:border-white/10 mb-6 font-sora">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">{title}</h3>
          <div className="text-sm text-gray-500 mt-1">{unitLabel}</div>
        </div>
        <span className="text-3xl font-bold text-gray-900 dark:text-white">{totalCost} Birr</span>
      </div>

      <div className="space-y-6">
        <input
          type="range"
          min="0"
          max={maxAmount}
          step="1000"
          value={quantity}
          onChange={handleInputChange}
          style={{
            background: `linear-gradient(to right, #22c55e 0%, #22c55e ${progressPercent}%, #e5e7eb ${progressPercent}%, #e5e7eb 100%)`,
          }}
          className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-[#8cff2e] dark:accent-[#8cff2e]"
        />

        <div className="flex justify-between items-start">
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500">0</span>
            <span className="mt-2 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] rounded font-bold uppercase">Included</span>
          </div>

          <div className="relative">
            <input
              type="number"
              value={quantity === 0 ? '' : quantity}
              placeholder="0"
              onChange={handleInputChange}
              className="w-32 px-3 py-2 bg-white dark:bg-black border border-gray-300 dark:border-white/20 rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-[#8cff2e] text-gray-900 dark:text-white"
            />
            <span className="block text-[10px] text-center text-gray-500 mt-1 uppercase font-medium">{unitLabel}</span>
          </div>

          <span className="text-sm text-gray-500">{formatNumber(maxAmount)}</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {tiers.map((tier) => (
            <div key={tier.label} className="rounded-2xl bg-white dark:bg-[#0b1220] p-4 border border-gray-200 dark:border-white/10">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{tier.label}</span>
                <span className="text-xs text-gray-500">
                  {tier.custom ? 'Custom' : tier.pricePerUnit === 0 ? 'Included' : `${tier.pricePerUnit?.toFixed(3)} ETB/${unitLabel.toLowerCase().slice(0, -1)}`}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {formatNumber(tier.min)}{tier.max !== undefined ? ` - ${formatNumber(tier.max)}` : '+'}
              </p>
            </div>
          ))}
        </div>

        {customTier && (
          <div className="rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 p-4 border border-yellow-200 dark:border-yellow-500 text-sm text-yellow-900 dark:text-yellow-100">
            Custom pricing applies above {formatNumber(customTier.min)} {unitLabel.toLowerCase()}.
          </div>
        )}
      </div>
    </div>
  );
};

export default function UsageCalculator() {
  const pricingData = [
    {
      title: 'Direction API',
      unitLabel: 'Requests',
      maxAmount: 10000000,
      tiers: [
        { min: 0, max: 10000, pricePerUnit: 0, label: '0 - 10K' },
        { min: 10000, max: 100000, pricePerUnit: 0.12, label: '10K - 100K' },
        { min: 100000, max: 1000000, pricePerUnit: 0.08, label: '100K - 1M' },
        { min: 1000000, label: '1M+', custom: true },
      ],
    },
    {
      title: 'Geocoding API',
      unitLabel: 'Requests',
      maxAmount: 10000000,
      tiers: [
        { min: 0, max: 10000, pricePerUnit: 0, label: '0 - 10K' },
        { min: 10000, max: 100000, pricePerUnit: 0.1, label: '10K - 100K' },
        { min: 100000, max: 1000000, pricePerUnit: 0.07, label: '100K - 1M' },
        { min: 1000000, label: '1M+', custom: true },
      ],
    },
    {
      title: 'Matrix API',
      unitLabel: 'Elements',
      maxAmount: 10000000,
      tiers: [
        { min: 0, max: 50000, pricePerUnit: 0, label: '0 - 50K' },
        { min: 50000, max: 500000, pricePerUnit: 0.004, label: '50K - 500K' },
        { min: 500000, max: 5000000, pricePerUnit: 0.002, label: '500K - 5M' },
        { min: 5000000, label: '5M+', custom: true },
      ],
    },
    {
      title: 'Trip Tracking API',
      unitLabel: 'Updates',
      maxAmount: 10000000,
      tiers: [
        { min: 0, max: 50000, pricePerUnit: 0, label: '0 - 50K' },
        { min: 50000, max: 500000, pricePerUnit: 0.003, label: '50K - 500K' },
        { min: 500000, label: '500K+', custom: true },
      ],
    },
    {
      title: 'Tile API',
      unitLabel: 'Loads',
      maxAmount: 10000000,
      tiers: [
        { min: 0, max: 100000, pricePerUnit: 0, label: '0 - 100K' },
        { min: 100000, max: 1000000, pricePerUnit: 0.001, label: '100K - 1M' },
        { min: 1000000, label: '1M+', custom: true },
      ],
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-6 py-12 font-sora">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Calculate Your Usage Cost</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Use the sliders or input fields to estimate your monthly usage cost for each service. Values above the listed tiers show when custom pricing applies.
        </p>
      </div>

      {pricingData.map((item) => (
        <PricingTier key={item.title} title={item.title} unitLabel={item.unitLabel} tiers={item.tiers} maxAmount={item.maxAmount} />
      ))}
    </section>
  );
}
