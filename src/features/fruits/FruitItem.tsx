import type { Fruit } from "./Fruit.type";

type FruitItemProps = {
  fruit: Fruit;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
};

export function FruitItem({ fruit, onSelect, onDelete }: FruitItemProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="fruit-item px-0 py-0">
        <span className={fruit.isSelected ? "fruit-item-selected" : ""}>
          {fruit.name}
        </span>
      </div>

      <div className="space-x-1.5">
        <button className="btn btn-primary" onClick={() => onSelect(fruit.id)}>
          {fruit.isSelected ? "Unselect" : "Select"}
        </button>

        {!fruit.isSelected && (
          <button className="btn btn-danger" onClick={() => onDelete(fruit.id)}>
            Delete fruit
          </button>
        )}
      </div>
    </div>
  );
}
