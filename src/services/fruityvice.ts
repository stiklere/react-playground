import type { Fruit } from "../features/fruits/Fruit.type";

export async function getAllFruits(): Promise<Fruit[]> {
  const res = await fetch("/fruits/all");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const apiData: { name: string }[] = await res.json();

  return apiData.map((item) => ({
    id: crypto.randomUUID(),
    name: item.name,
    isSelected: false,
  }));
}
