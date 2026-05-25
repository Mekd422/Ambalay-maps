import API from './axios'

interface ApiResponse<T> {
  status: string
  data: T
  message: string
  timestamp: string
  requestId: string
}

export type BillingInterval = 'MONTH' | 'YEAR'
export type InvoiceStatus = 'DUE' | 'PAID' | 'VOID' | 'OVERDUE'

export interface SubscriptionPlanItem {
  id: string
  service: string
  amount: number
  subscriptionPlanId: string
}

export interface SubscriptionPlan {
  id: string
  label: string
  description: string
  isActive: boolean
  currency?: string
  monthlyPriceAmount?: number
  yearlyPriceAmount?: number
  items: SubscriptionPlanItem[]
}

export interface RemainingEntry {
  service: string
  amount: number
  usedCount: number
  remaining: number
}

export interface SubscriptionPeriod {
  id: string
  kind: string
  interval: BillingInterval | null
  status: string
  startsAt: string
  endsAt: string
  graceEndsAt: string | null
  inGrace: boolean
  subscriptionPlan: SubscriptionPlan
  remaining: RemainingEntry[]
}

export interface InvoicePayment {
  id: string
  status: string
  amount: number
  currency: string
  createdAt: string
  updatedAt: string
}

export interface InvoiceSummary {
  id: string
  businessId: string
  subscriptionPlanId: string
  interval: BillingInterval
  kind: string
  amount: number
  currency: string
  status: InvoiceStatus
  periodStart: string
  periodEnd: string
  dueAt: string
  createdAt?: string
  updatedAt?: string
  subscriptionPlan: Pick<SubscriptionPlan, 'id' | 'label'>
  payments?: InvoicePayment[]
}

export interface MySubscriptionSummary {
  currentPeriod: SubscriptionPeriod | null
  nextInvoice: InvoiceSummary | null
  plannedChange: unknown | null
}

export interface Plan {
  id: string
  label: string
  description: string
  isActive?: boolean
  currency?: string
  monthlyPriceAmount?: number
  yearlyPriceAmount?: number
  items: Array<{ service: string; amount: number }>
}

export const getPlans = () => API.get<ApiResponse<Plan[]>>('/subscriptions/plans')
export const getAllPlans = () =>
  API.get<ApiResponse<Plan[]>>('/subscriptions/plans/all')
export const getMySubscription = () =>
  API.get<ApiResponse<MySubscriptionSummary>>('/subscriptions/my')
export const subscribeToPlan = (planId: string, interval: BillingInterval) =>
  API.post<ApiResponse<InvoiceSummary>>('/subscriptions/subscribe', {
    planId,
    interval,
  })
export const getServices = () => API.get('/types/services')

export const togglePlanActive = (planId: string) =>
  API.post('/subscriptions/toggle_active', { id: planId })

export const createPlan = (plan: {
  label: string
  description: string
  monthlyPriceAmount: number
  yearlyPriceAmount: number
  items: { service: string; amount: number }[]
}) => API.post('/subscriptions/create_plan', plan)
