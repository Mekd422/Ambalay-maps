import Image from 'next/image'
import { motion } from 'framer-motion'

export default function HowItWorks() {
  const steps = [
    {
      img: '/images/how-it-works/step-1.png',
      step: 'Step 1',
      title: 'Create your account ',
      desc: 'Sign up and access the Ambalay Maps dashboard and API tools.',
    },
    {
      img: '/images/how-it-works/step-2.png',
      step: 'Step 2',
      title: 'Choose the service you need',
      desc: 'Use geocoding, routing, places search, or static maps based on your workflow.',
    },
    {
      img: '/images/how-it-works/step-3.png',
      step: 'Step 3',
      title: 'Integrate and scale',
      desc: 'Connect Ambalay Maps to your app or operations and start using location intelligence immediately.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  } as const

  return (
    <section
      id="about"
      className="overflow-hidden bg-black px-6 py-24 md:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-4 flex items-center gap-3 text-[#8cff2e]"
          >
            <Image
              src="/icons/video-icon.svg"
              alt="Video"
              width={32}
              height={32}
              className="h-8 w-8"
              style={{
                filter:
                  'invert(63%) sepia(86%) saturate(400%) hue-rotate(55deg)',
              }}
            />
            <span className="text-lg font-medium">Watch video</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="scale-x-70 inline-block origin-left scale-y-110 text-4xl font-medium leading-none tracking-[-0.05em] text-white md:text-4xl"
          >
            How AmbaLay Maps works
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-10 md:grid-cols-3"
        >
          {steps.map((item) => (
            <motion.div
              key={item.step}
              variants={cardVariants}
              className="group relative"
            >
              {/* --- GLOW HALO BEHIND CARD --- */}
              <div className="absolute -inset-0.5 rounded-[32px] bg-[#8cff2e]/20 opacity-0 blur transition duration-500 group-hover:opacity-40" />

              {/* --- CARD BODY --- */}
              <div className="relative flex h-full flex-col overflow-hidden rounded-[32px] border border-white/5 bg-[#0A0A0A] transition-all duration-500 group-hover:translate-y-[-8px] group-hover:border-[#8cff2e]/30 group-hover:shadow-[0_20px_40px_-15px_rgba(140,255,46,0.2)]">
                <div className="relative flex h-72 items-center justify-center overflow-hidden bg-[#111]">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                </div>

                <div className="p-8">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#8cff2e] bg-black px-4 py-1.5 text-xs uppercase tracking-widest text-[#8cff2e] shadow-[0_0_12px_rgba(140,255,46,0.2)]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8cff2e]" />{' '}
                    {item.step}
                  </div>

                  <h3 className="mb-3 text-xl font-semibold leading-tight text-white transition-colors duration-300 group-hover:text-[#8cff2e]">
                    {item.title}
                  </h3>
                  <p className="text-base leading-relaxed text-zinc-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
