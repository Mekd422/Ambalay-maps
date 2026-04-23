import { Plus, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import API from "../../../api/axios";
import { DashboardButton, DashboardCard, DashboardHeader } from "./DashboardShell";

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
      ? "bg-emerald-500/15 text-emerald-300 border-emerald-400/20"
      : "bg-red-500/15 text-red-300 border-red-400/20";
  };

  return (
    <DashboardCard>
      <DashboardHeader
        kicker="Developer Access"
        title="API Keys"
        subtitle={`${apiKeys.length} key${apiKeys.length === 1 ? "" : "s"} configured`}
        actions={(
          <DashboardButton onClick={() => setShowModal(true)} variant="primary" className="flex items-center gap-2">
            <Plus size={16} />
            New API Key
          </DashboardButton>
        )}
      />

      {/* Loading & Error States */}
      {loading && <div className="text-gray-400 text-center py-6">Loading API keys...</div>}
      {error && <div className="text-red-500 text-center py-6">{error}</div>}

      {/* Table */}
      {!loading && !error && (
        <div className="overflow-x-auto">
        <table className="w-full text-sm text-left min-w-[860px]">
          <thead className="text-gray-500 border-b border-white/10">
            <tr>
              <th className="py-3 pr-4">Label</th>
              <th className="pr-4">Secret</th>
              <th className="pr-4">Status</th>
              <th className="pr-4">Services</th>
              <th className="pr-4">Created</th>
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
                <tr key={key.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                  <td className="py-4 pr-4 font-medium text-white">{key.label}</td>

                  <td className="py-4 pr-4">
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

                  <td className="pr-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusStyles(key.status)}`}>
                      {key.status}
                    </span>
                  </td>

                  <td className="pr-4">
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

                  <td className="pr-4 text-gray-400">
                    {new Date(key.createdAt).toLocaleDateString()}
                  </td>

                  <td className="text-gray-400">
                    {key.expiresAt ? new Date(key.expiresAt).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      )}

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#111111] p-6 rounded-xl w-[400px] border border-white/10 shadow-2xl">
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
              <DashboardButton onClick={() => setShowModal(false)}>
                Cancel
              </DashboardButton>
              <DashboardButton
                onClick={handleCreate}
                disabled={creating || !label.trim()}
                variant="primary"
                className="px-6"
              >
                {creating ? "Creating..." : "Create"}
              </DashboardButton>
            </div>
          </div>
        </div>
      )}
    </DashboardCard>
  );
}
