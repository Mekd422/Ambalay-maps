import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  type BillingInterval,
  getPlans,
  getAllPlans,
  subscribeToPlan,
  getMySubscription,
  createPlan,
  togglePlanActive,
  type InvoiceSummary,
  type Plan,
} from '../../../api/subscription'
import { useAuth } from '../../../context/useAuth'
import {
  DashboardButton,
  DashboardCard,
  DashboardHeader,
} from './DashboardShell'
import { useServices } from '../../../hooks/useServices'

interface PlanItem {
  service: string
  amount: number
}

const formatCurrency = (amount: number, currency = 'ETB') =>
  new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)

export default function Plans() {
  const router = useRouter()
  const { user } = useAuth()
  const isAdmin = user?.accessLevel === 'ADMIN'

  const [plans, setPlans] = useState<Plan[]>([])
  const [subscribedPlanIds, setSubscribedPlanIds] = useState<string[]>([])
  const [nextInvoice, setNextInvoice] = useState<InvoiceSummary | null>(null)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [togglingIds, setTogglingIds] = useState<Set<string>>(new Set())
  const [selectedIntervals, setSelectedIntervals] = useState<
    Record<string, BillingInterval>
  >({})

  const [showCreate, setShowCreate] = useState(false)
  const [newPlan, setNewPlan] = useState({
    label: '',
    description: '',
    monthlyPriceAmount: '',
    yearlyPriceAmount: '',
  })

  const { services } = useServices()
  const [selectedItems, setSelectedItems] = useState<PlanItem[]>([])

  const fetchPlansData = useCallback(async () => {
    try {
      const res = isAdmin ? await getAllPlans() : await getPlans()
      setPlans(res.data.data)
    } catch (err) {
      console.error(err)
    }
  }, [isAdmin])

  useEffect(() => {
    fetchPlansData()
  }, [fetchPlansData])

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (isAdmin) return

      try {
        const subRes = await getMySubscription()
        const { currentPeriod, nextInvoice: pendingInvoice } = subRes.data.data

        setSubscribedPlanIds(
          currentPeriod?.subscriptionPlan?.id ? [currentPeriod.subscriptionPlan.id] : [],
        )
        setNextInvoice(pendingInvoice ?? null)
      } catch (err) {
        console.error(err)
      }
    }

    fetchSubscriptions()
  }, [isAdmin])

  const handleSubscribe = async (id: string) => {
    try {
      setLoadingId(id)

      const interval = selectedIntervals[id] ?? 'MONTH'
      const res = await subscribeToPlan(id, interval)
      const invoice = res.data.data

      setNextInvoice(invoice)
      router.push(`/dashboard/billing/invoices/${invoice.id}`)
    } catch (err) {
      console.error('subscribe error:', err)
    } finally {
      setLoadingId(null)
    }
  }

  const handleToggle = async (id: string) => {
    setTogglingIds((prev) => new Set(prev).add(id))

    try {
      setPlans((prev) =>
        prev.map((plan) =>
          plan.id === id ? { ...plan, isActive: !plan.isActive } : plan,
        ),
      )

      await togglePlanActive(id)
    } catch (err) {
      console.error(err)

      setPlans((prev) =>
        prev.map((plan) =>
          plan.id === id ? { ...plan, isActive: !plan.isActive } : plan,
        ),
      )
    } finally {
      setTogglingIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }

  const handleServiceToggle = (service: string, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [...prev, { service, amount: 1000 }])
    } else {
      setSelectedItems((prev) =>
        prev.filter((item) => item.service !== service),
      )
    }
  }

  const handleAmountChange = (service: string, amount: number) => {
    const safeAmount = Math.max(0, amount)

    setSelectedItems((prev) =>
      prev.map((item) =>
        item.service === service ? { ...item, amount: safeAmount } : item,
      ),
    )
  }

  const handleIntervalChange = (planId: string, interval: BillingInterval) => {
    setSelectedIntervals((prev) => ({
      ...prev,
      [planId]: interval,
    }))
  }

  const handleCreatePlan = async () => {
    try {
      if (!newPlan.label.trim()) {
        alert('Label is required')
        return
      }

      if (!newPlan.description.trim()) {
        alert('Description is required')
        return
      }

      const monthlyPriceAmount = Number(newPlan.monthlyPriceAmount)
      const yearlyPriceAmount = Number(newPlan.yearlyPriceAmount)

      if (
        !Number.isInteger(monthlyPriceAmount) ||
        monthlyPriceAmount < 0 ||
        !Number.isInteger(yearlyPriceAmount) ||
        yearlyPriceAmount < 0
      ) {
        alert('Monthly and yearly prices must be whole ETB amounts of 0 or more')
        return
      }

      if (selectedItems.length === 0) {
        alert('Please select at least one service')
        return
      }

      const hasInvalidAmount = selectedItems.some(
        (item) => !Number.isInteger(item.amount) || item.amount < 0,
      )

      if (hasInvalidAmount) {
        alert('All services must have a valid whole-number amount of 0 or more')
        return
      }

      await createPlan({
        label: newPlan.label.trim(),
        description: newPlan.description.trim(),
        monthlyPriceAmount,
        yearlyPriceAmount,
        items: selectedItems,
      })

      setShowCreate(false)
      setNewPlan({
        label: '',
        description: '',
        monthlyPriceAmount: '0',
        yearlyPriceAmount: '0',
      })
      setSelectedItems([])

      await fetchPlansData()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-10">
      <DashboardHeader
        kicker={isAdmin ? 'Administration' : 'Subscription Catalog'}
        title="Plans"
        subtitle={
          isAdmin
            ? 'Create, review, and enable subscription plans.'
            : 'Choose the plan that fits your usage needs.'
        }
        actions={
          isAdmin ? (
            <DashboardButton
              onClick={() => setShowCreate(!showCreate)}
              variant="primary"
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              {showCreate ? 'Close' : 'Create Plan'}
            </DashboardButton>
          ) : undefined
        }
      />

      {!isAdmin && nextInvoice ? (
        <DashboardCard className="space-y-3 border-yellow-400/20 bg-yellow-400/5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Invoice created. Payment required.
              </h3>
              <p className="mt-1 text-sm text-gray-300">
                {nextInvoice.subscriptionPlan.label} · {nextInvoice.status} · due{' '}
                {new Date(nextInvoice.dueAt).toLocaleDateString()}
              </p>
            </div>
            <DashboardButton
              variant="primary"
              onClick={() => router.push(`/dashboard/billing/invoices/${nextInvoice.id}`)}
            >
              View invoice
            </DashboardButton>
          </div>
        </DashboardCard>
      ) : null}

      {isAdmin && showCreate && (
        <DashboardCard className="space-y-4">
          <input
            placeholder="Label"
            className="w-full rounded-lg border border-white/10 bg-[#070707] p-3 text-white outline-none focus:ring-2 focus:ring-[#8cff2e]/30"
            value={newPlan.label}
            onChange={(e) => setNewPlan({ ...newPlan, label: e.target.value })}
          />

          <textarea
            placeholder="Description"
            className="w-full rounded-lg border border-white/10 bg-[#070707] p-3 text-white outline-none focus:ring-2 focus:ring-[#8cff2e]/30"
            value={newPlan.description}
            onChange={(e) =>
              setNewPlan({ ...newPlan, description: e.target.value })
            }
          />

          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="number"
              min="0"
              step="1"
              placeholder="Monthly price (ETB)"
              className="w-full rounded-lg border border-white/10 bg-[#070707] p-3 text-white outline-none focus:ring-2 focus:ring-[#8cff2e]/30"
              value={newPlan.monthlyPriceAmount}
              onChange={(e) =>
                setNewPlan({ ...newPlan, monthlyPriceAmount: e.target.value })
              }
            />

            <input
              type="number"
              min="0"
              step="1"
              placeholder="Yearly price (ETB)"
              className="w-full rounded-lg border border-white/10 bg-[#070707] p-3 text-white outline-none focus:ring-2 focus:ring-[#8cff2e]/30"
              value={newPlan.yearlyPriceAmount}
              onChange={(e) =>
                setNewPlan({ ...newPlan, yearlyPriceAmount: e.target.value })
              }
            />
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-400">Select Services</p>

            {services.map((service) => {
              const selected = selectedItems.find(
                (item) => item.service === service,
              )

              return (
                <div key={service} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={!!selected}
                    onChange={(e) =>
                      handleServiceToggle(service, e.target.checked)
                    }
                  />

                  <span className="w-32 text-white">{service}</span>

                  {selected && (
                    <input
                      type="number"
                      min="0"
                      step="1"
                      className="w-32 rounded border border-white/10 bg-black p-2"
                      value={selected.amount}
                      onChange={(e) =>
                        handleAmountChange(service, Number(e.target.value))
                      }
                    />
                  )}
                </div>
              )
            })}
          </div>

          <DashboardButton
            onClick={handleCreatePlan}
            variant="primary"
            className="w-fit font-semibold"
          >
            Save Plan
          </DashboardButton>
        </DashboardCard>
      )}

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => {
          const isSubscribed = subscribedPlanIds.includes(plan.id)
          const hasPendingInvoice =
            nextInvoice?.subscriptionPlanId === plan.id &&
            ['DUE', 'OVERDUE'].includes(nextInvoice.status)
          const selectedInterval = selectedIntervals[plan.id] ?? 'MONTH'

          return (
            <motion.div
              key={plan.id}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative rounded-3xl border p-6 transition-all duration-300 ${
                isSubscribed
                  ? 'scale-[1.03] border-[#8cff2e] bg-[#0f1a0a] shadow-[0_0_25px_rgba(140,255,46,0.3)]'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              {isAdmin && (
                <button
                  onClick={() => handleToggle(plan.id)}
                  disabled={togglingIds.has(plan.id)}
                  className={`absolute right-4 top-4 rounded px-2 py-1 text-xs ${
                    plan.isActive
                      ? 'bg-green-500 text-black'
                      : 'bg-red-500 text-white'
                  } disabled:opacity-50`}
                >
                  {togglingIds.has(plan.id)
                    ? 'Loading...'
                    : plan.isActive
                      ? 'Active'
                      : 'Inactive'}
                </button>
              )}

              {!isAdmin && isSubscribed && (
                <div className="absolute right-4 top-4 rounded-full bg-[#8cff2e] px-3 py-1 text-xs text-black">
                  Subscribed
                </div>
              )}

              <h2 className="text-xl font-bold text-white">{plan.label}</h2>

              <p className="mt-2 text-sm text-gray-400">{plan.description}</p>

              {!isAdmin ? (
                <div className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-gray-400">Billing interval</span>
                    <select
                      value={selectedInterval}
                      onChange={(e) =>
                        handleIntervalChange(
                          plan.id,
                          e.target.value as BillingInterval,
                        )
                      }
                      className="rounded-lg border border-white/10 bg-[#070707] px-3 py-2 text-sm text-white outline-none"
                    >
                      <option value="MONTH">Monthly</option>
                      <option value="YEAR">Yearly</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <span>Selected price</span>
                    <span className="font-medium text-white">
                      {selectedInterval === 'YEAR'
                        ? formatCurrency(
                            plan.yearlyPriceAmount ?? 0,
                            plan.currency ?? 'ETB',
                          )
                        : formatCurrency(
                            plan.monthlyPriceAmount ?? 0,
                            plan.currency ?? 'ETB',
                          )}
                    </span>
                  </div>
                </div>
              ) : null}

              <div className="mt-6 space-y-2">
                {plan.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="flex items-center gap-2 text-gray-300">
                      <CheckCircle size={14} className="text-[#8cff2e]" />
                      {item.service}
                    </span>
                    <span className="text-gray-500">{item.amount}</span>
                  </div>
                ))}
              </div>

              {!isAdmin && (
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isSubscribed || hasPendingInvoice || loadingId === plan.id}
                  className="mt-6 w-full rounded-lg bg-[#8cff2e] py-2 font-semibold text-black disabled:opacity-50"
                >
                  {loadingId === plan.id
                    ? 'Processing...'
                    : isSubscribed
                      ? 'Subscribed'
                      : hasPendingInvoice
                        ? 'Invoice Due'
                        : 'Subscribe'}
                </button>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
