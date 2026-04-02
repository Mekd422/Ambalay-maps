import { ArrowUpRight } from "lucide-react"
import geocodingIcon from "../../assets/icons/geocoding.svg"
import routingIcon from "../../assets/icons/routing.svg"
import staticMapsIcon from "../../assets/icons/static-maps.svg"
import placesIcon from "../../assets/icons/search.svg"
import matrixIcon from "../../assets/icons/matrix-api.svg"
import elevationIcon from "../../assets/icons/elevation-api.svg"

import { motion } from "framer-motion";

export default function FeaturesSection() {
  const detailedFeatures = [
    { title: "Geocoding", desc: "Convert addresses to coordinates and back with high accuracy. Our geocoding API provides precise location data.", icon: geocodingIcon },
    { title: "Routing", desc: "Calculate optimal routes between multiple points. Get detailed turn-by-turn directions and travel times.", icon: routingIcon },
    { title: "Static Maps", desc: "Generate map images with custom markers and styling for embedding in emails or reports.", icon: staticMapsIcon },
    { title: "Places Search", desc: "Find points of interest around specific locations. Search for restaurants, hotels, and landmarks.", icon: placesIcon },
    { title: "Matrix API", desc: "Calculate travel times between multiple origins and destinations. Optimize complex logistics.", icon: matrixIcon },
    { title: "Elevation API", desc: "Get terrain elevation data for any point on Earth. Access accurate elevation data for planning.", icon: elevationIcon },
  ]

  return (
    <section className="px-6 md:px-12 py-24 bg-black border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ y: 40, opacity: 0 }} 
          whileInView={{ y: 0, opacity: 1 }} 
          viewport={{ once: true }}
          transition={{ 
            duration: 0.7, 
            ease: [0.21, 0.47, 0.32, 0.98] 
          }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-[#8cff2e] mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8cff2e]" />
            <span className="text-xs font-sora font-medium uppercase tracking-[0.05em]">Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight leading-tight">
            Designed for clarity, built for <br className="hidden md:block" /> better mapping solutions
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
  {detailedFeatures.map((feature, idx) => (
    <div 
      key={idx} 
      className="group bg-[#0A0A0A] border border-white/5 rounded-[32px] p-8 transition-all hover:border-[#8cff2e]/20 duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-black border border-white/5 flex items-center justify-center mb-8 
                      transition-all duration-300 
                      group-hover:border-[#8cff2e]/50 
                      group-hover:shadow-[0_0_20px_rgba(140,255,46,0.3)]">
        <img 
          src={feature.icon} 
          alt={feature.title} 
          className="w-7 h-7" 
        />
      </div>
      
      <h4 className="text-xl font-medium text-white mb-3">{feature.title}</h4>
      <p className="text-base text-zinc-400 leading-relaxed">{feature.desc}</p>
    </div>
  ))}
</div>

        <div className="flex justify-center">
          <button className="flex items-center gap-2 text-white font-medium text-sm group transition-colors hover:text-[#8cff2e]">
            Get Started 
            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  )
}