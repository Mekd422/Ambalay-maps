import { useEffect, useState } from 'react'
import Link from 'next/link'
import { checkoutInvoice, getInvoice, type BillingInvoice } from '../../../api/billing'
import {
  DashboardButton,
  DashboardCard,
  DashboardHeader,
} from './DashboardShell'

type BillingInvoiceDetailProps = {
  invoiceId: string
}

const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)

const formatDate = (value: string) => new Date(value).toLocaleString()

export default function BillingInvoiceDetail({
  invoiceId,
}: BillingInvoiceDetailProps) {
  const [invoice, setInvoice] = useState<BillingInvoice | null>(null)
  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(false)

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await getInvoice(invoiceId)
        setInvoice(res.data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchInvoice()
  }, [invoiceId])

  const handlePayNow = async () => {
    if (!invoice) {
      return
    }

    try {
      setPaying(true)
      const res = await checkoutInvoice(invoice.id)
      window.location.assign(res.data.data.checkoutUrl)
    } catch (err) {
      console.error(err)
    } finally {
      setPaying(false)
    }
  }

  if (loading) {
    return (
      <DashboardCard>
        <div className="py-10 text-center text-gray-400">Loading invoice...</div>
      </DashboardCard>
    )
  }

  if (!invoice) {
    return (
      <DashboardCard>
        <div className="py-10 text-center text-gray-400">Invoice not found.</div>
      </DashboardCard>
    )
  }

  const canPay = invoice.status === 'DUE' || invoice.status === 'OVERDUE'

  return (
    <div className="space-y-6">
      <DashboardHeader
        kicker="Billing"
        title="Invoice Details"
        subtitle="Review invoice status, payment attempts, and complete payment if needed."
        actions={
          <Link
            href="/dashboard/billing"
            className="rounded-lg border border-slate-200/30 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-[#070707] dark:text-gray-200 dark:hover:bg-white/[0.03]"
          >
            Back to billing
          </Link>
        }
      />

      <DashboardCard className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">Invoice ID</p>
            <h3 className="mt-1 break-all text-lg font-semibold text-slate-900 dark:text-white">
              {invoice.id}
            </h3>
          </div>
          <span className="rounded-full border border-slate-200/30 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:text-gray-200">
            {invoice.status}
          </span>
        </div>

        <div className="grid gap-4 text-sm text-gray-700 dark:text-gray-300 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <p className="text-gray-500">Plan</p>
            <p className="mt-1 font-medium text-slate-900 dark:text-white">
              {invoice.subscriptionPlan.label}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Amount</p>
            <p className="mt-1 font-medium text-slate-900 dark:text-white">
              {formatCurrency(invoice.amount, invoice.currency)}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Due at</p>
            <p className="mt-1 font-medium text-slate-900 dark:text-white">{formatDate(invoice.dueAt)}</p>
          </div>
          <div>
            <p className="text-gray-500">Interval</p>
            <p className="mt-1 font-medium text-slate-900 dark:text-white">{invoice.interval}</p>
          </div>
        </div>

        <div className="grid gap-4 text-sm text-gray-700 dark:text-gray-300 md:grid-cols-2">
          <div>
            <p className="text-gray-500">Billing period</p>
            <p className="mt-1 font-medium text-slate-900 dark:text-white">
              {formatDate(invoice.periodStart)} - {formatDate(invoice.periodEnd)}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Kind</p>
            <p className="mt-1 font-medium text-slate-900 dark:text-white">{invoice.kind}</p>
          </div>
        </div>

        {canPay ? (
          <DashboardButton
            variant="primary"
            disabled={paying}
            onClick={handlePayNow}
            className="w-fit"
          >
            {paying ? 'Redirecting...' : 'Pay now'}
          </DashboardButton>
        ) : null}
      </DashboardCard>

      <DashboardCard className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Payments</h3>

        {invoice.payments.length === 0 ? (
          <div className="rounded-xl border border-slate-200/30 bg-slate-50 p-6 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-400">
            No payment attempts recorded for this invoice yet.
          </div>
        ) : (
          <div className="space-y-3">
            {invoice.payments.map((payment) => (
              <div
                key={payment.id}
                className="rounded-xl border border-slate-200/30 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{payment.id}</p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Updated {formatDate(payment.updatedAt)}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-700 dark:text-gray-300">
                    <span>{formatCurrency(payment.amount, payment.currency)}</span>
                    <span className="rounded-full border border-slate-200/30 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:text-gray-200">
                      {payment.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </DashboardCard>
    </div>
  )
}
