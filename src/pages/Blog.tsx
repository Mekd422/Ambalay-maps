import { motion } from "framer-motion";
// import { ArrowUpRight } from "lucide-react";

import heroImg from "../assets/images/Landmark-blog.png"; 
import card1 from "../assets/images/blog-body.png";
import card2 from "../assets/images/africa.png";

import Navbar from "../Components/layout/Navbar";
import Footer from "../Components/layout/Footer";
import CTASection from "../Components/ui/CTASection";

export default function BlogSection() {
  const categoryLabels = [
    "AI Navigation",
    "Product Updates",
    "Engineering",
    "Developer Tools",
    "Mapping for Africa",
    "Company News",
  ];

  const secondaryPosts = [
    {
      category: "Product Updates",
      title: "How Ambalay Translates Coordinates Into Human Directions",
      description:
        "Turning formal locations into simple landmark-based instructions.",
      image: card1,
    },
    {
      category: "Engineering",
      title: "Building a Smarter Map Stack for Africa",
      description:
        "The APIs and AI systems behind Ambalay’s navigation platform.",
      image: card2,
    },
  ];

  const ideaPosts = [
    {
      title: "From GPS Drift to Reliable Last-Mile Navigation",
      description:
        "A look at how Ambalay uses map data, road graphs, satellite context, and AI models to improve location detection in dense and informal areas.",
      category: "Mapping for Africa",
    },
    {
      title: "Behind the Ambalay AI Chatbot",
      description:
        "How our production-ready chatbot is grounded in company knowledge, supports English and Amharic, and helps users understand Ambalay APIs and services.",
      category: "Company News",
    },
    {
      title: "Why Local Map Intelligence Matters for Ethiopian Startups",
      description:
        "Why building locally relevant geospatial tools creates better navigation, lower costs, and stronger digital infrastructure for the region.",
      category: "Developer Tools",
    },
    {
      title: "What We Learned Building Ambalay’s APIs",
      description:
        "A practical post about shipping products like trip tracking, tile serving, and routing APIs for real-world use in Ethiopian cities.",
      category: "Engineering",
    },
  ];

  return (
    <>
      <Navbar />
      <section className="px-6 md:px-12 py-24 bg-black overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-[#8cff2e] mb-6"
            >
              {/* <span className="h-1.5 w-1.5 rounded-full bg-[#8cff2e]" />
              <span className="text-xs font-medium uppercase tracking-[0.2em]">Blog</span> */}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-medium text-white tracking-tight leading-tight mb-6"
            >
              Insights, updates & stories <br />
              from Ambalay Maps
            </motion.h2>

            <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto">
              Stay ahead with product updates, mapping ideas, AI navigation insights, and stories about building Ethiopia’s geospatial infrastructure.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categoryLabels.map((label) => (
              <span
                key={label}
                className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 border border-white/10 rounded-full px-4 py-2"
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
            className="relative bg-[#0A0A0A] border border-white/5 rounded-3xl overflow-hidden group mb-10"
          >
            <div className="grid md:grid-cols-2 items-center">
              <div className="h-[300px] md:h-[500px] overflow-hidden">
                <img
                  src={heroImg}
                  alt="Why Ethiopia Needs Landmark-Based Navigation"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-10 md:p-16">
                <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block">
                  AI Navigation
                </span>
                <h3 className="text-3xl md:text-4xl font-medium text-white mb-6 leading-tight">
                  Why Ethiopia Needs Landmark-Based Navigation
                </h3>
                <p className="text-zinc-400 text-base mb-8 whitespace-pre-line">
                  In Ethiopia, people do not always navigate with street names and coordinates.
                  They use landmarks, local references, and familiar places. In this post, we
                  explore why formal maps often fail in informal environments and how Ambalay
                  Maps is solving that with AI-powered landmark translation.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {secondaryPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                // --- ADDED rounded-3xl HERE ---
                className="group bg-[#0A0A0A] border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-colors"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="px-8 py-8">
                  <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 block">
                    {post.category}
                  </span>
                  <h3 className="text-2xl font-medium text-white mb-4 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-zinc-400 text-base leading-relaxed">{post.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mb-12">
            <div className="flex items-center justify-between mb-8 gap-4 flex-col md:flex-row">
              <div>
                {/* <h3 className="text-3xl font-medium text-white">More Blog Post Ideas</h3> */}
                <p className="text-zinc-400 mt-3 max-w-2xl">
                  Additional topics that highlight Ambalay’s local navigation vision, AI direction tools, and developer-facing platform.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ideaPosts.map((idea, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  // Adding rounded-2xl for consistency, though this card doesn't have an image
                  className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors"
                >
                  <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 block">
                    {idea.category}
                  </span>
                  <h4 className="text-xl font-medium text-white mb-3 leading-snug">
                    {idea.title}
                  </h4>
                  <p className="text-zinc-400 text-base leading-relaxed">{idea.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTASection />
      <Footer />
    </>
  );
}