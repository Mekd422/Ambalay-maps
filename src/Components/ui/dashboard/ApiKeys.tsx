import { Plus, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import API from "../../../api/axios";

interface ApiKey {
  id: string;
  label: string;
  secret: string;
  status: "ACTIVE" | "REVOKED";
  services: string[];
  createdAt: string;
  expiresAt: string | null;
}

interface BackendApiKey {
  id: string;
  label: string;
  secret: string;
  allowedServices: string[];
  createdAt: string;
  revokedAt: string | null;
  expiresAt: string | null;
}

export default function ApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [label, setLabel] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [creating, setCreating] = useState(false);

  // State to track which key IDs are currently visible
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});

  const fetchApiKeys = async () => {
    try {
      const res = await API.get("/auth/api_keys");

      const mappedKeys: ApiKey[] = (res.data.data as BackendApiKey[]).map((key) => ({
        id: key.id,
        label: key.label,
        secret: key.secret,
        status: key.revokedAt ? "REVOKED" : "ACTIVE",
        services: key.allowedServices || [],
        createdAt: key.createdAt,
        expiresAt: key.expiresAt,
      }));

      setApiKeys(mappedKeys);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          setError("Unauthorized. Please login again.");
        } else if (err.response?.status === 403) {
          setError("Forbidden. You do not have access.");
        } else {
          setError("Failed to fetch API keys.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const handleCreate = async () => {
    if (!label.trim()) return;

    try {
      setCreating(true);
      await API.post("/auth/generate_api_key", {
        label,
        allowedServices: services,
      });
      await fetchApiKeys();
      setLabel("");
      setServices([]);
      setShowModal(false);
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  const toggleService = (service: string) => {
    setServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  // Toggle visibility for a specific key row
  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getStatusStyles = (status: string) => {
    return status === "ACTIVE"
      ? "bg-green-500/20 text-green-400"
      : "bg-red-500/20 text-red-400";
  };

  return (
    <div className="bg-[#111111] border border-white/5 rounded-xl shadow-xl p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white font-semibold text-lg">API Keys</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#8cff2e]/10 text-[#8cff2e] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#8cff2e]/20 transition"
        >
          <Plus size={16} />
          New API Key
        </button>
      </div>

      {/* Loading & Error States */}
      {loading && <div className="text-gray-400 text-center py-6">Loading API keys...</div>}
      {error && <div className="text-red-500 text-center py-6">{error}</div>}

      {/* Table */}
      {!loading && !error && (
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
                  <td className="py-3 font-medium text-white">{key.label}</td>

                  {/* SECRET TOGGLE COLUMN */}
                  <td className="py-3">
                    <div className="flex items-center gap-3 font-mono text-xs">
                      <span className="min-w-[140px]">
                        {visibleKeys[key.id] ? key.secret : `${key.secret.slice(0, 6)}••••••••••••`}
                      </span>
                      <button
                        onClick={() => toggleKeyVisibility(key.id)}
                        className="p-1 hover:bg-white/10 rounded transition-colors text-gray-400 hover:text-white"
                        title={visibleKeys[key.id] ? "Hide Secret" : "Show Secret"}
                      >
                        {visibleKeys[key.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </td>

                  <td>
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${getStatusStyles(key.status)}`}>
                      {key.status}
                    </span>
                  </td>

                  <td>
                    {key.services.length > 0 ? (
                      <div className="flex gap-1">
                        {key.services.map(s => (
                          <span key={s} className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-gray-400 border border-white/5">
                            {s}
                          </span>
                        ))}
                      </div>
                    ) : "—"}
                  </td>

                  <td className="text-gray-500">
                    {new Date(key.createdAt).toLocaleDateString()}
                  </td>

                  <td className="text-gray-500">
                    {key.expiresAt ? new Date(key.expiresAt).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0f0f0f] p-6 rounded-xl w-[400px] border border-white/10 shadow-2xl">
            <h3 className="text-white text-lg font-semibold mb-4">Create API Key</h3>
            <input
              type="text"
              placeholder="Label (e.g. Production Mobile App)"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full mb-4 px-3 py-2 rounded bg-[#1a1a1a] text-white border border-white/10 outline-none focus:border-[#8cff2e]/50 transition"
            />
            <div className="mb-6">
              <p className="text-sm text-gray-400 mb-3">Allowed Services</p>
              <div className="flex gap-2 flex-wrap">
                {["TILES", "ROUTING", "GEO_CODING"].map((service) => (
                  <button
                    key={service}
                    onClick={() => toggleService(service)}
                    className={`px-3 py-1.5 text-[11px] font-bold rounded border transition-all ${
                      services.includes(service)
                        ? "bg-[#8cff2e]/20 text-[#8cff2e] border-[#8cff2e]/30"
                        : "border-white/10 text-gray-500 hover:border-white/20"
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={creating || !label.trim()}
                className="px-6 py-2 text-sm bg-[#8cff2e] text-black font-bold rounded-lg hover:bg-[#7be026] disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {creating ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}