import { useEffect, useState } from "react";
import { getMySubscription } from "../../../api/subscription";
import { DashboardCard, DashboardHeader } from "./DashboardShell";

interface UsageEntry {
  service: string;
  usedCount: number;
}

interface PlanItem {
  service: string;
  amount: number;
}

interface RemainingEntry {
  service: string;
  amount: number;
  usedCount: number;
  remaining: number;
}

interface SubscriptionPlan {
  label: string;
  description: string;
  items: PlanItem[];
}

interface Subscription {
  id: string;
  status: string;
  startsAt: string;
  endsAt: string;
  subscriptionPlan?: SubscriptionPlan;
  usages?: UsageEntry[];
  remaining?: RemainingEntry[];
}

interface UsageRow {
  service: string;
  used: number;
  allowed: number;
}

const formatDate = (value: string) => new Date(value).toLocaleDateString();

export default function Usage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [usageRows, setUsageRows] = useState<UsageRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const res = await getMySubscription();
        const currentSubscription: Subscription | undefined = res.data.data?.[0];

        if (!currentSubscription) {
          setSubscription(null);
          setUsageRows([]);
          return;
        }

        const rowsFromRemaining = (currentSubscription.remaining ?? []).map((entry) => ({
          service: entry.service,
          used: entry.usedCount,
          allowed: entry.amount,
        }));

        const rows = rowsFromRemaining.length > 0
          ? rowsFromRemaining
          : (currentSubscription.subscriptionPlan?.items ?? []).map((item) => ({
              service: item.service,
              used:
                currentSubscription.usages?.find((usage) => usage.service === item.service)?.usedCount ?? 0,
              allowed: item.amount,
            }));

        setSubscription(currentSubscription);
        setUsageRows(rows.sort((a, b) => a.service.localeCompare(b.service)));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsage();
  }, []);

  if (loading) {
    return <DashboardCard><div className="py-10 text-center text-gray-400">Loading usage...</div></DashboardCard>;
  }

  if (!subscription) {
    return (
      <DashboardCard>
        <DashboardHeader kicker="Usage Overview" title="Usage" subtitle="Track your active subscription and service consumption." />
        <div className="py-10 text-center text-gray-400">No subscription found yet.</div>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard className="space-y-6">
      <DashboardHeader
        kicker="Usage Overview"
        title="Usage"
        subtitle="Track your active subscription and service consumption."
      />

      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-semibold text-white">
            {subscription.subscriptionPlan?.label ?? "Current Plan"}
          </h3>
          <span className="rounded-full border border-[#8cff2e]/20 bg-[#8cff2e]/10 px-3 py-1 text-xs font-semibold tracking-wide text-[#8cff2e]">
            {subscription.status}
          </span>
        </div>
        {subscription.subscriptionPlan?.description && (
          <p className="mb-4 max-w-2xl text-sm text-gray-400">{subscription.subscriptionPlan.description}</p>
        )}
        <div className="flex flex-wrap gap-6 text-sm text-gray-300">
          <div>
            <span className="text-gray-500">Starts:</span> {formatDate(subscription.startsAt)}
          </div>
          <div>
            <span className="text-gray-500">Ends:</span> {formatDate(subscription.endsAt)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {usageRows.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 px-5 py-10 text-center text-gray-400">
            No usage data available yet.
          </div>
        ) : (
          usageRows.map((row) => {
            const percentage =
              row.allowed > 0 ? Math.min((row.used / row.allowed) * 100, 100) : 0;

            return (
              <div
                key={row.service}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-[#8cff2e]/30 hover:bg-white/[0.07]"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {row.service}
                    </h3>

                    <p className="mt-1 text-sm text-gray-400">
                      Service usage consumption
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#8cff2e]/10 px-3 py-1 text-sm font-semibold text-[#8cff2e]">
                    {Math.round(percentage)}%
                  </div>
                </div>

                <div className="mb-3">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-gray-400">Used</span>

                    <span className="font-medium text-white">
                      {row.used.toLocaleString()} /{" "}
                      {row.allowed.toLocaleString()}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#8cff2e] transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-gray-500">Remaining</span>

                  <span className="font-semibold text-[#8cff2e]">
                    {(row.allowed - row.used).toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </DashboardCard>
  );
}
