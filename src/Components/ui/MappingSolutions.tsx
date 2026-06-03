import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function MappingSolutions() {
  return (
    <section id="solutions" className="bg-slate-50 dark:bg-black px-6 py-24 md:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 flex flex-col justify-between gap-8 overflow-hidden md:flex-row md:items-end">
          <motion.h2
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="scale-x-70 inline-block origin-left scale-y-110 text-4xl font-medium leading-none tracking-[-0.05em] text-slate-900 dark:text-white md:text-5xl"
          >
            Comprehensive <br /> Mapping Solutions.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="max-w-sm text-lg text-gray-600 dark:text-gray-400"
          >
            From simple markers to complex routing algorithms, our API provides
            everything you need for location-based applications.
          </motion.p>
        </div>

        <div className="mb-6 grid gap-6 md:grid-cols-[1.6fr_1fr]">
          <div className="group flex h-full flex-col overflow-hidden rounded-[32px] border border-slate-200/20 bg-white transition-all hover:border-slate-300/40 dark:border-white/5 dark:bg-[#0A0A0A]">
            <div className="relative flex h-[320px] items-center justify-center overflow-hidden bg-slate-900 dark:bg-[#111]">
              <Image
                src="/images/solutions/dev.jpg"
                alt="Geo"
                width={640}
                height={640}
                className="h-auto w-[80%] object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
            </div>
            <div className="p-8">
              <h3 className="mb-3 text-2xl font-semibold text-slate-900 dark:text-white">
                For Developers
              </h3>
              <p className="max-w-sm text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Easy-to-use APIs for geocoding, routing, and map display.
              </p>
            </div>
          </div>

          <div className="group flex h-full flex-col overflow-hidden rounded-[32px] border border-slate-200/20 bg-white transition-all hover:border-slate-300/40 dark:border-white/5 dark:bg-[#0A0A0A]">
            <div className="relative flex h-[320px] items-center justify-center overflow-hidden bg-slate-900 dark:bg-[#111]">
              <Image
                src="/images/solutions/img-bic.jpg"
                alt="Cashflow Overview"
                width={640}
                height={640}
                className="h-auto w-[80%] object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
            </div>
            <div className="p-8">
              <h3 className="mb-3 text-2xl font-semibold leading-tight text-slate-900 dark:text-white">
                For Logistics Teams
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Plan routes, optimize deliveries, and track travel efficiency.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="group flex flex-col overflow-hidden rounded-[32px] border border-slate-200/20 bg-white transition-all hover:border-slate-300/40 dark:border-white/5 dark:bg-[#0A0A0A]">
            <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-slate-900 dark:bg-[#111]">
              <Image
                src="/images/solutions/ride.png"
                alt="Spending"
                width={640}
                height={640}
                className="h-auto w-[85%] object-contain transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
            </div>
            <div className="p-8">
              <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                For Businesses
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Add location search, store mapping, and address intelligence to
                your product.
              </p>
            </div>
          </div>

          <div className="group flex flex-col overflow-hidden rounded-[32px] border border-slate-200/20 bg-white transition-all hover:border-slate-300/40 dark:border-white/5 dark:bg-[#0A0A0A]">
            <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-slate-900 dark:bg-[#111]">
              <Image
                src="/images/solutions/operations.jpg"
                alt="Savings"
                width={640}
                height={640}
                className="h-auto w-[85%] object-contain transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
            </div>
            <div className="p-8">
              <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
                For Operations
              </h3>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Make field work, dispatching, and coverage planning more
                efficient.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-1 flex-col justify-center rounded-[32px] border border-slate-200/20 bg-white p-8 dark:border-white/5 dark:bg-[#0A0A0A]">
              <div className="mb-6 flex items-center -space-x-3">
                {[
                  '/images/people/person-1.png',
                  '/images/people/person-2.png',
                  '/images/people/person-3.png',
                ].map((p, i) => (
                  <Image
                    key={i}
                    src={p}
                    alt={`Active developer ${i + 1}`}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full border-4 border-[#0A0A0A] object-cover"
                  />
                ))}
              </div>
              <h4 className="text-2xl font-medium leading-tight text-slate-900 dark:text-white">
                50+ developers actively <br /> using Ambalay APIs
              </h4>
            </div>

            <div className="flex flex-1 flex-col justify-center rounded-[32px] border border-slate-200/20 bg-white p-8 dark:border-white/5 dark:bg-[#0A0A0A]">
              <h4 className="mb-3 text-3xl font-medium text-slate-900 dark:text-white">
                500,000+ API requests
              </h4>
              <p className="mb-6 max-w-[200px] text-sm leading-relaxed text-gray-500">
                processed and growing
              </p>
              <Link to="/register">
                <button className="group flex items-center gap-2 text-sm font-medium text-[#8cff2e]">
                  Get Started
                  <ArrowUpRight
                    size={18}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
