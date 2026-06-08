import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { Link } from 'react-router-dom'
import { useTheme } from '../../context/useTheme'

export default function CTASection() {
  const { theme } = useTheme()
  const logoSrc = theme === 'dark' ? '/images/cta/lady-dark.png' : '/images/cta/lady-light.png'

  return (
    <section className="relative overflow-hidden bg-slate-50 dark:bg-black px-6 py-16 md:px-12">
      <div className="relative mx-auto max-w-5xl selection:bg-[#8cff2e] selection:text-black">
        
        <div className="relative z-10 overflow-hidden rounded-[32px] border border-slate-200/20 bg-white dark:border-white/5 dark:bg-[#0d0d0d]">
          
          <div className="grid grid-cols-1 items-center gap-8 p-8 md:grid-cols-12 md:p-12">
            
            <div className="relative z-30 md:col-span-7 lg:col-span-8">
              <h2 className="mb-4 text-3xl font-medium leading-tight tracking-tight text-slate-900 dark:text-white md:text-4xl">
                Ready to Build with <br /> AmbaLay Maps?
              </h2>
              <p className="mb-8 text-xs leading-relaxed text-gray-600 dark:text-gray-400 md:text-sm max-w-sm">
                Join thousands of developers creating amazing location-based
                experiences with our powerful API.
              </p>
              <Link to="/register">
                <button className="group inline-flex items-center gap-2 rounded-full bg-[#8cff2e] px-6 py-2.5 text-sm font-bold text-black shadow-[0_10px_30px_rgba(140,255,46,0.15)] transition-all hover:brightness-110">
                  Get Started
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </button>
              </Link>
            </div>

            <div className="relative z-20 h-[280px] w-full md:col-span-5 md:h-[340px] lg:col-span-4">
              <div className="relative h-full w-full">
                <Image
                  src={logoSrc}
                  alt="Ready to build"
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  priority
                  className="select-none object-contain object-bottom"
                />
                
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/20 to-transparent dark:from-[#0d0d0d] dark:via-[#0d0d0d]/30" />
              </div>
            </div>

          </div>

          <div className="absolute -right-24 -top-24 z-0 h-64 w-64 rounded-full bg-[#8cff2e]/5 blur-[80px]" />
        </div>

      </div>
    </section>
  )
}