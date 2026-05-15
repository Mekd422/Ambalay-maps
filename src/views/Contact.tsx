import Navbar from "../Components/layout/Navbar";
import Footer from "../Components/layout/Footer";
import { useEffect } from "react";
import ContactSection from "../Components/ui/ContactSection";
import FAQSection from "../Components/ui/FAQSection";
import CTASection from "../Components/ui/CTASection";



export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white dark:bg-black min-h-screen font-sora selection:bg-[#8cff2e] selection:text-black transition-colors duration-300">
      <Navbar />

      <main className="pt-20"> 
        <ContactSection />
        <FAQSection/>
        <CTASection/>
        
      </main>

      <Footer />
    </div>
  );
}
