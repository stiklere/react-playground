import { useState } from "react";

type FruitFormProps = {
  onFormSubmit: (newFruitName: string) => void;
};

export function FruitForm({ onFormSubmit }: FruitFormProps) {
  const [newFruitName, setNewFruitName] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newFruitName.trim()) return;
    onFormSubmit(newFruitName.trim());
    setNewFruitName("");
  };

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
      style={{ marginTop: 16 }}
    >
      <h4>Add new fruit</h4>
      <label htmlFor="newFruit">Enter new fruit</label>{" "}
      <input
        id="newFruit"
        name="newFruit"
        value={newFruitName}
        onChange={(e) => setNewFruitName(e.target.value)}
        placeholder="e.g. Banana"
      />
      <button type="submit" disabled={!newFruitName.trim()}>
        Add
      </button>
    </form>
  );
}
