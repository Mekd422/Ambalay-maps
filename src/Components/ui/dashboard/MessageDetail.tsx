import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import {
  getContactMessage,
  getContactUsStatuses,
  updateContactMessageStatus,
  formatContactMessageName,
  type ContactMessageRecord,
} from '../../../api/contact'
import { DashboardCard, DashboardHeader } from './DashboardShell'

const formatLabel = (value: string) =>
  value
    .toLowerCase()
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

const getStatusBadgeClassName = (status: string) => {
  switch (status) {
    case 'RECEIVED':
      return 'bg-amber-500/15 text-amber-300 border-amber-400/20'
    case 'READ':
      return 'bg-blue-500/15 text-blue-300 border-blue-400/20'
    case 'CONTACTED':
      return 'bg-violet-500/15 text-violet-300 border-violet-400/20'
    case 'RESOLVED':
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-400/20'
    default:
      return 'bg-white/5 text-gray-200 border-white/10'
  }
}

const getInquiryBadgeClassName = (inquiryType: string) => {
  switch (inquiryType) {
    case 'TECHNICAL_SUPPORT':
      return 'bg-cyan-500/15 text-cyan-300 border-cyan-400/20'
    case 'PARTNERSHIP_OPPORTUNITY':
      return 'bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-400/20'
    case 'SALES':
      return 'bg-orange-500/15 text-orange-300 border-orange-400/20'
    case 'OTHER':
      return 'bg-slate-500/15 text-slate-300 border-slate-400/20'
    default:
      return 'bg-white/5 text-gray-200 border-white/10'
  }
}

export default function MessageDetail({ messageId }: { messageId?: string }) {
  const params = useParams<{ id?: string }>()
  const id = messageId ?? params.id
  const [message, setMessage] = useState<ContactMessageRecord | null>(null)
  const [statuses, setStatuses] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) {
      setError('Message not found.')
      setLoading(false)
      return
    }

    const fetchMessage = async () => {
      try {
        setLoading(true)
        setError('')

        const [messageData, statusesData] = await Promise.all([
          getContactMessage(id),
          getContactUsStatuses(),
        ])

        setMessage(messageData)
        setStatuses(statusesData)
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          if (err.response?.status === 401) {
            setError('Unauthorized. Please login again.')
          } else if (err.response?.status === 403) {
            setError('Forbidden. You do not have access.')
          } else if (err.response?.status === 404) {
            setError('Message not found.')
          } else {
            setError('Failed to load this message.')
          }
        } else {
          setError('An unexpected error occurred.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchMessage()
  }, [id])

  const handleStatusChange = async (nextStatus: string) => {
    if (!message || nextStatus === message.status) {
      return
    }

    try {
      setSaving(true)
      const updated = await updateContactMessageStatus(message.id, nextStatus)
      setMessage(updated)
    } catch (err) {
      console.error('Failed to update message status', err)
      setError('Failed to update message status.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-gray-400">Loading message...</div>
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Link
          to="/dashboard/messages"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Messages
        </Link>
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  if (!message) {
    return null
  }

  return (
    <div className="space-y-6">
      <Link
        to="/dashboard/messages"
        className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to Messages
      </Link>

      <DashboardCard className="space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <DashboardHeader
            kicker="Message Detail"
            title={formatContactMessageName(message)}
            subtitle={`Received ${new Date(message.createdAt).toLocaleString()}`}
          />
          <div className="w-full lg:w-56">
            <div className="mb-3">
              <span
                className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${getStatusBadgeClassName(message.status)}`}
              >
                {formatLabel(message.status)}
              </span>
            </div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-white/50">
              Status
            </label>
            <select
              value={message.status}
              onChange={(event) => void handleStatusChange(event.target.value)}
              disabled={saving}
              className="w-full rounded-xl border border-slate-200/30 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#8cff2e]/30 disabled:opacity-70 dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              {statuses.map((status) => (
                <option
                  key={status}
                  value={status}
                  className="bg-white text-slate-900 dark:bg-[#050505] dark:text-white"
                >
                  {formatLabel(status)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/50">
              Email
            </p>
            <p className="break-all text-sm text-gray-100">{message.email}</p>
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/50">
              Phone
            </p>
            <p className="text-sm text-gray-100">
              {message.phoneNumber || 'N/A'}
            </p>
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/50">
              Company
            </p>
            <p className="text-sm text-gray-100">{message.company || 'N/A'}</p>
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/50">
              Inquiry Type
            </p>
            <span
              className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${getInquiryBadgeClassName(message.inquiryType)}`}
            >
              {formatLabel(message.inquiryType)}
            </span>
          </div>
        </div>

<div className="rounded-3xl border border-slate-200/30 bg-white p-6 dark:border-white/10 dark:bg-white/5">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-white/50">
            Message
          </p>
          <p className="whitespace-pre-wrap text-sm leading-7 text-slate-900 dark:text-gray-200">
            {message.message || 'No message content provided.'}
          </p>
        </div>

        <div className="grid gap-6 text-sm text-gray-400 md:grid-cols-2">
          <div>
            <span className="text-slate-900 dark:text-white">Created:</span>{' '}
            {new Date(message.createdAt).toLocaleString()}
          </div>
          <div>
            <span className="text-slate-900 dark:text-white">Last Updated:</span>{' '}
            {new Date(message.updatedAt).toLocaleString()}
          </div>
        </div>
      </DashboardCard>
    </div>
  )
}
