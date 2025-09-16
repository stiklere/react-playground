import type { Fruit } from "../features/fruits/Fruit.type";

const API_BASE = import.meta.env.DEV
  ? "/fruits/all"
  : `${import.meta.env.BASE_URL}data/fruits.json`;

export async function getAllFruits(signal?: AbortSignal): Promise<Fruit[]> {
  const res = await fetch(API_BASE, {
    signal,
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`);
  }

  const apiData: { name: string }[] = await res.json();

  return apiData.map(({ name }) => ({
    id: crypto.randomUUID(),
    name,
    isSelected: false,
  }));
}
