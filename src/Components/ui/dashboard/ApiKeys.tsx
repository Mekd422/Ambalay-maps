import { Plus } from "lucide-react";
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

      {/* Loading */}
      {loading && (
        <div className="text-gray-400 text-center py-6">
          Loading API keys...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-red-500 text-center py-6">{error}</div>
      )}

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
                  <td className="py-3">{key.label}</td>

                  <td className="font-mono text-xs">
                    {key.secret.slice(0, 6)}••••••••
                  </td>

                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs ${getStatusStyles(
                        key.status
                      )}`}
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
                    {key.expiresAt
                      ? new Date(key.expiresAt).toLocaleDateString()
                      : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-[#0f0f0f] p-6 rounded-xl w-[400px] border border-white/10">

            <h3 className="text-white text-lg font-semibold mb-4">
              Create API Key
            </h3>

            {/* Label */}
            <input
              type="text"
              placeholder="Label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full mb-4 px-3 py-2 rounded bg-[#1a1a1a] text-white border border-white/10 outline-none"
            />

            {/* Services */}
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-2">Allowed Services</p>

              <div className="flex gap-2 flex-wrap">
                {["TILES", "ROUTING", "GEO_CODING"].map((service) => (
                  <button
                    key={service}
                    onClick={() => toggleService(service)}
                    className={`px-3 py-1 text-xs rounded border ${
                      services.includes(service)
                        ? "bg-[#8cff2e]/20 text-[#8cff2e] border-[#8cff2e]/30"
                        : "border-white/10 text-gray-400"
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white"
              >
                Cancel
              </button>

              <button
                onClick={handleCreate}
                disabled={creating}
                className="px-4 py-2 text-sm bg-[#8cff2e] text-black rounded hover:bg-[#7be026]"
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