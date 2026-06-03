import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { Link } from 'react-router-dom'

export default function CTASection() {
  return (
    <section className="relative overflow-visible bg-slate-50 dark:bg-black px-6 py-16 md:px-12">
      <div className="relative mx-auto max-w-5xl selection:bg-[#8cff2e] selection:text-black">
        <div className="relative z-10 overflow-hidden rounded-[32px] border border-slate-200/20 bg-white p-8 md:p-12 dark:border-white/5 dark:bg-[#0d0d0d]">
          <div className="relative z-30 max-w-sm">
            <h2 className="mb-4 text-3xl font-medium leading-tight tracking-tight text-slate-900 dark:text-white md:text-4xl">
              Ready to Build with <br /> AmbaLay Maps?
            </h2>
            <p className="mb-8 text-xs leading-relaxed text-gray-600 dark:text-gray-400 md:text-sm">
              Join thousands of developers creating amazing location-based
              experiences with our powerful API.
            </p>
            <Link to="/register">
              <button className="group flex items-center gap-2 rounded-full bg-[#8cff2e] px-6 py-2.5 text-sm font-bold text-black shadow-[0_10px_30px_rgba(140,255,46,0.15)] transition-all hover:brightness-110">
                Get Started
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </button>
            </Link>
          </div>

          <div className="absolute -right-24 -top-24 z-0 h-64 w-64 rounded-full bg-[#8cff2e]/5 blur-[80px]" />
        </div>

        <div className="pointer-events-none absolute -bottom-8 -right-2 z-20 w-[220px] md:-bottom-12 md:w-[320px]">
          <div className="relative">
            <Image
              src="/images/cta/lady.png"
              alt="Ready to build"
              width={320}
              height={480}
              className="h-auto w-full scale-125 select-none object-contain"
            />

            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white/95 dark:from-black via-white/40 dark:via-black/30 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
