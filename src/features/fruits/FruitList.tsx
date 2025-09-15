import { useState } from "react";
import type { Fruit } from "./Fruit.type";
import { FruitItem } from "./FruitItem";
import { FruitForm } from "./FruitForm";
import { AppHeader } from "../../components/AppHeader";

export function FruitList() {
  const initialFruits: Fruit[] = [
    { id: "1", name: "Apple", isSelected: false },
    { id: "2", name: "Orange", isSelected: true },
  ];

  const [fruits, setFruits] = useState<Fruit[]>(initialFruits);
  const [searchKey, setSearchKey] = useState("");
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);

  const toggleSelection = (id: string) => {
    setFruits((prev) =>
      prev.map((fruit) =>
        fruit.id === id ? { ...fruit, isSelected: !fruit.isSelected } : fruit
      )
    );
  };

  const addNewFruit = (name: string) => {
    const title = name.trim();

    if (!title) {
      return;
    }

    setFruits((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: title, isSelected: true },
    ]);
  };

  const deleteFruit = (id: string) => {
    setFruits((prev) => prev.filter((fruit) => fruit.id !== id));
  };

  const isVisible = (fruit: Fruit, key: string) =>
    fruit.name.toLowerCase().includes(key.toLowerCase());

  const visibleFruits = fruits.filter(
    (fruit) =>
      isVisible(fruit, searchKey) && (!showSelectedOnly || fruit.isSelected)
  );

  const allVisibleSelected =
    visibleFruits.length > 0 && visibleFruits.every((f) => f.isSelected);

  const toggleSelectAll = (checked: boolean) => {
    setFruits((prev) =>
      prev.map((f) =>
        isVisible(f, searchKey) &&
        (!showSelectedOnly || f.isSelected || checked)
          ? { ...f, isSelected: checked }
          : f
      )
    );
  };

  return (
    <>
      <div className="space-y-5">
        <div>
          <AppHeader />

          <div className="space-y-1.5">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
              <input
                className="input w-full"
                id="searchField"
                name="searchField"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                placeholder="Search for fruit"
              />
            </div>

            <div className="flex items-center space-x-1.5">
              <input
                className="checkbox"
                type="checkbox"
                id="selectedOnly"
                name="selectedOnly"
                onChange={(event) => setShowSelectedOnly(event.target.checked)}
              ></input>
              <label htmlFor="selectedOnly">Show selected only</label>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center">
            <input
              className="checkbox"
              type="checkbox"
              id="selectAll"
              name="selectAll"
              checked={allVisibleSelected}
              onChange={(event) => toggleSelectAll(event.target.checked)}
            ></input>

            <label htmlFor="selectAll">Select all</label>
          </div>

          <ul className="px-0">
            {visibleFruits.map((fruit) => (
              <li key={fruit.id} className="flex px-[5px] py-[5px]">
                <FruitItem
                  key={fruit.id}
                  fruit={fruit}
                  onSelect={toggleSelection}
                  onDelete={deleteFruit}
                ></FruitItem>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="divider" />
      <FruitForm onFormSubmit={addNewFruit}></FruitForm>
    </>
  );
}
