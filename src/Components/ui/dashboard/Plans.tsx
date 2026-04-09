import { useEffect, useState } from "react";
import { getPlans, subscribeToPlan } from "../../../api/subscription";

interface PlanItem {
  service: string;
  amount: number;
}

interface Plan {
  id: string;
  label: string;
  description: string;
  items: PlanItem[];
}

export default function Plans() {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const res = await getPlans();
      setPlans(res.data.data);
    };

    fetchPlans();
  }, []);

  const handleSubscribe = async (id: string) => {
    try {
      await subscribeToPlan(id);
      alert("Subscribed successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      {plans.map((plan) => (
        <div key={plan.id} className="p-5 border border-white/10 rounded-xl">
          <h2 className="text-lg font-bold">{plan.label}</h2>
          <p>{plan.description}</p>

          <div className="mt-3">
            {plan.items.map((item, i) => (
              <p key={i}>
                {item.service}: {item.amount}
              </p>
            ))}
          </div>

          <button
            onClick={() => handleSubscribe(plan.id)}
            className="mt-3 px-4 py-2 bg-[#8cff2e] text-black rounded-lg"
          >
            Subscribe
          </button>
        </div>
      ))}
    </div>
  );
}