import { useEffect, useState , useCallback} from "react";
import {
  getPlans,
  getAllPlans,
  subscribeToPlan,
  togglePlanActive,
  createPlan,
  getMySubscription,
} from "../../../api/subscription";
import { useAuth } from "../../../context/useAuth";

interface PlanItem {
  service: string;
  amount: number;
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
  const isAdmin = user?.role === "ADMIN";

  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentPlanId, setCurrentPlanId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // For admin create plan form
  const [newPlanLabel, setNewPlanLabel] = useState("");
  const [newPlanDescription, setNewPlanDescription] = useState("");

const fetchPlansData = useCallback(async () => {
  try {
    const plansRes = isAdmin ? await getAllPlans() : await getPlans();
    setPlans(plansRes.data.data);

    if (!isAdmin) {
      const subRes = await getMySubscription();
      setCurrentPlanId(subRes.data.data?.subscriptionPlan?.id || null);
    }
  } catch (err) {
    console.error(err);
  }
}, [isAdmin]);

useEffect(() => {
  fetchPlansData();
}, [fetchPlansData]);

  const handleSubscribe = async (id: string) => {
    try {
      setLoadingId(id);
      await subscribeToPlan(id);
      setCurrentPlanId(id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  const handleToggleActive = async (planId: string) => {
    try {
      await togglePlanActive(planId);
      fetchPlansData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreatePlan = async () => {
    if (!newPlanLabel || !newPlanDescription) return;
    try {
      await createPlan({ label: newPlanLabel, description: newPlanDescription });
      setNewPlanLabel("");
      setNewPlanDescription("");
      fetchPlansData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Admin: Create Plan */}
      {isAdmin && (
        <div className="p-4 border border-white/10 rounded-xl bg-[#0b0b0b] space-y-3">
          <h2 className="text-xl font-semibold">Create New Plan</h2>
          <input
            value={newPlanLabel}
            onChange={(e) => setNewPlanLabel(e.target.value)}
            placeholder="Plan Label"
            className="w-full p-2 rounded-lg bg-black border border-white/20 text-white"
          />
          <input
            value={newPlanDescription}
            onChange={(e) => setNewPlanDescription(e.target.value)}
            placeholder="Plan Description"
            className="w-full p-2 rounded-lg bg-black border border-white/20 text-white"
          />
          <button
            onClick={handleCreatePlan}
            className="px-4 py-2 bg-[#8cff2e] rounded-lg text-black"
          >
            Create Plan
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrent = currentPlanId === plan.id;

          return (
            <div
              key={plan.id}
              className={`p-6 rounded-2xl border ${
                isCurrent
                  ? "border-[#8cff2e] bg-[#0f1a0a]"
                  : "border-white/10 bg-[#0b0b0b]"
              }`}
            >
              {isAdmin && (
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      plan.isActive
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {plan.isActive ? "Active" : "Inactive"}
                  </span>
                  <button
                    onClick={() => handleToggleActive(plan.id)}
                    className="text-xs text-yellow-400 hover:underline"
                  >
                    Toggle
                  </button>
                </div>
              )}

              <h2 className="text-xl font-semibold text-white mt-2">{plan.label}</h2>
              <p className="text-gray-400 text-sm mt-1">{plan.description}</p>

              <div className="mt-4 space-y-2">
                {plan.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-300">{item.service}</span>
                    <span className="text-gray-500">{item.amount}</span>
                  </div>
                ))}
              </div>

              {!isAdmin && (
                <button
                  disabled={isCurrent || loadingId === plan.id}
                  onClick={() => handleSubscribe(plan.id)}
                  className={`w-full mt-6 py-2 rounded-lg ${
                    isCurrent
                      ? "bg-gray-700 text-gray-400"
                      : "bg-[#8cff2e] text-black"
                  }`}
                >
                  {loadingId === plan.id
                    ? "Processing..."
                    : isCurrent
                    ? "Current Plan"
                    : "Subscribe"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}