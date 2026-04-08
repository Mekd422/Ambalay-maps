import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getContactMessages } from "../../../api/contact";
import { AxiosError } from "axios";

interface ContactMessage {
  name: string;
  email: string;
  company: string;
  inquiryType: string;
  status: string;
  date: string;
}

const ContactMessages: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getContactMessages();
        setMessages(data);
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          if (err.response?.status === 401) {
            setError("Unauthorized. Please login again.");
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

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "RECEIVED":
        return "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20";
      case "RESOLVED":
        return "bg-green-500/10 text-green-500 border border-green-500/20";
      case "READ":
        return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      case "CONTACTED":
        return "bg-purple-500/10 text-purple-400 border border-purple-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border border-gray-500/20";
    }
  };

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
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4 px-2">
          <h1 className="text-xl font-bold tracking-tight">
            Contact Us Messages ({messages.length})
          </h1>
          
          <div className="flex items-center gap-3">
            <button className="p-1 bg-[#141414] border border-[#222] rounded text-gray-600 hover:text-gray-400">
              <ChevronLeft size={18} />
            </button>
            <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
              Page 1 of 1
            </span>
            <button className="p-1 bg-[#0062FF] rounded text-white hover:bg-blue-600 shadow-[0_0_10px_rgba(0,98,255,0.2)]">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#161616] text-[#666] text-[11px] uppercase tracking-wider font-bold">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Inquiry Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#161616]">
                {messages.map((msg, index) => (
                  <tr key={index} className="hover:bg-[#111] transition-colors">
                    <td className="px-6 py-5 text-sm text-gray-300">{msg.name}</td>
                    <td className="px-6 py-5 text-sm text-gray-400">{msg.email}</td>
                    <td className="px-6 py-5 text-sm text-gray-400">{msg.company}</td>
                    <td className="px-6 py-5">
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20 rounded uppercase">
                        {msg.inquiryType}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${getStatusStyles(
                          msg.status
                        )}`}
                      >
                        {msg.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-500 whitespace-nowrap">
                      {msg.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMessages;