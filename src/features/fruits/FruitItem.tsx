import type { Fruit } from "./Fruit.type";

type FruitItemProps = {
  fruit: Fruit;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
};

export function FruitItem({ fruit, onSelect, onDelete }: FruitItemProps) {
  return (
    <>
      <span
        style={{
          textDecoration: fruit.isSelected ? "underline" : "none",
          padding: "5px",
        }}
      >
        {fruit.name}
      </span>

      <div style={{ display: "flex", gap: "5px" }}>
        <button onClick={() => onSelect(fruit.id)}>
          {fruit.isSelected ? "Unselect" : "Select"}
        </button>

        {!fruit.isSelected && (
          <button onClick={() => onDelete(fruit.id)}>Delete fruit</button>
        )}
      </div>
    </>
  );
}
