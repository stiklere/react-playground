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
    >
      <h4 className="heading-4">Add new fruit</h4>
      <div className="w-full max-w-xs space-y-1.5 sm:max-w-sm md:max-w-md">
        <input
          className="input"
          id="newFruit"
          name="newFruit"
          value={newFruitName}
          onChange={(event) => setNewFruitName(event.target.value)}
          placeholder="Enter new fruit e.g. Banana"
        />
        <button
          type="submit"
          disabled={!newFruitName.trim()}
          className="btn btn-primary"
        >
          Add
        </button>
      </div>
    </form>
  );
}
