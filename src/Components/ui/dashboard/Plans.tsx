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
import { DashboardButton, DashboardCard, DashboardHeader } from "./DashboardShell";
import { useServices } from "../../../hooks/useServices";

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
  const [togglingIds, setTogglingIds] = useState<Set<string>>(new Set());

  const [showCreate, setShowCreate] = useState(false);
  const [newPlan, setNewPlan] = useState({
    label: "",
    description: "",
  });

  const { services } = useServices();
  const [selectedItems, setSelectedItems] = useState<PlanItem[]>([]);

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

  const handleSubscribe = async (id: string) => {
    try {
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

  const handleToggle = async (id: string) => {
    setTogglingIds(prev => new Set(prev).add(id));

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
    } finally {
      setTogglingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleServiceToggle = (service: string, checked: boolean) => {
    if (checked) {
      setSelectedItems((prev) => [
        ...prev,
        { service, amount: 1000 },
      ]);
    } else {
      setSelectedItems((prev) =>
        prev.filter((item) => item.service !== service)
      );
    }
  };

  const handleAmountChange = (service: string, amount: number) => {
    const safeAmount = Math.max(1, amount);

    setSelectedItems((prev) =>
      prev.map((item) =>
        item.service === service ? { ...item, amount: safeAmount } : item
      )
    );
  };

  const handleCreatePlan = async () => {
    try {
      if (!newPlan.label.trim()) {
        alert("Label is required");
        return;
      }

      if (selectedItems.length === 0) {
        alert("Please select at least one service");
        return;
      }

      const hasInvalidAmount = selectedItems.some(
        (item) => !item.amount || item.amount <= 0
      );

      if (hasInvalidAmount) {
        alert("All services must have a valid amount (> 0)");
        return;
      }

      await createPlan({
        label: newPlan.label,
        description: newPlan.description,
        items: selectedItems,
      });

      setShowCreate(false);
      setNewPlan({ label: "", description: "" });
      setSelectedItems([]);

      await fetchPlansData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-10">
      <DashboardHeader
        kicker={isAdmin ? "Administration" : "Subscription Catalog"}
        title="Plans"
        subtitle={isAdmin ? "Create, review, and enable subscription plans." : "Choose the plan that fits your usage needs."}
        actions={isAdmin ? (
          <DashboardButton onClick={() => setShowCreate(!showCreate)} variant="primary" className="flex items-center gap-2">
            <Plus size={16} />
            {showCreate ? "Close" : "Create Plan"}
          </DashboardButton>
        ) : undefined}
      />

      {isAdmin && showCreate && (
        <DashboardCard className="space-y-4">
          <input
            placeholder="Label"
            className="w-full p-3 bg-[#070707] text-white border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-[#8cff2e]/30"
            value={newPlan.label}
            onChange={(e) =>
              setNewPlan({ ...newPlan, label: e.target.value })
            }
          />

          <textarea
            placeholder="Description"
            className="w-full p-3 bg-[#070707] text-white border border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-[#8cff2e]/30"
            value={newPlan.description}
            onChange={(e) =>
              setNewPlan({ ...newPlan, description: e.target.value })
            }
          />

          <div className="space-y-3">
            <p className="text-sm text-gray-400">Select Services</p>

            {services.map((service) => {
              const selected = selectedItems.find(
                (item) => item.service === service
              );

              return (
                <div key={service} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={!!selected}
                    onChange={(e) =>
                      handleServiceToggle(service, e.target.checked)
                    }
                  />

                  <span className="text-white w-32">{service}</span>

                  {selected && (
                    <input
                      type="number"
                      min="1"
                      className="p-2 bg-black border border-white/10 rounded w-32"
                      value={selected.amount}
                      onChange={(e) =>
                        handleAmountChange(
                          service,
                          Number(e.target.value)
                        )
                      }
                    />
                  )}
                </div>
              );
            })}
          </div>

          <DashboardButton onClick={handleCreatePlan} variant="primary" className="w-fit font-semibold">
            Save Plan
          </DashboardButton>
        </DashboardCard>
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
                  disabled={togglingIds.has(plan.id)}
                  className={`absolute top-4 right-4 text-xs px-2 py-1 rounded ${
                    plan.isActive
                      ? "bg-green-500 text-black"
                      : "bg-red-500 text-white"
                  } disabled:opacity-50`}
                >
                  {togglingIds.has(plan.id) ? "Loading..." : (plan.isActive ? "Active" : "Inactive")}
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