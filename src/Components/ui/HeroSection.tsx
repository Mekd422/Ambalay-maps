import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="relative z-0 overflow-hidden bg-white dark:bg-black px-6 pb-16 pt-28 md:px-12 md:pb-16 md:pt-36">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-white to-white/90 dark:from-black dark:via-black dark:to-black/90" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[#8cff2e]/20 blur-[120px]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-8 inline-flex items-center justify-center rounded-full border border-[#8cff2e]/30 bg-white/30 dark:bg-black/50 px-4 py-1.5 shadow-[0_0_20px_rgba(140,255,46,0.15)] backdrop-blur-sm">
          <span className="font-sora text-[11px] font-bold uppercase tracking-wider text-[#8cff2e]">
            from heights we see clearly
          </span>
        </div>
        <h1 className="mb-4 text-4xl font-medium leading-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
          Build smarter with Ambalay Maps
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-gray-400 sm:text-base md:text-lg">
          Location data, routing, geocoding, and map tools built for teams that
          need accurate, fast, and scalable geospatial services.
        </p>
        <div className="flex items-center justify-center gap-8">
          <Link to="/documentation">
            <button className="group flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-[#8cff2e]">
              Read Documentation
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </button>
          </Link>
          <Link to="/register">
            <button className="group flex items-center gap-2 rounded-full bg-[#8cff2e] px-7 py-3 font-medium text-black transition-all duration-300 hover:shadow-[0_0_35px_#8cff2e]">
              Get Started
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
