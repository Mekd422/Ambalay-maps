import { useEffect, useState } from "react";
import { getMySubscription } from "../../../api/subscription";

interface Usage {
  id: string;
  service: string;
  usedCount: number;
}

export default function Usage() {
  const [usage, setUsage] = useState<Usage[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await getMySubscription();
      setUsage(res.data.data.usages || []);
    };

    fetch();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Usage</h2>

      {usage.map((u) => (
        <div key={u.id} className="border-b border-white/10 py-3">
          <p>{u.service}</p>
          <p>Used: {u.usedCount}</p>
        </div>
      ))}
    </div>
  );
}