import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function HeroSection() {
  return (
    <section className="relative px-6 md:px-12 pt-28 pb-16 md:pt-36 md:pb-16 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/90 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#8cff2e]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 rounded-full border border-[#8cff2e]/30 bg-black/50 backdrop-blur-sm shadow-[0_0_20px_rgba(140,255,46,0.15)]">
          <span className="text-[#8cff2e] text-[11px] font-sora font-bold tracking-wider uppercase">
            from heights we see clearly
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-white leading-tight mb-4">
          Build smarter with Ambalay Maps        
        </h1>

        <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
Location data, routing, geocoding, and map tools built for teams that need 
accurate, fast, and scalable geospatial services.        
        </p>
        <div className="flex items-center justify-center gap-8">
          <Link to="/documentation">
            <button className="group flex items-center gap-2 text-white text-sm font-medium transition-colors hover:text-[#8cff2e]">
              Read Documentation
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </Link>
          <Link to="/register">
            <button className="group flex items-center gap-2 px-7 py-3 rounded-full bg-[#8cff2e] text-black font-medium transition-all duration-300 hover:shadow-[0_0_35px_#8cff2e]">
              Get Started
              <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}