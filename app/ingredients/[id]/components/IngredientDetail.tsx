import NutrientsTable from "@/app/meals/[id]/components/NutrientsTable";
import { Ingredient } from "@/types";

type Props = {
  ingredient: Ingredient;
};
export function IngredientDetail({ ingredient }: Props) {
  return (
    <>
      <h2>{ingredient.name}</h2>

      <p>
        Měříme v {ingredient.unit}
        {ingredient.altUnits && ingredient.altUnits.length > 0 && (
          <>
            {", "}alternativně{" "}
            {ingredient.altUnits.map((u) => `${u.name} (=${u.unitsPerAltUnit} ${ingredient.unit})`).join(", ")}
          </>
        )}
      </p>
      <NutrientsTable nutrients={ingredient.nutrients} title={`100 ${ingredient.unit}`} />
    </>
  );
}
