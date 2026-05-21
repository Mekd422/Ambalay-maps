import { useEffect, useState } from 'react'
import { getMySubscription, type SubscriptionPeriod } from '../../../api/subscription'
import { DashboardCard, DashboardHeader } from './DashboardShell'

export default function MyOrganization() {
  const [currentPeriod, setCurrentPeriod] = useState<SubscriptionPeriod | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMySubscription()
        setCurrentPeriod(res.data.data.currentPeriod ?? null)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <DashboardCard>
        <div className="py-10 text-center text-gray-400">
          Loading subscription...
        </div>
      </DashboardCard>
    )
  }

  if (!currentPeriod) {
    return (
      <div className="space-y-6">
        <DashboardHeader
          kicker="Organization Overview"
          title="My Organization"
          subtitle="Review your active subscription, billing period, and usage allocation."
        />
        <DashboardCard>
          <div className="py-10 text-center text-gray-400">
            No active or grace subscription period found.
          </div>
        </DashboardCard>
      </div>
    )
  }

  const isActive = currentPeriod.status === 'ACTIVE'

  return (
    <div className="space-y-6">
      <DashboardHeader
        kicker="Organization Overview"
        title="My Organization"
        subtitle="Review your active subscription, billing period, and usage allocation."
      />
      <DashboardCard className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Current Access</h2>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              isActive
                ? 'bg-green-500/10 text-green-400'
                : 'bg-red-500/10 text-red-400'
            }`}
          >
            {currentPeriod.status}
          </span>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-gray-400">Current Plan</p>
          <h3 className="text-lg font-semibold text-[#8cff2e]">
            {currentPeriod.subscriptionPlan.label}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {currentPeriod.subscriptionPlan.description}
          </p>
        </div>

        <div className="flex flex-wrap justify-between gap-4 text-sm text-gray-400">
          <p>
            Start:{' '}
            <span className="text-white">
              {new Date(currentPeriod.startsAt).toLocaleDateString()}
            </span>
          </p>
          <p>
            End:{' '}
            <span className="text-white">
              {new Date(currentPeriod.endsAt).toLocaleDateString()}
            </span>
          </p>
          {currentPeriod.graceEndsAt ? (
            <p>
              Grace Ends:{' '}
              <span className="text-white">
                {new Date(currentPeriod.graceEndsAt).toLocaleDateString()}
              </span>
            </p>
          ) : null}
        </div>

        <div>
          <h3 className="text-md mb-3 font-semibold text-white">Usage</h3>

          {currentPeriod.remaining.length > 0 ? (
            <div className="space-y-4">
              {currentPeriod.remaining.map((item) => {
                const percent =
                  item.amount > 0
                    ? Math.min((item.usedCount / item.amount) * 100, 100)
                    : 0

                return (
                  <div key={item.service}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-gray-300">{item.service}</span>
                      <span className="text-gray-400">
                        {item.usedCount} / {item.amount}
                      </span>
                    </div>

                    <div className="h-2 w-full rounded-full border border-white/5 bg-[#070707]">
                      <div
                        className="h-2 rounded-full bg-[#8cff2e] transition-all"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-gray-500">No usage data available</p>
          )}
        </div>
      </DashboardCard>
    </div>
  )
}
