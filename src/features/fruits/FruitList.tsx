import { useState } from "react";
import type { Fruit } from "./Fruit.type";
import { FruitItem } from "./FruitItem";
import { FruitForm } from "./FruitForm";

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
      <div>
        <h4>Search for fruit</h4>
        <input
          id="searchField"
          name="searchField"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="Enter fruit name"
        />

        <label htmlFor="selectedOnly">Show selected only</label>
        <input
          type="checkbox"
          id="selectedOnly"
          name="selectedOnly"
          onChange={(event) => setShowSelectedOnly(event.target.checked)}
        ></input>
      </div>

      <div>
        <label htmlFor="selectAll">Select all</label>
        <input
          type="checkbox"
          id="selectAll"
          name="selectAll"
          checked={allVisibleSelected}
          onChange={(event) => toggleSelectAll(event.target.checked)}
        ></input>

        <ul>
          {visibleFruits.map((fruit) => (
            <li key={fruit.id} style={{ display: "flex", padding: "5px" }}>
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
      <FruitForm onFormSubmit={addNewFruit}></FruitForm>
    </>
  );
}
