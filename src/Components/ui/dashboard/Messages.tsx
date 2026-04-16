import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getContactMessages } from "../../../api/contact";
import { AxiosError } from "axios";

interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  inquiryType: string;
  status: string;
  date: string;
}

const ContactMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const statusOptions = ["RECEIVED", "READ", "CONTACTED", "RESOLVED"];

  const handleStatusChange = (index: number, value: string) => {
    setMessages((prevMessages) => {
      const updated = [...prevMessages];
      updated[index] = { ...updated[index], status: value };
      return updated;
    });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getContactMessages();
        setMessages(data);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          if (err.response?.status === 401) {
            setError("Unauthorized. Please login again.");
          } else if (err.response?.status === 403) {
            setError("Forbidden. You do not have access.");
          } else {
            setError("Failed to fetch messages.");
          }
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return <div className="text-white p-6">Loading messages...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-6">{error}</div>;
  }

  if (messages.length === 0) {
    return <div className="text-white p-6">No messages found.</div>;
  }

  return (
    <div className="p-6 bg-black min-h-screen font-sans text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#8cff2e] mb-2">Message Inbox</p>
            <h1 className="text-3xl font-bold tracking-tight">Contact Messages</h1>
            <p className="text-sm text-gray-400">{messages.length} message{messages.length !== 1 ? "s" : ""} received</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 bg-[#141414] border border-[#222] rounded text-gray-400 hover:text-white transition-colors">
              <ChevronLeft size={18} />
            </button>
            <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Page 1 of 1</span>
            <button className="p-2 bg-[#0062FF] rounded text-white hover:bg-blue-600 shadow-[0_0_10px_rgba(0,98,255,0.2)] transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className="bg-[#0a0a0a] ring-1 ring-white/10 rounded-3xl p-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)]">
              <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">Name</p>
                    <p className="text-sm text-gray-100 font-semibold">{msg.name}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">Email</p>
                    <p className="text-sm text-gray-100">{msg.email}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">Phone</p>
                    <p className="text-sm text-gray-100">{msg.phone || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">Company</p>
                    <p className="text-sm text-gray-100">{msg.company || "N/A"}</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex flex-col gap-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50">Inquiry Type</p>
                    <span className="inline-flex items-center rounded-full bg-[#8cff2e]/15 text-[#8cff2e] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em]">
                      {msg.inquiryType}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-[0.2em] text-white/50">Status</label>
                    <select
                      value={msg.status}
                      onChange={(e) => handleStatusChange(index, e.target.value)}
                      className="w-full rounded-xl bg-white/5 border border-white/10 py-3 px-4 text-sm text-white outline-none focus:ring-2 focus:ring-[#8cff2e]/30"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status} className="bg-[#050505] text-white">
                          {status.charAt(0) + status.slice(1).toLowerCase()}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50">Date Received</p>
                    <p className="text-sm text-gray-300">{msg.date}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-3">Message</p>
                <div className="rounded-3xl bg-white/5 border border-white/10 p-6 text-sm leading-7 text-gray-200">
                  {msg.message || "No message content provided."}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactMessages;