import { useEffect, useState } from "react";
import { getMySubscription } from "../../../api/subscription";
import { DashboardCard, DashboardHeader } from "./DashboardShell";

interface Usage {
  id: string;
  service: string;
  usedCount: number;
}

interface Subscription {
  id: string;
  usages?: Usage[];
}

export default function Usage() {
  const [usage, setUsage] = useState<Usage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const res = await getMySubscription();

        const subscriptions: Subscription[] = res.data.data ?? [];

        const allUsages: Usage[] = subscriptions.flatMap(
          (sub: Subscription) => sub.usages ?? []
        );

        setUsage(allUsages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsage();
  }, []);

  if (loading) {
    return <DashboardCard><div className="text-gray-400 text-center py-10">Loading usage...</div></DashboardCard>;
  }

  if (usage.length === 0) {
    return (
      <DashboardCard>
        <DashboardHeader kicker="Usage Overview" title="Usage" subtitle="Track how your subscribed services are being consumed." />
        <div className="text-gray-400 text-center py-10">No usage data available yet.</div>
      </DashboardCard>
    );
  }

  const totalUsed = usage.reduce((sum, u) => sum + u.usedCount, 0);

  return (
    <DashboardCard>
      <DashboardHeader
        kicker="Usage Overview"
        title="Usage"
        subtitle={`Total services used: ${totalUsed}`}
      />

      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
        <p className="text-gray-400 mb-2">
          Total services used:{" "}
          <span className="font-semibold text-white">
            {totalUsed}
          </span>
        </p>

        <div className="space-y-3">
          {usage.map((u) => (
            <div
              key={u.id}
              className="flex justify-between p-3 bg-[#070707] rounded-lg border border-white/10"
            >
              <span className="text-gray-300">{u.service}</span>
              <span className="text-[#8cff2e] font-semibold">
                {u.usedCount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
}
