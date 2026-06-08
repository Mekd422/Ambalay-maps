import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import {
  formatContactMessageName,
  getContactMessages,
  type ContactMessageRecord,
  type ContactMessagesPagination,
} from '../../../api/contact'
import {
  DashboardButton,
  DashboardCard,
  DashboardHeader,
} from './DashboardShell'

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

export default function ContactMessages() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<ContactMessageRecord[]>([])
  const [pagination, setPagination] = useState<ContactMessagesPagination>({
    page: 1,
    limit: 20,
    totalItems: 0,
    totalPages: 1,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true)
        setError('')

        const result = await getContactMessages(
          pagination.page,
          pagination.limit,
        )
        setMessages(result.data)
        setPagination(result.pagination)
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          if (err.response?.status === 401) {
            setError('Unauthorized. Please login again.')
          } else if (err.response?.status === 403) {
            setError('Forbidden. You do not have access.')
          } else {
            setError('Failed to fetch messages.')
          }
        } else {
          setError('An unexpected error occurred.')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [pagination.page, pagination.limit])

  const handlePageChange = (nextPage: number) => {
    if (
      nextPage < 1 ||
      nextPage > pagination.totalPages ||
      nextPage === pagination.page
    ) {
      return
    }

    setPagination((prev) => ({ ...prev, page: nextPage }))
  }

  return (
    <DashboardCard>
      <DashboardHeader
        kicker="Message Inbox"
        title="Contact Messages"
        subtitle={`${pagination.totalItems} message${pagination.totalItems === 1 ? '' : 's'} received`}
        actions={
          <>
            <DashboardButton
              disabled={pagination.page === 1 || loading}
              onClick={() => handlePageChange(pagination.page - 1)}
            >
              Previous
            </DashboardButton>
            <span>
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <DashboardButton
              disabled={pagination.page >= pagination.totalPages || loading}
              onClick={() => handlePageChange(pagination.page + 1)}
            >
              Next
            </DashboardButton>
          </>
        }
      />

      {loading && (
        <div className="py-10 text-center text-gray-400">
          Loading messages...
        </div>
      )}
      {error && <div className="py-10 text-center text-red-500">{error}</div>}

      {!loading && !error && messages.length === 0 && (
        <div className="py-10 text-center text-gray-400">
          No messages found.
        </div>
      )}

      {!loading && !error && messages.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left text-sm">
            <thead className="border-b border-slate-200/30 text-slate-600 dark:border-white/10 dark:text-gray-400">
              <tr>
                <th className="py-3 pr-4">Name</th>
                <th className="py-3 pr-4">Email</th>
                <th className="py-3 pr-4">Company</th>
                <th className="py-3 pr-4">Type</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3">Date</th>
              </tr>
            </thead>

            <tbody className="text-slate-700 dark:text-gray-300">
              {messages.map((message) => (
                <tr
                  key={message.id}
                  onClick={() => navigate(`/dashboard/messages/${message.id}`)}
                  className="cursor-pointer border-b border-slate-200/30 transition-colors hover:bg-slate-100/60 dark:border-white/5 dark:hover:bg-white/[0.03]"
                >
                  <td className="py-4 pr-4 font-medium text-slate-900 dark:text-white">
                    {formatContactMessageName(message)}
                  </td>
                  <td className="py-4 pr-4">{message.email}</td>
                  <td className="py-4 pr-4">{message.company || 'N/A'}</td>
                  <td className="py-4 pr-4">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${getInquiryBadgeClassName(message.inquiryType)}`}
                    >
                      {formatLabel(message.inquiryType)}
                    </span>
                  </td>
                  <td className="py-4 pr-4">
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${getStatusBadgeClassName(message.status)}`}
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
    </DashboardCard>
  )
}
