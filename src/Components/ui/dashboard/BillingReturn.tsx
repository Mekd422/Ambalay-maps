import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { getInvoice, type BillingInvoice } from '../../../api/billing'
import { DashboardButton, DashboardCard, DashboardHeader } from './DashboardShell'

type ReturnState = 'verifying' | 'pending' | 'void' | 'error'

export default function BillingReturn() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const invoiceId = searchParams.get('invoiceId')

  const [state, setState] = useState<ReturnState>('verifying')
  const [invoice, setInvoice] = useState<BillingInvoice | null>(null)

  const verifyInvoice = useCallback(async () => {
    if (!invoiceId) {
      setState('error')
      return
    }

    setState('verifying')

    try {
      const res = await getInvoice(invoiceId)
      const nextInvoice = res.data.data

      setInvoice(nextInvoice)

      if (nextInvoice.status === 'PAID') {
        router.push('/dashboard/billing')
        router.refresh()
        return
      }

      if (nextInvoice.status === 'VOID') {
        setState('void')
        return
      }

      setState('pending')
    } catch (err) {
      console.error(err)
      setState('error')
    }
  }, [invoiceId, router])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void verifyInvoice()
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [verifyInvoice])

  const invoiceHref = invoiceId
    ? `/dashboard/billing/invoices/${invoiceId}`
    : '/dashboard/billing'

  return (
    <div className="space-y-6">
      <DashboardHeader
        kicker="Billing"
        title="Payment Return"
        subtitle="We are checking whether your invoice payment has been confirmed."
      />

      <DashboardCard className="space-y-4">
        {state === 'verifying' ? (
          <div className="py-8 text-center text-gray-300">Verifying payment...</div>
        ) : null}

        {state === 'pending' ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-yellow-400/20 bg-yellow-400/10 p-4 text-sm text-yellow-100">
              Payment not confirmed yet.
            </div>
            {invoice ? (
              <div className="text-sm text-gray-400">
                Invoice status: <span className="text-white">{invoice.status}</span>
              </div>
            ) : null}
            <div className="flex flex-wrap gap-3">
              <DashboardButton variant="primary" onClick={verifyInvoice}>
                Try again
              </DashboardButton>
              <Link
                href={invoiceHref}
                className="rounded-lg border border-white/10 bg-[#070707] px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-white/[0.03]"
              >
                Back to invoice
              </Link>
            </div>
          </div>
        ) : null}

        {state === 'void' ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100">
              This invoice is void and can no longer be paid.
            </div>
            <Link
              href="/dashboard/billing"
              className="inline-flex rounded-lg border border-white/10 bg-[#070707] px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-white/[0.03]"
            >
              Back to billing
            </Link>
          </div>
        ) : null}

        {state === 'error' ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-100">
              We could not verify this payment right now.
            </div>
            <div className="flex flex-wrap gap-3">
              <DashboardButton variant="primary" onClick={verifyInvoice}>
                Try again
              </DashboardButton>
              <Link
                href="/dashboard/billing"
                className="rounded-lg border border-white/10 bg-[#070707] px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-white/[0.03]"
              >
                Back to billing
              </Link>
            </div>
          </div>
        ) : null}
      </DashboardCard>
    </div>
  )
}
