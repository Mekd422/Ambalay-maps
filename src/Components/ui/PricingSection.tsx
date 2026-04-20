import { useState } from "react"
import { CheckCircle2, ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section className="px-6 md:px-12 py-24 bg-black">
      <div className="max-w-5xl mx-auto text-center">
        {/* <span className="label text-[#8cff2e]">• Pricing</span> */}
        <h2 className="text-5xl md:text-6xl font-medium text-white mb-4">Simple plans.</h2>
        <p className="text-gray-400 mb-12">Straightforward pricing with no hidden costs. Everything <br className="hidden md:block"/> you need to manage your mapping needs.</p>
        
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={`text-sm ${!isYearly ? 'text-[#8cff2e]' : 'text-gray-500'}`}>Monthly</span>
          <button 
            onClick={() => setIsYearly(!isYearly)}
            className="w-12 h-6 rounded-full bg-white/10 relative p-1 transition-colors"
          >
            <div className={`w-4 h-4 rounded-full bg-[#8cff2e] transition-transform ${isYearly ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
          <span className={`text-sm ${isYearly ? 'text-[#8cff2e]' : 'text-gray-500'}`}>Yearly</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
          <div className="bg-[#0A0A0A] border border-white/5 rounded-[32px] p-10 flex flex-col">
            <h3 className="text-2xl font-medium text-white mb-6">Starter</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-medium text-white">{isYearly ? "3000 Birr" : "350 Birr"}</span>
              <span className="text-gray-500">/{isYearly ? 'year' : 'month'}</span>
            </div>
            <p className="text-gray-400 text-sm mb-10 leading-relaxed">Perfect for freelancers and small projects.</p>
            <Link to="/register">
              <button className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium mb-10 flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                Get Started <ArrowUpRight size={18} />
              </button>
            </Link>
            <ul className="space-y-4">
              {["10,000 requests/mo", "Standard Support", "Core API Access", "Monthly reports"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 size={18} className="text-gray-500" /> {item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-[#0A0A0A] border border-[#8cff2e]/20 rounded-[32px] p-10 flex flex-col relative">
            <div className="absolute top-6 right-8 bg-[#8cff2e]/10 text-[#8cff2e] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Popular</div>
            <h3 className="text-2xl font-medium text-white mb-6">Pro</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-medium text-white">{isYearly ? "10000 Birr" : "1000 Birr"}</span>
              <span className="text-gray-500">/{isYearly ? 'year' : 'month'}</span>
            </div>
            <p className="text-gray-400 text-sm mb-10 leading-relaxed">Advanced tools for smarter mapping experiences.</p>
            <Link to="/register">
              <button className="w-full py-4 bg-[#8cff2e] text-black rounded-full font-medium mb-10 flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(140,255,46,0.2)] hover:scale-[1.02] transition-all">
                Get Started <ArrowUpRight size={18} />
              </button>
            </Link>
            <ul className="space-y-4">
              {["Unlimited requests", "24/7 Priority Support", "Full API Suite", "AI-powered routing"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-300"><CheckCircle2 size={18} className="text-[#8cff2e]" /> {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}