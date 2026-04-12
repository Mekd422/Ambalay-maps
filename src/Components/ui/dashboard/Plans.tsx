import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Plus } from "lucide-react";
import {
  getPlans,
  getAllPlans,
  subscribeToPlan,
  getMySubscription,
  createPlan,
  togglePlanActive,
} from "../../../api/subscription";
import { useAuth } from "../../../context/useAuth";

interface PlanItem {
  service: string;
  amount: number;
}

interface Subscription {
  id: string;
  status: string;
  subscriptionPlanId: string;
}

interface Plan {
  id: string;
  label: string;
  description: string;
  isActive?: boolean;
  items: PlanItem[];
}

export default function Plans() {
  const { user } = useAuth();
  const isAdmin = user?.accessLevel === "ADMIN";

  const [plans, setPlans] = useState<Plan[]>([]);
  const [subscribedPlanIds, setSubscribedPlanIds] = useState<string[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const [showCreate, setShowCreate] = useState(false);
  const [newPlan, setNewPlan] = useState({
    label: "",
    description: "",
  });

  // ✅ fetch ONLY plans
  const fetchPlansData = useCallback(async () => {
    try {
      const res = isAdmin ? await getAllPlans() : await getPlans();
      setPlans(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [isAdmin]);

  useEffect(() => {
    fetchPlansData();
  }, [fetchPlansData]);

  // ✅ fetch subscriptions separately (multi-plan support)
  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (isAdmin) return;

      try {
        const subRes = await getMySubscription();
        const subscriptions: Subscription[] = subRes.data.data ?? [];

        const planIds = subscriptions.map(
          (sub) => sub.subscriptionPlanId
        );

        setSubscribedPlanIds(planIds);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSubscriptions();
  }, [isAdmin]);

  // ✅ subscribe (append only, never overwrite others)
  const handleSubscribe = async (id: string) => {
    try {
      console.log("👉 subscribing to plan:", id);

      setLoadingId(id);

      const res = await subscribeToPlan(id);
      const newSubscription: Subscription = res.data.data;

      setSubscribedPlanIds((prev) => {
        if (prev.includes(newSubscription.subscriptionPlanId)) {
          return prev;
        }
        return [...prev, newSubscription.subscriptionPlanId];
      });
    } catch (err) {
      console.error("subscribe error:", err);
    } finally {
      setLoadingId(null);
    }
  };

  // ✅ toggle (admin)
  const handleToggle = async (id: string) => {
    try {
      setPlans((prev) =>
        prev.map((plan) =>
          plan.id === id
            ? { ...plan, isActive: !plan.isActive }
            : plan
        )
      );

      await togglePlanActive(id);
    } catch (err) {
      console.error(err);

      setPlans((prev) =>
        prev.map((plan) =>
          plan.id === id
            ? { ...plan, isActive: !plan.isActive }
            : plan
        )
      );
    }
  };

  const handleCreatePlan = async () => {
    try {
      await createPlan({
        label: newPlan.label,
        description: newPlan.description,
        items: [{ service: "TILES", amount: 1000 }],
      });

      setShowCreate(false);
      setNewPlan({ label: "", description: "" });

      await fetchPlansData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-10">

      {isAdmin && (
        <div className="flex justify-between items-center">
          <h2 className="text-white text-lg font-semibold">
            Manage Plans
          </h2>

          <button
            onClick={() => setShowCreate(!showCreate)}
            className="flex items-center gap-2 px-4 py-2 bg-[#8cff2e] text-black rounded-lg font-semibold"
          >
            <Plus size={16} />
            Create Plan
          </button>
        </div>
      )}

      {isAdmin && showCreate && (
        <div className="bg-[#111] p-6 rounded-xl border border-white/10 space-y-3">
          <input
            placeholder="Label"
            className="w-full p-2 bg-black text-white border border-white/10 rounded"
            value={newPlan.label}
            onChange={(e) =>
              setNewPlan({ ...newPlan, label: e.target.value })
            }
          />

          <textarea
            placeholder="Description"
            className="w-full p-2 bg-black text-white border border-white/10 rounded"
            value={newPlan.description}
            onChange={(e) =>
              setNewPlan({ ...newPlan, description: e.target.value })
            }
          />

          <button
            onClick={handleCreatePlan}
            className="bg-[#8cff2e] text-black px-4 py-2 rounded font-semibold"
          >
            Save Plan
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const isSubscribed = subscribedPlanIds.includes(plan.id);

          return (
            <motion.div
              key={plan.id}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative p-6 rounded-3xl border transition-all duration-300 ${
                isSubscribed
                  ? "border-[#8cff2e] bg-[#0f1a0a] scale-[1.03] shadow-[0_0_25px_rgba(140,255,46,0.3)]"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {isAdmin && (
                <button
                  onClick={() => handleToggle(plan.id)}
                  className={`absolute top-4 right-4 text-xs px-2 py-1 rounded ${
                    plan.isActive
                      ? "bg-green-500 text-black"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {plan.isActive ? "Active" : "Inactive"}
                </button>
              )}

              {!isAdmin && isSubscribed && (
                <div className="absolute top-4 right-4 text-xs bg-[#8cff2e] text-black px-3 py-1 rounded-full">
                  Subscribed
                </div>
              )}

              <h2 className="text-xl font-bold text-white">
                {plan.label}
              </h2>

              <p className="text-gray-400 mt-2 text-sm">
                {plan.description}
              </p>

              <div className="mt-6 space-y-2">
                {plan.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-300 flex items-center gap-2">
                      <CheckCircle size={14} className="text-[#8cff2e]" />
                      {item.service}
                    </span>
                    <span className="text-gray-500">
                      {item.amount}
                    </span>
                  </div>
                ))}
              </div>

              {!isAdmin && (
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isSubscribed || loadingId === plan.id}
                  className="mt-6 w-full bg-[#8cff2e] text-black py-2 rounded-lg font-semibold disabled:opacity-50"
                >
                  {loadingId === plan.id
                    ? "Processing..."
                    : isSubscribed
                    ? "Subscribed"
                    : "Subscribe"}
                </button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}