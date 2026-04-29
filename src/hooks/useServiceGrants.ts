import { useEffect, useState } from "react";
import { getServiceGrants } from "../api/types";

export const useServiceGrants = () => {
  const [serviceGrants, setServiceGrants] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServiceGrants = async () => {
      try {
        setLoading(true);
        setError("");
        const grants = await getServiceGrants();
        setServiceGrants(grants);
      } catch (err) {
        console.error("Failed to fetch service grants:", err);
        setError("Failed to load allowed services.");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceGrants();
  }, []);

  return { serviceGrants, loading, error };
};
