import { useState } from 'react'
import { Plus, Minus, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      q: 'How do I get an API key?',
      a: 'You can sign up for an API key by creating an account on our developer portal. The free tier provides access to all API endpoints with usage limits.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit cards, PayPal, and wire transfers for enterprise customers. Invoicing options are available for annual contracts.',
    },
    {
      q: 'Do you offer technical support?',
      a: 'Yes, we provide email support for all customers. Enterprise plans include priority support with dedicated response times and phone support options.',
    },
    {
      q: 'Can I use AmbaLay Maps for commercial projects?',
      a: 'Our API is designed for both personal and commercial use. Different pricing tiers are available based on your usage requirements.',
    },
    {
      q: 'What is your uptime guarantee?',
      a: 'We offer a 99.9% uptime SLA for all paid plans. Enterprise customers receive enhanced SLAs with financial guarantees.',
    },
  ]

  return (
    <section id="faq" className="bg-slate-50 dark:bg-black px-6 py-24 md:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 flex flex-col items-end justify-between gap-8 md:flex-row">
          <div className="space-y-4">
            <h2 className="text-4xl font-medium leading-tight text-slate-900 dark:text-white md:text-5xl">
              Got questions? <br /> We've got answers.
            </h2>
          </div>
          <div className="space-y-3 md:text-right">
            <p className="max-w-xs text-sm text-gray-600 dark:text-gray-500">
              Here's everything you need to know before getting started.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#8cff2e] hover:underline"
            >
              Contact us <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`rounded-[32px] border transition-all duration-300 ${
                openIndex === idx
                  ? 'border-slate-300/40 bg-white dark:border-white/10 dark:bg-[#0d0d0d]'
                  : 'border-slate-200/20 bg-white hover:border-slate-300/40 dark:border-white/5 dark:bg-[#080808]'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="flex w-full items-center justify-between p-6 text-left md:p-8"
              >
                <div className="flex items-center gap-5 md:gap-8">
                  <span
                    className={`font-mono text-sm transition-colors ${openIndex === idx ? 'text-[#8cff2e]' : 'text-gray-600 dark:text-gray-400'}`}
                  >
                    0{idx + 1}
                  </span>
                  <span className="text-base font-medium tracking-tight text-slate-900 dark:text-white md:text-lg">
                    {faq.q}
                  </span>
                </div>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all ${openIndex === idx ? 'border-[#8cff2e] bg-[#8cff2e] text-black' : 'border-slate-200/20 text-gray-600 dark:text-gray-400'}`}
                >
                  {openIndex === idx ? (
                    <Minus size={16} strokeWidth={3} />
                  ) : (
                    <Plus size={16} strokeWidth={3} />
                  )}
                </div>
              </button>

              {openIndex === idx && (
                <div className="px-6 pb-8 md:pl-20 md:pr-16">
                  <div className="border-t border-slate-200/20 dark:border-white/5 pt-6">
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 md:text-base">
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
  )
}
