import { Plus } from "lucide-react";
import { useState } from "react";

interface ApiKey {
  id: string;
  label: string;
  secret: string;
  status: "ACTIVE" | "REVOKED";
  services: string[];
  createdAt: string;
  expiresAt: string;
}

export default function ApiKeys() {
  const [apiKeys] = useState<ApiKey[]>([]);

  return (
    <div className="bg-[#111111] border border-white/5 rounded-xl shadow-xl p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white font-semibold text-lg">API Keys</h2>

        <button className="flex items-center gap-2 bg-[#8cff2e]/10 text-[#8cff2e] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#8cff2e]/20 transition">
          <Plus size={16} />
          New API Key
        </button>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left">
        <thead className="text-gray-500 border-b border-white/10">
          <tr>
            <th className="py-3">Label</th>
            <th>Secret</th>
            <th>Status</th>
            <th>Services</th>
            <th>Created</th>
            <th>Expires</th>
          </tr>
        </thead>

        <tbody className="text-gray-300">
          {apiKeys.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-10 text-center text-gray-500">
                No API keys found
              </td>
            </tr>
          ) : (
            apiKeys.map((key) => (
              <tr key={key.id} className="border-b border-white/5">
                <td className="py-3">{key.label}</td>

                <td className="font-mono text-xs">
                  {key.secret.slice(0, 6)}••••••••
                </td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      key.status === "ACTIVE"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {key.status}
                  </span>
                </td>

                <td>
                  {key.services.length > 0
                    ? key.services.join(", ")
                    : "—"}
                </td>

                <td>
                  {new Date(key.createdAt).toLocaleDateString()}
                </td>

                <td>
                  {new Date(key.expiresAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}