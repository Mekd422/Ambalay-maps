import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import heroImg from "../assets/images/B-p1.png"; 
import card1 from "../assets/images/b-p2.png";
import card2 from "../assets/images/b-p3.png";
import card3 from "../assets/images/b-p4.png";

import Navbar from "../Components/layout/Navbar";
import Footer from "../Components/layout/Footer";
import CTASection from "../Components/ui/CTASection";

export default function BlogSection() {
  const secondaryPosts = [
    {
      category: "Pro Tips",
      title: "Designing a Landing Page That Converts",
      image: card1,
    },
    {
      category: "Updates",
      title: "Collecting Feedback From Your First Users",
      image: card2,
    },
    {
      category: "CMS",
      title: "Building Trust as an Early-Stage SaaS Brand",
      image: card3,
    },
  ];

  return (
    <>
    <Navbar/>
    <section className="px-6 md:px-12 py-24 bg-black overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-[#8cff2e] mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#8cff2e]" />
            <span className="text-xs font-medium uppercase tracking-[0.05em]">Blog</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-medium text-white tracking-tight leading-tight mb-6"
          >
            Insights, guides & updates — <br />
            all in one place.
          </motion.h2>
          
          <p className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto">
            Stay ahead with tips on launching, designing, and growing your SaaS product.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#0A0A0A] border border-white/5 rounded-[40px] overflow-hidden group mb-8"
        >
          <div className="grid md:grid-cols-2 items-center">
            <div className="h-[300px] md:h-[500px] overflow-hidden">
              <img src={heroImg} alt="Featured" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="p-10 md:p-16">
              <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block">Basics</span>
              <h3 className="text-3xl md:text-4xl font-medium text-white mb-6 leading-tight">
                How to Launch Your SaaS Product With Confidence
              </h3>
              <p className="text-zinc-400 text-base mb-8">
                Learn how to go from idea to launch — fast. We cover positioning, landing pages, and early user feedback.
              </p>
              <a href="#" className="inline-flex items-center gap-2 text-[#8cff2e] font-medium group/link">
                Read more <ArrowUpRight size={18} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {secondaryPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-[#0A0A0A] border border-white/5 rounded-[40px] p-4 flex flex-col h-full hover:border-white/10 transition-colors"
            >
              <div className="relative aspect-[4/3] rounded-[30px] overflow-hidden mb-8">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="px-4 pb-6 flex flex-col flex-grow">
                <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-3 block">
                  {post.category}
                </span>
                <h3 className="text-xl font-medium text-white mb-6 leading-snug flex-grow">
                  {post.title}
                </h3>
                <a href="#" className="inline-flex items-center gap-2 text-[#8cff2e] text-sm font-medium group/link">
                  Read more <ArrowUpRight size={16} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
      
    </section>
    <CTASection/>
    <Footer/>
    </>
  );
}