import { useState, useEffect } from 'react'
import { getServiceGrants } from '../../api/types'
import { CheckCircle2, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)
  const [services, setServices] = useState<string[]>([])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServiceGrants()
        setServices(data)
      } catch (error) {
        console.error('Failed to fetch services:', error)
      }
    }

    fetchServices()
  }, [])

  return (
    <section className="bg-black px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="mb-4 text-5xl font-medium text-white md:text-6xl">
          Simple plans.
        </h2>
        <p className="mb-12 text-gray-400">
          Straightforward pricing with no hidden costs. Everything{' '}
          <br className="hidden md:block" />
          you need to manage your mapping needs.
        </p>

        <div className="mb-16 flex items-center justify-center gap-4">
          <span
            className={`text-sm ${!isYearly ? 'text-[#8cff2e]' : 'text-gray-500'}`}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative h-6 w-12 rounded-full bg-white/10 p-1 transition-colors"
          >
            <div
              className={`h-4 w-4 rounded-full bg-[#8cff2e] transition-transform ${isYearly ? 'translate-x-6' : 'translate-x-0'}`}
            />
          </button>
          <span
            className={`text-sm ${isYearly ? 'text-[#8cff2e]' : 'text-gray-500'}`}
          >
            Yearly
          </span>
        </div>

        <div className="grid gap-8 text-left md:grid-cols-3">
          {/* Freemium Plan */}
          <div className="flex flex-col rounded-[32px] border border-white/5 bg-[#0A0A0A] p-10">
            <h3 className="mb-6 text-2xl font-medium text-white">Freemium</h3>
            <div className="mb-6 flex items-baseline gap-1">
              <span className="text-5xl font-medium text-white">Free</span>
            </div>
            <p className="mb-10 text-sm leading-relaxed text-gray-400">
              Perfect for getting started and testing our features.
            </p>
            <Link to="/register">
              <button className="mb-10 flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 py-4 font-medium text-white transition-all hover:bg-white/10">
                Get Started Free <ArrowUpRight size={18} />
              </button>
            </Link>
            <ul className="space-y-4">
              {services.map((service) => (
                <li
                  key={service}
                  className="flex items-center gap-3 text-sm text-gray-300"
                >
                  <CheckCircle2 size={18} className="text-gray-500" />

                  {service
                    .replace(/_/g, ' ')
                    .toLowerCase()
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </li>
              ))}
            </ul>
          </div>

          {/* Starter Plan */}
          <div className="flex flex-col rounded-[32px] border border-white/5 bg-[#0A0A0A] p-10">
            <h3 className="mb-6 text-2xl font-medium text-white">Starter</h3>
            <div className="mb-6 flex items-baseline gap-1">
              <span className="text-5xl font-medium text-white">
                {isYearly ? '3000 Birr' : '350 Birr'}
              </span>
              <span className="text-gray-500">
                /{isYearly ? 'year' : 'month'}
              </span>
            </div>
            <p className="mb-10 text-sm leading-relaxed text-gray-400">
              Perfect for freelancers and small projects.
            </p>
            <Link to="/register">
              <button className="mb-10 flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 py-4 font-medium text-white transition-all hover:bg-white/10">
                Get Started <ArrowUpRight size={18} />
              </button>
            </Link>
            <ul className="space-y-4">
              {[
                '10,000 requests/mo',
                'Standard Support',
                'Core API Access',
                'Monthly reports',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-gray-300"
                >
                  <CheckCircle2 size={18} className="text-gray-500" /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Plan */}
          <div className="relative flex flex-col rounded-[32px] border border-[#8cff2e]/20 bg-[#0A0A0A] p-10">
            <div className="absolute right-8 top-6 rounded-full bg-[#8cff2e]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#8cff2e]">
              Popular
            </div>
            <h3 className="mb-6 text-2xl font-medium text-white">Pro</h3>
            <div className="mb-6 flex items-baseline gap-1">
              <span className="text-5xl font-medium text-white">
                {isYearly ? '10000 Birr' : '1000 Birr'}
              </span>
              <span className="text-gray-500">
                /{isYearly ? 'year' : 'month'}
              </span>
            </div>
            <p className="mb-10 text-sm leading-relaxed text-gray-400">
              Advanced tools for smarter mapping experiences.
            </p>
            <Link to="/register">
              <button className="mb-10 flex w-full items-center justify-center gap-2 rounded-full bg-[#8cff2e] py-4 font-medium text-black shadow-[0_10px_30px_rgba(140,255,46,0.2)] transition-all hover:scale-[1.02]">
                Get Started <ArrowUpRight size={18} />
              </button>
            </Link>
            <ul className="space-y-4">
              {[
                'Unlimited requests',
                '24/7 Priority Support',
                'Full API Suite',
                'AI-powered routing',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-gray-300"
                >
                  <CheckCircle2 size={18} className="text-[#8cff2e]" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
