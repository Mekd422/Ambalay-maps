import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function FeaturesSection() {
  const detailedFeatures = [
    {
      title: 'Geocoding & Reverse Geocoding API ',
      desc: 'Convert Locations Seamlessly Translate place names into coordinates and coordinates into meaningful locations. Built with local context for higher accuracy in informal areas.',
      icon: '/icons/geocoding.svg',
    },
    {
      title: 'Trip Tracking API',
      desc: 'Track trips live with high accuracy across urban and low-connectivity environments. Monitor routes, stops, and deviations in real time for ride-hailing, delivery, and logistics. ',
      icon: '/icons/routing.svg',
    },
    {
      title: 'Tile Serving API',
      desc: 'Serve custom, high-performance map tiles tailored for Ethiopian and African geographies. Built for speed, offline support, and full styling control.',
      icon: '/icons/static-maps.svg',
    },
    {
      title: 'Matrix API',
      desc: 'Compute travel time and distance between multiple points instantly. Perfect for logistics planning, fleet management, and route batching. ',
      icon: '/icons/search.svg',
    },
    {
      title: 'Route Optimization API',
      desc: 'Automatically generate the most efficient routes for multiple stops. Reduce fuel costs, delivery time, and operational complexity. ',
      icon: '/icons/matrix-api.svg',
    },
    {
      title: 'Landmark Translation API',
      desc: 'Convert coordinates into intuitive, landmark-based directions people actually understand.',
      icon: '/icons/elevation-api.svg',
    },
  ]

  return (
    <section className="border-t border-slate-200/10 bg-white dark:border-white/5 dark:bg-black px-6 py-24 md:px-12">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="mb-16 text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 text-[#8cff2e]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8cff2e]" />
            <span className="font-sora text-xs font-medium uppercase tracking-[0.05em]">
              Features
            </span>
          </div>
          <h2 className="text-4xl font-medium leading-tight tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Designed for clarity, built for <br className="hidden md:block" />{' '}
            better mapping solutions
          </h2>
        </motion.div>

        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {detailedFeatures.map((feature, idx) => (
            <div
              key={idx}
              className="group rounded-[32px] border border-slate-200/20 bg-white dark:border-white/5 dark:bg-[#0A0A0A] p-8 transition-all duration-300 hover:border-[#8cff2e]/20"
            >
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200/20 bg-slate-900 transition-all duration-300 group-hover:border-[#8cff2e]/50 group-hover:shadow-[0_0_20px_rgba(140,255,46,0.3)] dark:border-white/5 dark:bg-black">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={28}
                  height={28}
                  className="h-7 w-7"
                />
              </div>

              <h4 className="mb-3 text-xl font-medium text-slate-900 dark:text-white">
                {feature.title}
              </h4>
              <p className="text-base leading-relaxed text-slate-600 dark:text-zinc-400">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link to="/register">
            <button className="group flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white transition-colors hover:text-[#8cff2e]">
              Get Started
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
