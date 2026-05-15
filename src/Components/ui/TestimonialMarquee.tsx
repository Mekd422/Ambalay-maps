import { Quote } from 'lucide-react'
import Image from 'next/image'

import { motion } from 'framer-motion'

export default function TestimonialMarquee() {
  const row1 = [
    {
      name: 'Enkumichael',
      role: 'Product Manager',
      text: 'Ambalay Maps made it much easier to manage addresses and routing in our workflow.',
      img: '/images/people/person-1.png',
    },
    {
      name: 'Samson Warkaye',
      role: 'Lead Developer',
      text: 'The API was straightforward to integrate, and the results were accurate.',
      img: '/images/people/person-2.png',
    },
    {
      name: 'Sara',
      role: 'Operations Coordinator',
      text: 'We use it for route planning and location lookup every day.',
      img: '/images/people/person-3.png',
    },
  ]

  // const row2 = [
  //   { name: "Enkumichael", role: "Product Manager", text: "Ambalay Maps made it much easier to manage addresses and routing in our workflow.", img: person2 },
  //   { name: "Samson Warkaye", role: "Lead Developer", text: "The API was straightforward to integrate, and the results were accurate.", img: person1 },
  //   { name: "Sara", role: "Operations Coordinator", text: "We use it for route planning and location lookup every day.", img: person3 },
  // ]

  return (
    <section className="overflow-hidden bg-black px-6 py-24 md:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <motion.h2
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="max-w-md text-4xl font-medium leading-tight text-white md:text-4xl"
          >
            Loved by teams building location-powered products
          </motion.h2>

          <motion.p
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.15,
            }}
            className="max-w-sm text-base text-zinc-400"
          >
            Trusted by teams to power maps, geospatial insights, and
            location-based features — all in one seamless platform.
          </motion.p>
        </div>
        <div className="flex flex-col gap-8">
          {[row1].map((row, idx) => (
            <div key={idx} className="relative overflow-hidden">
              <div
                className={`flex gap-6 ${idx === 0 ? 'animate-marquee-left' : 'animate-marquee-right'} whitespace-nowrap`}
              >
                {[...row, ...row].map((t, i) => (
                  <div
                    key={i}
                    className="inline-block w-[300px] whitespace-normal rounded-[32px] border border-white/5 bg-[#0A0A0A] p-8 md:w-[400px]"
                  >
                    <Quote className="mb-4 text-[#8cff2e]/10" size={24} />
                    <p className="text-bold mb-6 leading-relaxed text-white">
                      "{t.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <Image
                        src={t.img}
                        alt={t.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <h5 className="text-lg font-normal text-white">
                          {t.name}
                        </h5>
                        <p className="text-[15px] text-gray-500">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
