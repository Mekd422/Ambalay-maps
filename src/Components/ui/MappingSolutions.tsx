import { ArrowUpRight } from "lucide-react"
import geoImg from "../../assets/images/mapping-solutions-img1.png" 
import cashflowImg from "../../assets/images/mapping-solutions-img2.png"
import spendingImg from "../../assets/images/mapping-solutions-img3.png" 
import savingsImg from "../../assets/images/mapping-solutions-img4.png"
import person1 from "../../assets/images/person1.png"
import person2 from "../../assets/images/person2.png"
import person3 from "../../assets/images/person3.png"

import { motion } from "framer-motion"

export default function MappingSolutions() {
  return (
    <section className="px-6 md:px-12 py-24 bg-black">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 overflow-hidden">
        <motion.h2 
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-medium text-white leading-none inline-block origin-left tracking-[-0.05em] scale-x-70 scale-y-110"
        >
          Comprehensive <br /> Mapping Solutions.
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-lg text-gray-400 max-w-sm"
        >
          From simple markers to complex routing algorithms, our API provides everything you need for location-based applications.
        </motion.p>
      </div>

<div className="grid md:grid-cols-[1.6fr_1fr] gap-6 mb-6">
  
  <div className="group rounded-[32px] bg-[#0A0A0A] border border-white/5 overflow-hidden flex flex-col h-full transition-all hover:border-white/10">
    <div className="relative bg-[#111] flex items-center justify-center overflow-hidden h-[320px]">
      <img 
        src={geoImg} 
        alt="Geo" 
        className="w-[80%] h-auto object-contain transition-transform duration-500 group-hover:scale-105" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
    </div>
    <div className="p-8">
      <h3 className="text-2xl font-semibold text-white mb-3">Geo</h3>
      <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
        See all your accounts in one view — balances, spending, and goals.
      </p>
    </div>
  </div>

  <div className="group rounded-[32px] bg-[#0A0A0A] border border-white/5 overflow-hidden flex flex-col h-full transition-all hover:border-white/10">
    <div className="relative bg-[#111] flex items-center justify-center overflow-hidden h-[320px]">
      <img 
        src={cashflowImg} 
        alt="Cashflow Overview" 
        className="w-[80%] h-auto object-contain transition-transform duration-500 group-hover:scale-105" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
    </div>
    <div className="p-8">
      <h3 className="text-2xl font-semibold text-white mb-3 leading-tight">Cashflow Overview</h3>
      <p className="text-gray-400 text-sm leading-relaxed">
        Track your daily income and expenses to understand your flow.
      </p>
    </div>
  </div>

</div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-[32px] bg-[#0A0A0A] border border-white/5 overflow-hidden flex flex-col transition-all hover:border-white/10 group">
            <div className="relative bg-[#111] aspect-square flex items-center justify-center overflow-hidden">
              <img 
                src={spendingImg} 
                alt="Spending" 
                className="w-[85%] h-auto object-contain transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
            </div>
            <div className="p-8">
              <h3 className="text-xl font-semibold text-white mb-2">Spending Breakdown</h3>
              <p className="text-gray-400 text-sm leading-relaxed">See exactly how your money is split across categories.</p>
            </div>
          </div>

          <div className="rounded-[32px] bg-[#0A0A0A] border border-white/5 overflow-hidden flex flex-col transition-all hover:border-white/10 group">
            <div className="relative bg-[#111] aspect-square flex items-center justify-center overflow-hidden">
              <img 
                src={savingsImg} 
                alt="Savings" 
                className="w-[85%] h-auto object-contain transition-transform duration-500 group-hover:scale-105" 
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
            </div>
            <div className="p-8">
              <h3 className="text-xl font-semibold text-white mb-2">Savings Goal</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Stay focused on your savings targets and follow your progress.</p>
            </div>
          </div>


          <div className="flex flex-col gap-6">
            <div className="bg-[#0A0A0A] rounded-[32px] border border-white/5 p-8 flex-1 flex flex-col justify-center">
              <div className="flex items-center -space-x-3 mb-6">
                {[person1, person2, person3].map((p, i) => (
                  <img key={i} src={p} className="h-12 w-12 rounded-full border-4 border-[#0A0A0A] object-cover" />
                ))}
              </div>
              <h4 className="text-2xl font-medium text-white leading-tight">Trusted by 3k+ <br /> Freelancers</h4>
            </div>

            <div className="bg-[#0A0A0A] rounded-[32px] border border-white/5 p-8 flex-1 flex flex-col justify-center">
              <h4 className="text-3xl font-medium text-white mb-3">$1.2M+ Saved</h4>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed max-w-[200px]">Clario helps users save more — and spend smarter.</p>
              <button className="flex items-center gap-2 text-[#8cff2e] font-medium text-sm group">
                Get Started 
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}