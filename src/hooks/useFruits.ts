import { useEffect, useState } from "react";
import { getAllFruits } from "../services/fruityvice";
import type { Fruit } from "../features/fruits/Fruit.type";

export function useFruits() {
  const [data, setData] = useState<Fruit[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllFruits()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
