import API from './axios'
import type { InvoicePayment, InvoiceSummary } from './subscription'

interface ApiResponse<T> {
  status: string
  data: T
  message: string
  timestamp: string
  requestId: string
}

export interface CheckoutResponse {
  invoice: InvoiceSummary
  payment: InvoicePayment
  checkoutUrl: string
}

export type BillingInvoice = InvoiceSummary & {
  payments: InvoicePayment[]
}

export const checkoutInvoice = (invoiceId: string, idempotencyKey?: string) =>
  API.post<ApiResponse<CheckoutResponse>>(
    '/billing/checkout',
    { invoiceId },
    {
      headers: idempotencyKey
        ? { 'Idempotency-Key': idempotencyKey }
        : undefined,
    },
  )

export const listInvoices = () =>
  API.get<ApiResponse<BillingInvoice[]>>('/billing/invoices')

export const getInvoice = (invoiceId: string) =>
  API.get<ApiResponse<BillingInvoice>>(`/billing/invoices/${invoiceId}`)
