import { useEffect, useState } from "react";
import { getMySubscription } from "../../../api/subscription";
import { DashboardCard, DashboardHeader } from "./DashboardShell";

interface SubscriptionItem {
  id: string;
  service: string;
  amount: number;
  subscriptionPlanId: string;
}

interface SubscriptionPlan {
  id: string;
  label: string;
  description: string;
  isActive: boolean;
  items: SubscriptionItem[];
}

interface Usage {
  id: string;
  service: string;
  usedCount: number;
}

interface MySubscription {
  id: string;
  status: string;
  startsAt: string;
  endsAt: string;
  subscriptionPlan?: SubscriptionPlan;
  usages?: Usage[];
}

export default function MyOrganization() {
  const [data, setData] = useState<MySubscription[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMySubscription();

        const subscriptions: MySubscription[] = res.data.data ?? [];

        setData(subscriptions);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!data.length) {
    return <DashboardCard><div className="text-gray-400 text-center py-10">Loading subscription...</div></DashboardCard>;
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        kicker="Organization Overview"
        title="My Organization"
        subtitle="Review your active subscription, billing period, and usage allocation."
      />
      {data.map((sub) => {
        const isActive = sub.status === "ACTIVE";

        return (
          <DashboardCard key={sub.id} className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">
                My Subscription
              </h2>

              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${
                  isActive
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {sub.status}
              </span>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-sm text-gray-400">Current Plan</p>
              <h3 className="text-lg font-semibold text-[#8cff2e]">
                {sub.subscriptionPlan?.label || "No active plan"}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {sub.subscriptionPlan?.description}
              </p>
            </div>

            {/* Dates */}
            <div className="flex justify-between text-sm text-gray-400">
              <p>
                Start:{" "}
                <span className="text-white">
                  {new Date(sub.startsAt).toLocaleDateString()}
                </span>
              </p>
              <p>
                End:{" "}
                <span className="text-white">
                  {new Date(sub.endsAt).toLocaleDateString()}
                </span>
              </p>
            </div>

            <div>
              <h3 className="text-md font-semibold text-white mb-3">
                Usage
              </h3>

              {sub.usages && sub.subscriptionPlan ? (
                <div className="space-y-4">
                  {sub.subscriptionPlan.items.map((item) => {
                    const usage = sub.usages?.find(
                      (u) => u.service === item.service
                    );

                    const used = usage?.usedCount || 0;
                    const total = item.amount;
                    const percent = Math.min((used / total) * 100, 100);

                    return (
                      <div key={item.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">
                            {item.service}
                          </span>
                          <span className="text-gray-400">
                            {used} / {total}
                          </span>
                        </div>

                        <div className="w-full bg-[#070707] rounded-full h-2 border border-white/5">
                          <div
                            className="h-2 rounded-full bg-[#8cff2e] transition-all"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500">
                  No usage data available
                  </p>
              )}
            </div>
          </DashboardCard>
        );
      })}
    </div>
  );
}
