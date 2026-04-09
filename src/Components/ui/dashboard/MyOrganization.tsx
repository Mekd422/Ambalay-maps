import { useEffect, useState } from "react";
import { getMySubscription } from "../../../api/subscription";


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
  createdAt: string;
  updatedAt: string;
  items: SubscriptionItem[];
}

interface Usage {
  id: string;
  subscriptionId: string;
  service: string;
  usedCount: number;
  createdAt: string;
  updatedAt: string;
}

interface MySubscription {
  id: string;
  businessId: string;
  subscriptionPlanId: string;
  status: string;
  startsAt: string;
  endsAt: string;
  createdAt: string;
  updatedAt: string;
  subscriptionPlan: SubscriptionPlan;
  usages: Usage[];
}

export default function MyOrganization() {
  const [data, setData] = useState<MySubscription | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMySubscription();
        setData(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="bg-black p-6 rounded-xl border border-white/10">
      <h2 className="text-xl font-semibold mb-4">My Subscription</h2>

      <p>Status: {data.status}</p>
      <p>Start: {new Date(data.startsAt).toLocaleDateString()}</p>
      <p>End: {new Date(data.endsAt).toLocaleDateString()}</p>

      <h3 className="mt-4 font-semibold">Plan</h3>
      <p>{data.subscriptionPlan?.label}</p>
    </div>
  );
}