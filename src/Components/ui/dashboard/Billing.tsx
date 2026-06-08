import { useEffect, useState } from 'react'
import Link from 'next/link'
import { checkoutInvoice, listInvoices, type BillingInvoice } from '../../../api/billing'
import { getMySubscription, type MySubscriptionSummary } from '../../../api/subscription'
import {
  DashboardButton,
  DashboardCard,
  DashboardHeader,
} from './DashboardShell'

const formatCurrency = (amount: number, currency: string) =>
  new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)

const formatDate = (value: string) => new Date(value).toLocaleDateString()

export default function Billing() {
  const [summary, setSummary] = useState<MySubscriptionSummary | null>(null)
  const [invoices, setInvoices] = useState<BillingInvoice[]>([])
  const [loading, setLoading] = useState(true)
  const [payingInvoiceId, setPayingInvoiceId] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, invoicesRes] = await Promise.all([
          getMySubscription(),
          listInvoices(),
        ])

        setSummary(summaryRes.data.data)
        setInvoices(invoicesRes.data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handlePayNow = async (invoiceId: string) => {
    try {
      setPayingInvoiceId(invoiceId)
      const res = await checkoutInvoice(invoiceId)
      window.location.assign(res.data.data.checkoutUrl)
    } catch (err) {
      console.error(err)
    } finally {
      setPayingInvoiceId(null)
    }
  }

  if (loading) {
    return (
      <DashboardCard>
        <div className="py-10 text-center text-gray-400">Loading billing...</div>
      </DashboardCard>
    )
  }

  const currentPeriod = summary?.currentPeriod ?? null
  const nextInvoice = summary?.nextInvoice ?? null

  return (
    <div className="space-y-6">
      <DashboardHeader
        kicker="Billing"
        title="Billing"
        subtitle="Review your current access, pending invoice, and payment history."
      />

      <DashboardCard className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Current Access</h3>
          {currentPeriod ? (
            <span className="rounded-full border border-[#8cff2e]/20 bg-[#8cff2e]/10 px-3 py-1 text-xs font-semibold text-[#8cff2e]">
              {currentPeriod.status}
            </span>
          ) : null}
        </div>

        {currentPeriod ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200/30 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
              <p className="text-sm text-gray-400">Current plan</p>
              <h4 className="text-lg font-semibold text-[#8cff2e]">
                {currentPeriod.subscriptionPlan.label}
              </h4>
              <p className="mt-1 text-sm text-gray-500">
                {currentPeriod.subscriptionPlan.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-gray-300">
              <div>
                <span className="text-gray-500">Starts:</span>{' '}
                {formatDate(currentPeriod.startsAt)}
              </div>
              <div>
                <span className="text-gray-500">Ends:</span>{' '}
                {formatDate(currentPeriod.endsAt)}
              </div>
              {currentPeriod.graceEndsAt ? (
                <div>
                  <span className="text-gray-500">Grace ends:</span>{' '}
                  {formatDate(currentPeriod.graceEndsAt)}
                </div>
              ) : null}
              <div>
                <span className="text-gray-500">In grace:</span>{' '}
                {currentPeriod.inGrace ? 'Yes' : 'No'}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-gray-400">
            No active or grace-eligible subscription period right now.
          </div>
        )}
      </DashboardCard>

      <DashboardCard className="space-y-4">
        <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Next Invoice</h3>
          {nextInvoice ? (
            <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-300">
              {nextInvoice.status}
            </span>
          ) : null}
        </div>

        {nextInvoice ? (
          <div className="space-y-4">
            <div className="grid gap-4 text-sm text-gray-700 md:grid-cols-2 xl:grid-cols-4 dark:text-gray-300">
              <div>
                <p className="text-gray-500">Plan</p>
                <p className="mt-1 font-medium text-slate-900 dark:text-white">
                  {nextInvoice.subscriptionPlan.label}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Amount</p>
                <p className="mt-1 font-medium text-slate-900 dark:text-white">
                  {formatCurrency(nextInvoice.amount, nextInvoice.currency)}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Due</p>
                <p className="mt-1 font-medium text-slate-900 dark:text-white">
                  {formatDate(nextInvoice.dueAt)}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Period</p>
                <p className="mt-1 font-medium text-slate-900 dark:text-white">
                  {formatDate(nextInvoice.periodStart)} -{' '}
                  {formatDate(nextInvoice.periodEnd)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <DashboardButton
                variant="primary"
                disabled={payingInvoiceId === nextInvoice.id}
                onClick={() => handlePayNow(nextInvoice.id)}
              >
                {payingInvoiceId === nextInvoice.id ? 'Redirecting...' : 'Pay now'}
              </DashboardButton>
              <Link
                href={`/dashboard/billing/invoices/${nextInvoice.id}`}
                className="rounded-lg border border-slate-200/30 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-[#070707] dark:text-gray-200 dark:hover:bg-white/[0.03]"
              >
                View invoice
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200/30 bg-slate-50 p-6 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-400">
            No pending invoice at the moment.
          </div>
        )}
      </DashboardCard>

      <DashboardCard className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Invoice History</h3>

        {invoices.length === 0 ? (
          <div className="rounded-xl border border-slate-200/30 bg-slate-50 p-6 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-400">
            No invoices found yet.
          </div>
        ) : (
          <div className="space-y-3">
            {invoices.map((invoice) => {
              const latestPayment = invoice.payments?.[0]

              return (
                <Link
                  key={invoice.id}
                  href={`/dashboard/billing/invoices/${invoice.id}`}
                  className="flex flex-col gap-3 rounded-xl border border-slate-200/30 bg-slate-50 p-4 transition-colors hover:border-[#8cff2e]/30 hover:bg-slate-100/60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/[0.07] md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {invoice.subscriptionPlan.label}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {formatDate(invoice.periodStart)} -{' '}
                      {formatDate(invoice.periodEnd)}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                    <span>{formatCurrency(invoice.amount, invoice.currency)}</span>
                    <span className="rounded-full border border-slate-200/30 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:text-gray-200">
                      {invoice.status}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {latestPayment ? `Latest payment: ${latestPayment.status}` : 'No payments yet'}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </DashboardCard>
    </div>
  )
}
