import { Mail, Send, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { sendMessage, type SendMessagePayload } from "../../api/sendMessage";

export default function ContactSection() {
  const [form, setForm] = useState<SendMessagePayload>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    company: "",
    inquiryType: "TECHNICAL_SUPPORT",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      await sendMessage(form);
      setSuccess("Message sent successfully!");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        company: "",
        inquiryType: "TECHNICAL_SUPPORT",
        message: "",
      });
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "message" in err) {
        setError((err as { message: string }).message);
      } else {
        setError("Failed to send message");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-6 md:px-12 py-24 bg-black overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start">

          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.h2 
              initial={{ x: -60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl font-medium text-white tracking-tight leading-[1.1] mb-12"
            >
              Let's build <br />
              <span className="text-gray-500">together</span>
            </motion.h2>

            <div className="space-y-6 max-w-sm">

              <div>
                <p className="text-gray-600 text-[10px] uppercase tracking-widest font-bold mb-1">
                  Headquarters
                </p>
                <p className="text-white text-sm">Addis Ababa</p>
                <p className="text-white text-sm">Ethiopia</p>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#0A0A0A] border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#8cff2e]/5 flex items-center justify-center border border-[#8cff2e]/10">
                  <Phone className="w-5 h-5 text-[#8cff2e]" />
                </div>
                <div>
                  <p className="text-gray-600 text-[10px] uppercase tracking-widest font-bold mb-0.5">
                    Phone
                  </p>
                  <p className="text-white text-sm font-medium">
                    <a href="tel:+251909477449">+251 909 477 449</a>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#0A0A0A] border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#8cff2e]/5 flex items-center justify-center border border-[#8cff2e]/10">
                  <Mail size={18} className="text-[#8cff2e]" />
                </div>
                <div>
                  <p className="text-gray-600 text-[10px] uppercase tracking-widest font-bold mb-0.5">
                    Email
                  </p>
                  <p className="text-white text-sm font-medium">
                    <a href="mailto:contact@ambalaymaps.com">
                      contact@ambalaymaps.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#0A0A0A] border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#8cff2e]/5 flex items-center justify-center border border-[#8cff2e]/10">
                  <Mail size={18} className="text-[#8cff2e]" />
                </div>
                <div>
                  <p className="text-gray-600 text-[10px] uppercase tracking-widest font-bold mb-0.5">
                    Support
                  </p>
                  <p className="text-white text-sm font-medium">
                    <a href="mailto:support@ambalaymaps.com">
                      support@ambalaymaps.com
                    </a>
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="hidden lg:block lg:col-span-1"></div>

          <motion.div 
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-6"
          >
            <div className="bg-[#0A0A0A] border border-white/5 rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <form className="space-y-4" onSubmit={handleSubmit}>
                
                <div>
                  <label className="block text-gray-500 text-[11px] font-semibold uppercase tracking-wider mb-3 ml-1">Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    placeholder="Your name" 
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-[#8cff2e]/40 transition-all placeholder:text-gray-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-500 text-[11px] font-semibold uppercase tracking-wider mb-3 ml-1">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="you@company.com" 
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-[#8cff2e]/40 transition-all placeholder:text-gray-700"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-500 text-[11px] font-semibold uppercase tracking-wider mb-3 ml-1">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-[#8cff2e]/40 transition-all placeholder:text-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-gray-500 text-[11px] font-semibold uppercase tracking-wider mb-3 ml-1">Company</label>
                  <input 
                    type="text" 
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-[#8cff2e]/40 transition-all placeholder:text-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-gray-500 text-[11px] font-semibold uppercase tracking-wider mb-3 ml-1">Inquiry Type</label>
                  <div className="relative">
                    <select
                      name="inquiryType"
                      value={form.inquiryType}
                      onChange={handleChange}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-[#8cff2e]/40 transition-all appearance-none cursor-pointer"
                    >
                      <option className="bg-[#0A0A0A]">Technical Support</option>
                      <option className="bg-[#0A0A0A]">Partnership Opportunity</option>
                      <option className="bg-[#0A0A0A]">Sales</option>
                      <option className="bg-[#0A0A0A]">Other</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-500 text-[11px] font-semibold uppercase tracking-wider mb-3 ml-1">Message</label>
                  <textarea 
                    name="message"
                    rows={4}
                    placeholder="Tell us about your project..." 
                    value={form.message}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-[#8cff2e]/40 transition-all placeholder:text-gray-700 resize-none"
                    required
                  />
                </div>

                {success && <p className="text-green-400 font-medium">{success}</p>}
                {error && <p className="text-red-500 font-medium">{error}</p>}

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#8cff2e] text-black font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-[#a3ff5c] hover:shadow-[0_0_30px_rgba(140,255,46,0.2)] active:scale-[0.98] mt-4 disabled:opacity-50"
                >
                  <Send size={18} strokeWidth={2.5} />
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}