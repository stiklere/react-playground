import type { Fruit } from "./Fruit.type";

type FruitItemProps = {
  fruit: Fruit;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
};

export function FruitItem({ fruit, onSelect, onDelete }: FruitItemProps) {
  return (
    <>
      <div className="flex item-baseline space-x-1.5">
        <span
          className={`fruit-item ${fruit.isSelected && "fruit-item-selected"}`}
        >
          {fruit.name}
        </span>

        <div className="space-x-1.5">
          <button
            className="btn btn-primary"
            onClick={() => onSelect(fruit.id)}
          >
            {fruit.isSelected ? "Unselect" : "Select"}
          </button>

          {!fruit.isSelected && (
            <button
              className="btn btn-danger"
              onClick={() => onDelete(fruit.id)}
            >
              Delete fruit
            </button>
          )}
        </div>
      </div>
    </>
  );
}
