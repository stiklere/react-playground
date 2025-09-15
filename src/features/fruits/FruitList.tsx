import { useMemo, useCallback, useState } from "react";
import type { Fruit } from "./Fruit.type";
import { FruitItem } from "./FruitItem";
import { FruitForm } from "./FruitForm";
import { AppHeader } from "../../components/AppHeader";

const INITIAL_FRUITS: Fruit[] = [
  { id: "1", name: "Apple", isSelected: false },
  { id: "2", name: "Orange", isSelected: true },
];

export function FruitList() {
  const [fruits, setFruits] = useState<Fruit[]>(INITIAL_FRUITS);
  const [searchKey, setSearchKey] = useState("");
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);

  const normalizedKey = searchKey.trim().toLowerCase();
  const matches = useCallback(
    (fruit: Fruit) => fruit.name.toLowerCase().includes(normalizedKey),
    [normalizedKey],
  );

  const visibleFruits = useMemo(
    () =>
      fruits.filter(
        (fruit) => matches(fruit) && (!showSelectedOnly || fruit.isSelected),
      ),
    [fruits, matches, showSelectedOnly],
  );

  const allVisibleSelected = useMemo(
    () => visibleFruits.length > 0 && visibleFruits.every((f) => f.isSelected),
    [visibleFruits],
  );

  const toggleSelection = useCallback((id: string) => {
    setFruits((prev) =>
      prev.map((fruit) =>
        fruit.id === id ? { ...fruit, isSelected: !fruit.isSelected } : fruit,
      ),
    );
  }, []);

  const addNewFruit = useCallback((name: string) => {
    const title = name.trim();
    if (!title) {
      return;
    }

    setFruits((prev) => {
      if (prev.some((f) => f.name.toLowerCase() === title.toLowerCase())) {
        return prev;
      }
      return [
        ...prev,
        { id: crypto.randomUUID(), name: title, isSelected: true },
      ];
    });
  }, []);

  const deleteFruit = useCallback((id: string) => {
    setFruits((prev) => prev.filter((fruit) => fruit.id !== id));
  }, []);

  const setAllVisible = useCallback(
    (checked: boolean) => {
      setFruits((prev) =>
        prev.map((fruit) =>
          matches(fruit) && (!showSelectedOnly || fruit.isSelected || checked)
            ? { ...fruit, isSelected: checked }
            : fruit,
        ),
      );
    },
    [matches, showSelectedOnly],
  );

  const handleToggleAll = useCallback(() => {
    setAllVisible(!allVisibleSelected);
  }, [allVisibleSelected, setAllVisible]);

  return (
    <>
      <div className="space-y-5">
        <AppHeader />

        <div className="space-y-1.5">
          <div>
            <input
              className="input w-full"
              id="searchField"
              name="searchField"
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              placeholder="Search for fruit"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <input
              className="checkbox"
              type="checkbox"
              id="selectedOnly"
              name="selectedOnly"
              checked={showSelectedOnly}
              onChange={(e) => setShowSelectedOnly(e.target.checked)}
            />
            <label htmlFor="selectedOnly">Show selected only</label>
          </div>
        </div>

        <div className="flex justify-end">
          {visibleFruits.length !== 0 && (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleToggleAll}
            >
              {allVisibleSelected ? "Deselect all fruits" : "Select all fruits"}
            </button>
          )}
        </div>

        {visibleFruits.length === 0 ? (
          <p className="text-sm text-slate-600">No fruits match your search.</p>
        ) : (
          <ul className="m-0 list-none p-0">
            {visibleFruits.map((fruit) => (
              <li key={fruit.id} className="flex py-1.5">
                <FruitItem
                  fruit={fruit}
                  onSelect={toggleSelection}
                  onDelete={deleteFruit}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <hr className="divider" />

      <FruitForm onFormSubmit={addNewFruit} />
    </>
  );
}
