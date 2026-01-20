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
      {ingredient.altUnits
        .map((u) => `${u.name} (=${u.unitsPerAltUnit} ${ingredient.unit})`)
        .join(", ")}
    </>
  )}
</p>    
     <h3>Nutrienty na 100 g:</h3>
      <ul><li key={"kcal"}>kcal: {ingredient.nutrients.kcal.toFixed(2)} g</li>
      <li key={"protein"}>bílkoviny: {ingredient.nutrients.protein.toFixed(2)} g</li>
      <li key={"carbohydrates"}>sacharidy: {ingredient.nutrients.carbohydrates.toFixed(2)} g</li>
       <li key={"sugar"}>z toho cukry: {ingredient.nutrients.sugar.toFixed(2)} g</li>
      <li key={"fat"}>tuky: {ingredient.nutrients.fat.toFixed(2)} g</li>
      <li key={"fiber"}>vláknina: {ingredient.nutrients.fiber.toFixed(2)} g</li>
      </ul>
    </>
  );
}
