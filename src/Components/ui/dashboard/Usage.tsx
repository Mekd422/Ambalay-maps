import { useEffect, useState } from "react";
import { getMySubscription } from "../../../api/subscription";

interface Usage {
  id: string;
  service: string;
  usedCount: number;
}

export default function Usage() {
  const [usage, setUsage] = useState<Usage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const res = await getMySubscription();
        setUsage(res.data.data.usages || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsage();
  }, []);

  if (loading) {
    return <p className="text-gray-400">Loading usage...</p>;
  }

  if (usage.length === 0) {
    return <p className="text-gray-400">No usage data available yet.</p>;
  }

  const totalUsed = usage.reduce((sum, u) => sum + u.usedCount, 0);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Usage</h2>

      <div className="bg-[#0b0b0b] p-4 rounded-xl border border-white/10">
        <p className="text-gray-400 mb-2">Total services used: <span className="font-semibold text-white">{totalUsed}</span></p>
        <div className="space-y-3">
          {usage.map((u) => (
            <div key={u.id} className="flex justify-between p-3 bg-[#0f0f0f] rounded-lg border border-white/5">
              <span className="text-gray-300">{u.service}</span>
              <span className="text-[#8cff2e] font-semibold">{u.usedCount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}