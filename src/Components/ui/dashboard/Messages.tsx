import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import {
  formatContactMessageName,
  getContactMessages,
  type ContactMessageRecord,
  type ContactMessagesPagination,
} from "../../../api/contact";

const formatLabel = (value: string) =>
  value
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const getStatusBadgeClassName = (status: string) => {
  switch (status) {
    case "RECEIVED":
      return "bg-amber-500/15 text-amber-300 border-amber-400/20";
    case "READ":
      return "bg-blue-500/15 text-blue-300 border-blue-400/20";
    case "CONTACTED":
      return "bg-violet-500/15 text-violet-300 border-violet-400/20";
    case "RESOLVED":
      return "bg-emerald-500/15 text-emerald-300 border-emerald-400/20";
    default:
      return "bg-white/5 text-gray-200 border-white/10";
  }
};

const getInquiryBadgeClassName = (inquiryType: string) => {
  switch (inquiryType) {
    case "TECHNICAL_SUPPORT":
      return "bg-cyan-500/15 text-cyan-300 border-cyan-400/20";
    case "PARTNERSHIP_OPPORTUNITY":
      return "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-400/20";
    case "SALES":
      return "bg-orange-500/15 text-orange-300 border-orange-400/20";
    case "OTHER":
      return "bg-slate-500/15 text-slate-300 border-slate-400/20";
    default:
      return "bg-white/5 text-gray-200 border-white/10";
  }
};

export default function ContactMessages() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ContactMessageRecord[]>([]);
  const [pagination, setPagination] = useState<ContactMessagesPagination>({
    page: 1,
    limit: 20,
    totalItems: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getContactMessages(pagination.page, pagination.limit);
        setMessages(result.data);
        setPagination(result.pagination);
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
  }, [pagination.page, pagination.limit]);

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > pagination.totalPages || nextPage === pagination.page) {
      return;
    }

    setPagination((prev) => ({ ...prev, page: nextPage }));
  };

  return (
    <div className="bg-[#111111] border border-white/5 rounded-xl shadow-xl p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-6">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#8cff2e] mb-2">Message Inbox</p>
          <h2 className="text-white font-semibold text-lg">Contact Messages</h2>
          <p className="text-sm text-gray-400 mt-1">
            {pagination.totalItems} message{pagination.totalItems === 1 ? "" : "s"} received
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-400">
          <button
            type="button"
            disabled={pagination.page === 1 || loading}
            onClick={() => handlePageChange(pagination.page - 1)}
            className="px-3 py-2 bg-[#070707] rounded-lg border border-white/10 disabled:opacity-30"
          >
            Previous
          </button>
          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            type="button"
            disabled={pagination.page >= pagination.totalPages || loading}
            onClick={() => handlePageChange(pagination.page + 1)}
            className="px-3 py-2 bg-[#070707] rounded-lg border border-white/10 disabled:opacity-30"
          >
            Next
          </button>
        </div>
      </div>

      {loading && <div className="text-gray-400 text-center py-10">Loading messages...</div>}
      {error && <div className="text-red-500 text-center py-10">{error}</div>}

      {!loading && !error && messages.length === 0 && (
        <div className="text-gray-400 text-center py-10">No messages found.</div>
      )}

      {!loading && !error && messages.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[780px]">
            <thead className="text-gray-500 border-b border-white/10">
              <tr>
                <th className="py-3 pr-4">Name</th>
                <th className="py-3 pr-4">Email</th>
                <th className="py-3 pr-4">Company</th>
                <th className="py-3 pr-4">Type</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3">Date</th>
              </tr>
            </thead>

            <tbody className="text-gray-300">
              {messages.map((message) => (
                <tr
                  key={message.id}
                  onClick={() => navigate(`/dashboard/messages/${message.id}`)}
                  className="border-b border-white/5 cursor-pointer hover:bg-white/[0.03] transition-colors"
                >
                  <td className="py-4 pr-4 font-medium text-white">{formatContactMessageName(message)}</td>
                  <td className="py-4 pr-4">{message.email}</td>
                  <td className="py-4 pr-4">{message.company || "N/A"}</td>
                  <td className="py-4 pr-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold border ${getInquiryBadgeClassName(message.inquiryType)}`}
                    >
                      {formatLabel(message.inquiryType)}
                    </span>
                  </td>
                  <td className="py-4 pr-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadgeClassName(message.status)}`}
                    >
                      {formatLabel(message.status)}
                    </span>
                  </td>
                  <td className="py-4 text-gray-400">
                    {new Date(message.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
