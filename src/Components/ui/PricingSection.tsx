import { useState } from "react"
import { ArrowUpRight, CheckCircle2 } from "lucide-react"
import { Link } from "react-router-dom"

const pricingPlans = [
  {
    name: "Developer",
    label: "Developer Plan",
    price: "Free",
    bestFor: ["Students", "Testing", "Hackathons", "MVP development"],
    included: [
      "1,000 Geocoding requests",
      "1,000 Direction requests",
      "1,000 Matrix elements",
      "1,000 Trip Tracking updates",
      "2,000 Tile loads/day",
      "Community support",
      "API documentation access",
    ],
    extraTitle: "Limits",
    extraItems: ["Rate limited", "No SLA", "No commercial priority support"],
    cta: "Start Building Free",
    href: "/register",
  },
  {
    name: "Startup",
    label: "Startup Plan",
    price: "750 Birr/month",
    bestFor: ["Small Ethiopian startups", "Early-stage delivery companies", "Internal business tools"],
    included: [
      "3,000 Direction requests",
      "3,000 Geocoding requests",
      "2,000 Matrix elements",
      "3,000 Trip Tracking updates",
      "3,000 Tile loads/day",
    ],
    features: ["Email support", "Dashboard analytics", "Basic usage monitoring", "API keys management"],
    cta: "Best for early-stage startups",
    href: "/register",
  },
  {
    name: "Growth",
    label: "Growth Plan",
    price: "4,500 Birr/month",
    bestFor: ["Delivery startups", "Logistics companies", "Ride-hailing", "Agritech platforms"],
    included: [
      "25,000 Direction requests",
      "25,000 Geocoding requests",
      "10,000 Matrix elements",
      "15,000 Trip Tracking updates",
      "10,000 Tile loads/day",
    ],
    features: ["Priority support", "Higher rate limits", "Usage analytics", "Webhook support", "Team API access"],
    cta: "Scale your mobility platform",
    href: "/register",
  },
  {
    name: "Business",
    label: "Business Plan",
    price: "8,500 Birr/month",
    bestFor: ["Large startups", "Enterprise mobility", "Logistics fleets", "Government & NGOs"],
    included: [
      "100,000 Direction requests",
      "100,000 Geocoding requests",
      "50,000 Matrix elements",
      "100,000 Trip Tracking updates",
      "25,000 Tile loads/day",
    ],
    features: [
      "Priority infrastructure",
      "Faster response SLAs",
      "Dedicated support",
      "Advanced analytics",
      "Multi-team access",
      "Higher concurrency limits",
    ],
    cta: "Built for high-scale operations",
    href: "/register",
  },
  {
    name: "Enterprise",
    label: "Enterprise Plan",
    price: "Custom Pricing",
    bestFor: ["National platforms", "Telecoms", "Government", "Banking", "Smart city projects"],
    included: [
      "Unlimited or negotiated usage",
      "Dedicated infrastructure",
      "SLA contracts",
      "Dedicated account manager",
      "Private deployment",
      "On-premise options",
      "Custom APIs",
      "AI integrations",
      "Data partnerships",
    ],
    cta: "Let’s build together",
    href: "/contact",
  },
]

export default function PricingSection() {
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null)

  const togglePlan = (planName: string) => {
    setExpandedPlan((current) => (current === planName ? null : planName))
  }

  return (
    <section className="bg-white dark:bg-black px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mb-4 text-5xl font-medium text-slate-900 dark:text-white md:text-6xl">Simple plans.</h2>
        <p className="mb-12 text-gray-600 dark:text-gray-400">
          Straightforward pricing with no hidden costs. Everything{' '}
          <br className="hidden md:block" />
          you need to manage your mapping needs.
        </p>

        <div className="grid gap-8 text-left sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center">
          {pricingPlans.map((plan) => {
            const isExpanded = expandedPlan === plan.name

            return (
              <div
                key={plan.name}
                className="w-full max-w-[380px] bg-white dark:bg-[#0A0A0A] border border-slate-200/20 dark:border-white/5 rounded-[32px] p-8 flex flex-col"
              >
                <div>
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-medium text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                      <p className="text-sm text-[#8cff2e] uppercase tracking-widest">{plan.label}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => togglePlan(plan.name)}
                      aria-expanded={isExpanded}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200/30 bg-slate-100/70 px-4 py-2 text-sm font-medium text-slate-900 transition-all hover:border-[#8cff2e] hover:text-[#8cff2e] dark:border-white/10 dark:bg-white/5 dark:text-white"
                    >
                      {isExpanded ? 'Collapse' : 'Expand'}
                      <ArrowUpRight
                        size={16}
                        className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </div>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-5xl font-medium text-slate-900 dark:text-white">{plan.price}</span>
                  </div>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  aria-hidden={!isExpanded}
                >
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-4">Best for</p>
                    <ul className="space-y-3">
                      {plan.bestFor.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-slate-700 dark:text-gray-300">
                          <span className="mt-[2px] text-[#8cff2e]">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-gray-400 uppercase tracking-widest mb-4">Included</p>
                    <ul className="space-y-4">
                      {plan.included.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-slate-700 dark:text-gray-300">
                          <CheckCircle2 size={18} className="text-[#8cff2e]" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.features ? (
                    <div className="mb-6">
                      <p className="text-sm text-gray-400 uppercase tracking-widest mb-4">Features</p>
                      <ul className="space-y-4">
                        {plan.features.map((item) => (
                          <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                            <CheckCircle2 size={18} className="text-[#8cff2e]" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : plan.extraItems ? (
                    <div className="mb-6">
                      <p className="text-sm text-gray-400 uppercase tracking-widest mb-4">{plan.extraTitle}</p>
                      <ul className="space-y-4">
                        {plan.extraItems.map((item) => (
                          <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                            <CheckCircle2 size={18} className="text-[#8cff2e]" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>

                <div className="mt-auto">
                  <Link to={plan.href}>
                    <button className="w-full py-3 px-5 bg-[#8cff2e] text-black text-sm rounded-full font-medium flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(140,255,46,0.2)] hover:scale-[1.02] transition-all">
                      {plan.cta}
                      <ArrowUpRight size={18} />
                    </button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16 bg-slate-100/70 border border-slate-200/20 rounded-[32px] p-10 text-left dark:bg-white/5 dark:border-white/10">
          <h3 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6">Annual Billing Discounts</h3>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 border border-slate-200/20 dark:bg-[#0B0B0B] dark:border-white/5">
              <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-3">Startup</p>
              <p className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">750 ETB</p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Annual Equivalent</p>
              <p className="text-xl font-semibold text-[#8cff2e]">600 ETB/month</p>
            </div>
            <div className="rounded-3xl bg-white p-6 border border-slate-200/20 dark:bg-[#0B0B0B] dark:border-white/5">
              <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-3">Growth</p>
              <p className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">4,500 ETB</p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Annual Equivalent</p>
              <p className="text-xl font-semibold text-[#8cff2e]">3,800 ETB/month</p>
            </div>
            <div className="rounded-3xl bg-white p-6 border border-slate-200/20 dark:bg-[#0B0B0B] dark:border-white/5">
              <p className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-3">Business</p>
              <p className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">8,500 ETB</p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Annual Discount</p>
              <p className="text-xl font-semibold text-[#8cff2e]">15–20% discount annually</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
