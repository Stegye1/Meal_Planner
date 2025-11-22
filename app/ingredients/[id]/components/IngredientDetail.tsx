import { Ingredient } from "@/types";

type Props = {
  ingredient: Ingredient;
};
export function IngredientDetail({ ingredient }: Props) {
  return (
    <>
      <h2>{ingredient.name}</h2>

      <p>Měříme v {ingredient.unit}</p>

      <h3>Nutriční hodnoty:</h3>
    </>
  );
}
