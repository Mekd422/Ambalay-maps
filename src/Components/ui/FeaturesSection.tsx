import { ArrowUpRight } from "lucide-react"
import geocodingIcon from "../../assets/icons/geocoding.svg"
import routingIcon from "../../assets/icons/routing.svg"
import staticMapsIcon from "../../assets/icons/static-maps.svg"
import placesIcon from "../../assets/icons/search.svg"
import matrixIcon from "../../assets/icons/matrix-api.svg"
import elevationIcon from "../../assets/icons/elevation-api.svg"

import { motion } from "framer-motion";
import { Link } from "react-router-dom"

export default function FeaturesSection() {
  const detailedFeatures = [
    { title: "Geocoding & Reverse Geocoding API ", desc: "Convert Locations Seamlessly Translate place names into coordinates and coordinates into meaningful locations. Built with local context for higher accuracy in informal areas.", icon: geocodingIcon },
    { title: "Trip Tracking API", desc: "Track trips live with high accuracy across urban and low-connectivity environments. Monitor routes, stops, and deviations in real time for ride-hailing, delivery, and logistics. ", icon: routingIcon },
    { title: "Tile Serving API", desc: "Serve custom, high-performance map tiles tailored for Ethiopian and African geographies. Built for speed, offline support, and full styling control.", icon: staticMapsIcon },
    { title: "Matrix API", desc: "Compute travel time and distance between multiple points instantly. Perfect for logistics planning, fleet management, and route batching. ", icon: placesIcon },
    { title: "Route Optimization API", desc: "Automatically generate the most efficient routes for multiple stops. Reduce fuel costs, delivery time, and operational complexity. ", icon: matrixIcon },
    { title: "Landmark Translation API", desc: "Convert coordinates into intuitive, landmark-based directions people actually understand.", icon: elevationIcon },
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
          <Link to="/register">
          <button className="flex items-center gap-2 text-white font-medium text-sm group transition-colors hover:text-[#8cff2e]">
            Get Started 
            <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          </Link>
        </div>
      </div>
    </section>
  )
}