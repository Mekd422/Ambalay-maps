import { useState } from "react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "How do I get an API key?", a: "You can sign up for an API key by creating an account on our developer portal. The free tier provides access to all API endpoints with usage limits." },
    { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and wire transfers for enterprise customers. Invoicing options are available for annual contracts." },
    { q: "Do you offer technical support?", a: "Yes, we provide email support for all customers. Enterprise plans include priority support with dedicated response times and phone support options." },
    { q: "Can I use AmbaLay Maps for commercial projects?", a: "Our API is designed for both personal and commercial use. Different pricing tiers are available based on your usage requirements." },
    { q: "What is your uptime guarantee?", a: "We offer a 99.9% uptime SLA for all paid plans. Enterprise customers receive enhanced SLAs with financial guarantees." },
  ];

  return (
    <section id="faq" className="bg-black py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-medium text-white leading-tight">
              Got questions? <br /> We've got answers.
            </h2>
          </div>
          <div className="space-y-3 md:text-right">
            <p className="text-gray-500 text-sm max-w-xs">Here's everything you need to know before getting started.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 text-[#8cff2e] hover:underline text-sm font-bold">
              Contact us <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`rounded-[32px] border transition-all duration-300 ${
                openIndex === idx ? 'bg-[#0d0d0d] border-white/10' : 'bg-[#080808] border-white/5 hover:border-white/10'
              }`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left"
              >
                <div className="flex items-center gap-5 md:gap-8">
                  <span className={`font-mono text-sm transition-colors ${openIndex === idx ? 'text-[#8cff2e]' : 'text-gray-600'}`}>
                    0{idx + 1}
                  </span>
                  <span className="text-base md:text-lg font-medium text-white tracking-tight">{faq.q}</span>
                </div>
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${openIndex === idx ? 'bg-[#8cff2e] border-[#8cff2e] text-black' : 'border-white/10 text-gray-400'}`}>
                  {openIndex === idx ? <Minus size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
                </div>
              </button>
              
              {openIndex === idx && (
                <div className="px-6 pb-8 md:pl-20 md:pr-16">
                  <div className="pt-6 border-t border-white/5">
                    <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                      {faq.a}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}