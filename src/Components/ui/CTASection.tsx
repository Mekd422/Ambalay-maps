import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="bg-black py-16 px-6 md:px-12 relative overflow-visible">
      <div className="max-w-5xl mx-auto relative selection:bg-[#8cff2e] selection:text-black">
        
        <div className="relative bg-[#0d0d0d] rounded-[32px] border border-white/5 p-8 md:p-12 overflow-hidden z-10">
          
          <div className="max-w-sm relative z-30">
            <h2 className="text-3xl md:text-4xl font-medium text-white mb-4 leading-tight tracking-tight">
              Ready to Build with <br /> AmbaLay Maps?
            </h2>
            <p className="text-gray-400 text-xs md:text-sm mb-8 leading-relaxed">
              Join thousands of developers creating amazing location-based experiences with our powerful API.
            </p>
            <Link to="/register">
              <button className="group bg-[#8cff2e] hover:brightness-110 text-black px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-[0_10px_30px_rgba(140,255,46,0.15)]">
                Get Started 
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Link>
          </div>

          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#8cff2e]/5 blur-[80px] rounded-full z-0" />
        </div>

        <div className="absolute -right-2 -bottom-8 md:-bottom-12 w-[220px] md:w-[320px] z-20 pointer-events-none">
          <div className="relative">
            <Image 
              src="/images/cta/lady.png" 
              alt="Ready to build" 
              width={320}
              height={480}
              className="w-full h-auto object-contain select-none scale-150"
              style={{
                maskImage: 'linear-gradient(to bottom, black 35%, rgba(0,0,0,0.6) 65%, transparent 95%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 35%, rgba(0,0,0,0.6) 65%, transparent 95%)'
              }}
            />
            
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/30 to-transparent" />
          </div>
        </div>

      </div>
    </section>
  );
}
