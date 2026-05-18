import { XCircle, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function ComparisonSection() {
  return (
    <section className="overflow-hidden bg-black px-6 py-24 md:px-12">
      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.1,
          }}
        >
          <div className="mb-6 inline-flex items-center gap-2 text-[#8cff2e]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8cff2e]" />
            <span className="text-xs font-medium uppercase tracking-[0.05em]">
              Why AmbaLay Maps?
            </span>
          </div>
          <h2 className="mb-20 text-base font-medium leading-tight tracking-tight text-white">
            Ambalay Maps helps teams work with location data{' '}
            <br className="hidden md:block" /> more efficiently, with tools
            designed for accuracy, speed and ease of integration.
          </h2>
        </motion.div>

        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[40px] border border-white/10 bg-[#0A0A0A]">
          <div className="grid md:grid-cols-2">
            <div className="border-b border-white/5 p-10 text-left md:border-b-0 md:border-r md:p-14">
              <h3 className="mb-10 text-xs font-semibold uppercase tracking-widest text-gray-500">
                Other Tools
              </h3>
              <ul className="space-y-6">
                {[
                  'Complex APIs that take longer to integrate',
                  'Fragmented services (geocoding, routing, tiles separated across tools)',
                  'Unpredictable pricing that scales quickly with usage',
                  'Limited real-time capabilities or performance bottlenecks',
                  'Steep learning curve with poor developer experience',
                ].map((text, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 text-sm text-gray-500"
                  >
                    <XCircle
                      size={18}
                      className="mt-0.5 shrink-0 text-orange-500/60"
                    />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: 'easeOut',
                delay: 0.2,
              }}
              className="group relative bg-gradient-to-br from-white/[0.03] to-transparent p-10 text-left md:p-14"
            >
              <div className="pointer-events-none absolute inset-0 rounded-[40px] border-2 border-[#8cff2e]/20" />
              <div className="mb-10 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-white">
                  <Image
                    src="/icons/download.svg"
                    alt="Company Logo"
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                </div>
                <h3 className="text-lg font-medium text-white">Ambalay</h3>
              </div>
              <ul className="space-y-6">
                {[
                  'Accurate geocoding and routing',
                  'Simple API integration',
                  'Real-time location intelligence',
                  'Clean documentation and developer-friendly tools ',
                  'Built for businesses, logistics, platforms, and field operations',
                ].map((text, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 text-sm text-white"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-[#8cff2e]"
                    />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
