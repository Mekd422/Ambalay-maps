import { Mail, Send, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { sendMessage, type SendMessagePayload } from '../../api/sendMessage'

export default function ContactSection() {
  const [form, setForm] = useState<SendMessagePayload>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    inquiryType: 'TECHNICAL_SUPPORT',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(null)
    setError(null)

    try {
      await sendMessage(form)
      setSuccess('Message sent successfully!')
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        company: '',
        inquiryType: 'TECHNICAL_SUPPORT',
        message: '',
      })
    } catch (err: unknown) {
      if (typeof err === 'object' && err !== null && 'message' in err) {
        setError((err as { message: string }).message)
      } else {
        setError('Failed to send message')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="overflow-hidden bg-white dark:bg-black px-6 py-24 md:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-0">
          <div className="flex flex-col justify-center lg:col-span-5">
            <motion.h2
              initial={{ x: -60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12 text-5xl font-medium leading-[1.1] tracking-tight text-black dark:text-white md:text-6xl"
            >
              Let's build <br />
              <span className="text-gray-500">together</span>
            </motion.h2>

            <div className="max-w-sm space-y-6">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-600">
                  Headquarters
                </p>
                <p className="text-sm text-black dark:text-white">Addis Ababa</p>
                <p className="text-sm text-black dark:text-white">Ethiopia</p>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white dark:bg-[#0A0A0A] p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#8cff2e]/10 bg-[#8cff2e]/5">
                  <Phone className="h-5 w-5 text-[#8cff2e]" />
                </div>
                <div>
                  <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-gray-600">
                    Phone
                  </p>
                  <p className="text-sm font-medium text-black dark:text-white">
                    <a href="tel:+251909477449">+251 909 477 449</a>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white dark:bg-[#0A0A0A] p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#8cff2e]/10 bg-[#8cff2e]/5">
                  <Mail size={18} className="text-[#8cff2e]" />
                </div>
                <div>
                  <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-gray-600">
                    Email
                  </p>
                  <p className="text-sm font-medium text-black dark:text-white">
                    <a href="mailto:contact@ambalaymaps.com">
                      contact@ambalaymaps.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white dark:bg-[#0A0A0A] p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#8cff2e]/10 bg-[#8cff2e]/5">
                  <Mail size={18} className="text-[#8cff2e]" />
                </div>
                <div>
                  <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-gray-600">
                    Support
                  </p>
                  <p className="text-sm font-medium text-black dark:text-white">
                    <a href="mailto:support@ambalaymaps.com">
                      support@ambalaymaps.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:col-span-1 lg:block"></div>

          <motion.div
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-6"
          >
            <div className="rounded-[40px] border border-white/5 bg-white dark:bg-[#0A0A0A] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:p-12">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-3 ml-1 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-white/10 bg-white/50 dark:bg-black/40 px-6 py-4 text-sm text-black dark:text-white transition-all placeholder:text-gray-500 focus:border-[#8cff2e]/40 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-3 ml-1 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-white/10 bg-white/50 dark:bg-black/40 px-6 py-4 text-sm text-black dark:text-white transition-all placeholder:text-gray-500 focus:border-[#8cff2e]/40 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-3 ml-1 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-white/10 bg-white/50 dark:bg-black/40 px-6 py-4 text-sm text-black dark:text-white transition-all placeholder:text-gray-500 focus:border-[#8cff2e]/40 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="mb-3 ml-1 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-white/10 bg-white/50 dark:bg-black/40 px-6 py-4 text-sm text-black dark:text-white transition-all placeholder:text-gray-500 focus:border-[#8cff2e]/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-3 ml-1 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-white/10 bg-white/50 dark:bg-black/40 px-6 py-4 text-sm text-black dark:text-white transition-all placeholder:text-gray-500 focus:border-[#8cff2e]/40 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-3 ml-1 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    Inquiry Type
                  </label>
                  <div className="relative">
                    <select
                      name="inquiryType"
                      value={form.inquiryType}
                      onChange={handleChange}
                      className="w-full cursor-pointer appearance-none rounded-2xl border border-white/10 bg-white/50 dark:bg-black/40 px-6 py-4 text-sm text-black dark:text-white transition-all focus:border-[#8cff2e]/40 focus:outline-none"
                    >
                      <option
                        value="TECHNICAL_SUPPORT"
                        className="bg-white dark:bg-[#0A0A0A]"
                      >
                        Technical Support
                      </option>
                      <option
                        value="PARTNERSHIP_OPPORTUNITY"
                        className="bg-white dark:bg-[#0A0A0A]"
                      >
                        Partnership Opportunity
                      </option>
                      <option value="SALES" className="bg-white dark:bg-[#0A0A0A]">
                        Sales
                      </option>
                      <option value="OTHER" className="bg-white dark:bg-[#0A0A0A]">
                        Other
                      </option>
                    </select>
                    <div className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 text-gray-500">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2.5 4.5L6 8L9.5 4.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-3 ml-1 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your project..."
                    value={form.message}
                    onChange={handleChange}
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/50 dark:bg-black/40 px-6 py-4 text-sm text-black dark:text-white transition-all placeholder:text-gray-500 focus:border-[#8cff2e]/40 focus:outline-none"
                    required
                  />
                </div>

                {success && (
                  <p className="font-medium text-green-400">{success}</p>
                )}
                {error && <p className="font-medium text-red-500">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#8cff2e] py-5 font-bold text-black transition-all hover:bg-[#a3ff5c] hover:shadow-[0_0_30px_rgba(140,255,46,0.2)] active:scale-[0.98] disabled:opacity-50"
                >
                  <Send size={18} strokeWidth={2.5} />
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
