import type { Fruit } from "../features/fruits/Fruit.type";

const API_BASE = import.meta.env.DEV
  ? "/fruits"
  : "https://www.fruityvice.com/api/fruit";

export async function getAllFruits(signal?: AbortSignal): Promise<Fruit[]> {
  const res = await fetch(`${API_BASE}/all`, {
    signal,
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }

  const apiData: { name: string }[] = await res.json();

  return apiData.map(({ name }) => ({
    id: name.toLowerCase().replace(/\s+/g, "-"),
    name,
    isSelected: false,
  }));
}
