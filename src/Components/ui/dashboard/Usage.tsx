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

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-b border-white/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
          <span>Service</span>
          <span className="text-right">Used/Allowed</span>
        </div>

        {usageRows.length === 0 ? (
          <div className="px-5 py-10 text-center text-gray-400">No usage data available yet.</div>
        ) : (
          <div>
            {usageRows.map((row) => (
              <div
                key={row.service}
                className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-b border-white/5 px-5 py-4 last:border-b-0"
              >
                <span className="font-medium text-white">{row.service}</span>
                <span className="text-right font-semibold text-[#8cff2e]">
                  {row.used.toLocaleString()} / {row.allowed.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardCard>
  );
}
