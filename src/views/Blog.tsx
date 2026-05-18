import { motion } from 'framer-motion'
import Image from 'next/image'
// import { ArrowUpRight } from "lucide-react";

import Navbar from '../Components/layout/Navbar'
import Footer from '../Components/layout/Footer'
import CTASection from '../Components/ui/CTASection'

export default function BlogSection() {
  const categoryLabels = [
    'AI Navigation',
    'Product Updates',
    'Developer Tools',
    'Mapping',
    'Company News',
  ]

  const secondaryPosts = [
    {
      category: 'Product Updates',
      title: 'How Ambalay Translates Coordinates Into Human Directions',
      description:
        'Turning formal locations into simple landmark-based instructions.',
      image: '/images/blog/blog-body.png',
    },
    {
      category: 'Engineering',
      title: 'Building a Smarter Map Stack for Africa',
      description:
        'The APIs and AI systems behind Ambalay’s navigation platform.',
      image: '/images/blog/africa.png',
    },
  ]

  const ideaPosts = [
    {
      title: 'From GPS Drift to Reliable Last-Mile Navigation',
      description:
        'A look at how Ambalay uses map data, road graphs, satellite context, and AI models to improve location detection in dense and informal areas.',
      category: 'Mapping for Africa',
    },
    {
      title: 'Behind the Ambalay AI Chatbot',
      description:
        'How our production-ready chatbot is grounded in company knowledge, supports English and Amharic, and helps users understand Ambalay APIs and services.',
      category: 'Company News',
    },
    {
      title: 'Why Local Map Intelligence Matters for Ethiopian Startups',
      description:
        'Why building locally relevant geospatial tools creates better navigation, lower costs, and stronger digital infrastructure for the region.',
      category: 'Developer Tools',
    },
    {
      title: 'What We Learned Building Ambalay’s APIs',
      description:
        'A practical post about shipping products like trip tracking, tile serving, and routing APIs for real-world use in Ethiopian cities.',
      category: 'Engineering',
    },
  ]

  return (
    <>
      <Navbar />
      <section className="overflow-hidden bg-black px-6 py-24 md:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6 inline-flex items-center gap-2 text-[#8cff2e]"
            >
              {/* <span className="h-1.5 w-1.5 rounded-full bg-[#8cff2e]" />
              <span className="text-xs font-medium uppercase tracking-[0.2em]">Blog</span> */}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mb-6 text-4xl font-medium leading-tight tracking-tight text-white md:text-6xl"
            >
              Insights, updates & stories <br />
              from Ambalay Maps
            </motion.h2>

            <p className="mx-auto max-w-xl text-base text-zinc-400 md:text-lg">
              Stay ahead with product updates, mapping ideas, AI navigation
              insights, and stories about building Ethiopia’s geospatial
              infrastructure.
            </p>
          </div>

          <div className="mb-16 flex flex-wrap justify-center gap-3">
            {categoryLabels.map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-zinc-400"
              >
                {label}
              </span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            // --- ADDED rounded-3xl HERE ---
            className="group relative mb-10 overflow-hidden rounded-3xl border border-white/5 bg-[#0A0A0A]"
          >
            <div className="grid items-center md:grid-cols-2">
              <div className="h-[300px] overflow-hidden md:h-[500px]">
                <Image
                  src="/images/blog/landmark-blog.png"
                  alt="Why Ethiopia Needs Landmark-Based Navigation"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-10 md:p-16">
                <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  AI Navigation
                </span>
                <h3 className="mb-6 text-3xl font-medium leading-tight text-white md:text-4xl">
                  Why Ethiopia Needs Landmark-Based Navigation
                </h3>
                <p className="mb-8 whitespace-pre-line text-base text-zinc-400">
                  In Ethiopia, people do not always navigate with street names
                  and coordinates. They use landmarks, local references, and
                  familiar places. In this post, we explore why formal maps
                  often fail in informal environments and how Ambalay Maps is
                  solving that with AI-powered landmark translation.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            {secondaryPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                // --- ADDED rounded-3xl HERE ---
                className="group overflow-hidden rounded-3xl border border-white/5 bg-[#0A0A0A] transition-colors hover:border-white/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="px-8 py-8">
                  <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                    {post.category}
                  </span>
                  <h3 className="mb-4 text-2xl font-medium leading-snug text-white">
                    {post.title}
                  </h3>
                  <p className="text-base leading-relaxed text-zinc-400">
                    {post.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mb-12">
            <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
              <div>
                {/* <h3 className="text-3xl font-medium text-white">More Blog Post Ideas</h3> */}
                <p className="mt-3 max-w-2xl text-zinc-400">
                  Additional topics that highlight Ambalay’s local navigation
                  vision, AI direction tools, and developer-facing platform.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {ideaPosts.map((idea, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  // Adding rounded-2xl for consistency, though this card doesn't have an image
                  className="rounded-2xl border border-white/5 bg-[#0A0A0A] p-6 transition-colors hover:border-white/10"
                >
                  <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                    {idea.category}
                  </span>
                  <h4 className="mb-3 text-xl font-medium leading-snug text-white">
                    {idea.title}
                  </h4>
                  <p className="text-base leading-relaxed text-zinc-400">
                    {idea.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTASection />
      <Footer />
    </>
  )
}
