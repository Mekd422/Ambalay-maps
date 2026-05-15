import Navbar from "../Components/layout/Navbar";
import Footer from "../Components/layout/Footer";
import { useEffect } from "react";
import CTASection from "../Components/ui/CTASection";
import PricingSection from "../Components/ui/PricingSection";
import UsageCalculator from "../Components/ui/pricing/UsageCalculator";



export default function Price() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white dark:bg-black min-h-screen font-sora selection:bg-[#8cff2e] selection:text-black transition-colors duration-300">
      <Navbar />

      <main className="pt-20"> 
        <PricingSection />
        <UsageCalculator/>
        <CTASection/>
      </main>

      <Footer />
    </div>
  );
}
