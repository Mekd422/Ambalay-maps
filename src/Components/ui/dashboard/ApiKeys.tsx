import { Plus, Eye, EyeOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { createApiKey, getApiKeys, type ApiKey } from '../../../api/apiKeys'
import {
  DashboardButton,
  DashboardCard,
  DashboardHeader,
} from './DashboardShell'
import { useServiceGrants } from '../../../hooks/useServiceGrants'

interface ApiErrorResponse {
  message?: string
}

const MAX_API_KEYS = 5

export default function ApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [showModal, setShowModal] = useState(false)
  const [label, setLabel] = useState('')
  const [services, setServices] = useState<string[]>([])
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState('')
  const {
    serviceGrants,
    loading: serviceGrantsLoading,
    error: serviceGrantsError,
  } = useServiceGrants()

  // State to track which key IDs are currently visible
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({})
  const remainingApiKeys = Math.max(0, MAX_API_KEYS - apiKeys.length)

  const fetchApiKeys = async () => {
    try {
      const keys = await getApiKeys()
      setApiKeys(keys)
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          setError('Unauthorized. Please login again.')
        } else if (err.response?.status === 403) {
          setError('Forbidden. You do not have access.')
        } else {
          setError('Failed to fetch API keys.')
        }
      } else {
        setError('An unexpected error occurred.')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApiKeys()
  }, [])

  const handleCreate = async () => {
    if (!label.trim()) {
      setCreateError('Label is required.')
      return
    }

    if (services.length === 0) {
      setCreateError('Select at least one allowed service.')
      return
    }

    try {
      setCreating(true)
      setCreateError('')
      await createApiKey({
        label,
        allowedServices: services,
      })
      await fetchApiKeys()
      setLabel('')
      setServices([])
      setShowModal(false)
    } catch (err: unknown) {
      console.error(err)

      if (err instanceof AxiosError) {
        const apiError = err as AxiosError<ApiErrorResponse>

        if (
          apiError.response?.status === 429 &&
          apiError.response.data?.message === 'API_KEYS_LIMIT_EXCEEDED'
        ) {
          setCreateError(
            `API key limit exceeded. ${remainingApiKeys} remaining out of ${MAX_API_KEYS}.`,
          )
        } else {
          setCreateError('Failed to create API key.')
        }
      } else {
        setCreateError('Failed to create API key.')
      }
    } finally {
      setCreating(false)
    }
  }

  const toggleService = (service: string) => {
    setServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    )
  }

  // Toggle visibility for a specific key row
  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const getStatusStyles = (status: string) => {
    return status === 'ACTIVE'
      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400/20'
      : 'bg-red-500/15 text-red-300 border-red-400/20'
  }

  return (
    <DashboardCard>
      <DashboardHeader
        kicker="Developer Access"
        title="API Keys"
        subtitle={`${apiKeys.length} key${apiKeys.length === 1 ? '' : 's'} configured. ${remainingApiKeys} of ${MAX_API_KEYS} remaining.`}
        actions={
          <DashboardButton
            onClick={() => setShowModal(true)}
            variant="primary"
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            New API Key
          </DashboardButton>
        }
      />

      {/* Loading & Error States */}
      {loading && (
        <div className="py-6 text-center text-gray-400">
          Loading API keys...
        </div>
      )}
      {error && <div className="py-6 text-center text-red-500">{error}</div>}

      {/* Table */}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="border-b border-slate-200/30 text-slate-600 dark:border-white/10 dark:text-gray-400">
              <tr>
                <th className="py-3 pr-4">Label</th>
                <th className="pr-4">Secret</th>
                <th className="pr-4">Status</th>
                <th className="pr-4">Services</th>
                <th className="pr-4">Created</th>
                <th>Expires</th>
              </tr>
            </thead>

            <tbody className="text-slate-700 dark:text-gray-300">
              {apiKeys.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-700 dark:text-gray-400">
                    No API keys found
                  </td>
                </tr>
              ) : (
                apiKeys.map((key) => (
                  <tr
                    key={key.id}
                    className="border-b border-slate-200/30 transition-colors hover:bg-slate-100/60 dark:border-white/5 dark:hover:bg-white/[0.03]"
                  >
                    <td className="py-4 pr-4 font-medium text-slate-900 dark:text-white">
                      {key.label}
                    </td>

                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3 font-mono text-xs">
                        <span className="min-w-[140px]">
                          {visibleKeys[key.id]
                            ? key.secret
                            : `${key.secret.slice(0, 6)}••••••••••••`}
                        </span>
                        <button
                          onClick={() => toggleKeyVisibility(key.id)}
                          className="rounded p-1 text-gray-400 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-white/10 dark:hover:text-white"
                          title={
                            visibleKeys[key.id] ? 'Hide Secret' : 'Show Secret'
                          }
                        >
                          {visibleKeys[key.id] ? (
                            <EyeOff size={14} />
                          ) : (
                            <Eye size={14} />
                          )}
                        </button>
                      </div>
                    </td>

                    <td className="pr-4">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${getStatusStyles(key.status)}`}
                      >
                        {key.status}
                      </span>
                    </td>

                    <td className="pr-4">
                      {key.services.length > 0 ? (
                        <div className="flex gap-1">
                          {key.services.map((s) => (
                            <span
                              key={s}
                              className="rounded border border-slate-200/30 bg-slate-50 px-1.5 py-0.5 text-[10px] text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-400"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      ) : (
                        '—'
                      )}
                    </td>

                    <td className="pr-4 text-gray-400">
                      {new Date(key.createdAt).toLocaleDateString()}
                    </td>

                    <td className="text-gray-400">
                      {key.expiresAt
                        ? new Date(key.expiresAt).toLocaleDateString()
                        : '—'}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm dark:bg-black/80">
          <div className="w-[400px] rounded-xl border border-slate-200/30 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#111111]">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Create API Key
            </h3>
            <input
              type="text"
              placeholder="Label (e.g. Production Mobile App)"
              value={label}
              onChange={(e) => {
                setLabel(e.target.value)
                if (createError) {
                  setCreateError('')
                }
              }}
              className="mb-4 w-full rounded border border-slate-200/30 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-[#8cff2e]/50 dark:border-white/10 dark:bg-[#1a1a1a] dark:text-white"
            />
            <div className="mb-6">
              <p className="mb-3 text-sm text-gray-400">Allowed Services</p>
              <p className="mb-3 text-xs text-gray-500">
                {remainingApiKeys} of {MAX_API_KEYS} API keys remaining.
              </p>
              {serviceGrantsLoading ? (
                <p className="text-sm text-gray-500">
                  Loading allowed services...
                </p>
              ) : serviceGrantsError ? (
                <p className="text-sm text-red-400">{serviceGrantsError}</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {serviceGrants.map((service) => (
                    <button
                      key={service}
                      onClick={() => {
                        toggleService(service)
                        if (createError) {
                          setCreateError('')
                        }
                      }}
                      className={`rounded border px-3 py-1.5 text-[11px] font-bold transition-all ${
                        services.includes(service)
                          ? 'border-[#8cff2e]/30 bg-[#8cff2e]/20 text-[#8cff2e]'
                          : 'border-white/10 text-gray-500 hover:border-white/20'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {createError && (
              <p className="mb-4 text-sm text-red-400">{createError}</p>
            )}
            <div className="flex justify-end gap-3 pt-2">
              <DashboardButton
                onClick={() => {
                  setShowModal(false)
                  setCreateError('')
                }}
              >
                Cancel
              </DashboardButton>
              <DashboardButton
                onClick={handleCreate}
                disabled={
                  creating ||
                  !label.trim() ||
                  services.length === 0 ||
                  serviceGrantsLoading ||
                  !!serviceGrantsError
                }
                variant="primary"
                className="px-6"
              >
                {creating ? 'Creating...' : 'Create'}
              </DashboardButton>
            </div>
          </div>
        </div>
      )}
    </DashboardCard>
  )
}
