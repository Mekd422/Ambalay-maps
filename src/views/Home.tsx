import { useEffect, useRef, useState } from 'react'
import Navbar from '../Components/layout/Navbar'
import Footer from '../Components/layout/Footer'

import HeroSection from '../Components/ui/HeroSection'
import HowItWorks from '../Components/ui/HowItWorks'
import MappingSolutions from '../Components/ui/MappingSolutions'
import FeaturesSection from '../Components/ui/FeaturesSection'
import ComparisonSection from '../Components/ui/ComparisonSection'
import TestimonialMarquee from '../Components/ui/TestimonialMarquee'
import IndustriesSection from '../Components/ui/IndustriesSection'
import FAQSection from '../Components/ui/FAQSection'
import CTASection from '../Components/ui/CTASection'
import ChatbotWidget from '../Components/ui/ChatbotWidget'
// import LogoCloud from "../Components/ui/LogoCloud"

import { Canvas } from '@react-three/fiber'
import MapGlobe from '../Components/ui/MapGlobe'

export default function Home() {
  const previewRef = useRef<HTMLElement | null>(null)
  const [previewProgress, setPreviewProgress] = useState(0)

  useEffect(() => {
    const el = previewRef.current
    if (!el) return
    const update = () => {
      const rect = el.getBoundingClientRect()
      const viewportH = window.innerHeight || 1
      const start = viewportH * 0.95
      const end = viewportH * 0.35
      const raw = (start - rect.top) / (start - end)
      const clamped = Math.min(1, Math.max(0, raw))
      const eased = 1 - Math.pow(1 - clamped, 3)
      setPreviewProgress(eased)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="min-h-screen bg-white font-sora text-black selection:bg-[#8cff2e] selection:text-black dark:bg-black dark:text-white">
      <Navbar />
      <HeroSection />

      <section
        ref={previewRef}
        className="relative h-[500px] overflow-hidden border-y border-white/5 bg-black md:h-[650px]"
      >
        <div className="absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-black to-transparent" />

        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <MapGlobe progress={previewProgress} />
        </Canvas>

        <div
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center transition-all duration-1000"
          style={{
            opacity: previewProgress,
            transform: `translateY(${(1 - previewProgress) * 20}px)`,
          }}
        >
          <div className="max-w-xl px-6 text-center">
            <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.6em] text-[#8cff2e] opacity-70">
              Localized Intelligence
            </h3>

            <h2 className="text-lg font-medium leading-relaxed tracking-wide text-white md:text-xl lg:text-2xl">
              Powering Ethiopia's digital infrastructure{' '}
              <br className="hidden md:block" />
              with{' '}
              <span className="font-semibold text-[#8cff2e]">
                precision geospatial data.
              </span>
            </h2>

            <div className="mx-auto mt-6 h-[1px] w-12 bg-[#8cff2e]/30" />
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      <div id="how-it-works">
        <HowItWorks />
      </div>
      <MappingSolutions />
      <FeaturesSection />
      <ComparisonSection />
      <TestimonialMarquee />
      {/* <div id="pricing">
        <PricingSection />
      </div> */}
      <IndustriesSection />
      {/* <LogoCloud /> */}
      <FAQSection />
      <CTASection />
      <ChatbotWidget />
      <Footer />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marqueeLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes marqueeRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .animate-marquee-left { animation: marqueeLeft 40s linear infinite; width: max-content; }
        .animate-marquee-right { animation: marqueeRight 40s linear infinite; width: max-content; }
        .animate-marquee-left:hover, .animate-marquee-right:hover { animation-play-state: paused; }
      `,
        }}
      />
    </div>
  )
}
