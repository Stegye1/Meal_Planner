import Image from "next/image";
import { Meal } from "@/types";

type Props = {
  meal: Meal;
  imageUrl: string | null;
  mealIngredients: string[] | null;
};

export default function MealDetail({ meal, imageUrl, mealIngredients }: Props) {
  return (
    <>
      <h2>{meal.name}</h2>

      {imageUrl ? (
        <Image src={imageUrl} alt={meal.name} className="meal-img-detail" height={800} width={600} />
      ) : (
        <div className="meal-img-empty">Chybí obrázek</div>
      )}
<div className="meal-info-grid">
  <div>
     
      <p>
        <strong>Porce:</strong> {meal.servings}
      </p>
         <h3>Ingredience:</h3>
      <ul>{mealIngredients && mealIngredients.map((item, i) => <li key={i}>{item}</li>)}</ul>
      </div>

<div>
      <p>
        <strong>Typ jídla:</strong> {meal.types.join(", ")}
      </p>
            <h3>Nutrienty na 1 porci:</h3>
      <ul><li key={"kcal"}>kcal: {meal.nutrients.kcal.toFixed(2)} g</li>
      <li key={"protein"}>protein: {meal.nutrients.protein.toFixed(2)} g</li>
      <li key={"carbohydrates"}>sacharidy: {meal.nutrients.carbohydrates.toFixed(2)} g</li>
      <li key={"sugar"}>z toho cukry: {meal.nutrients.sugar.toFixed(2)} g</li>
      <li key={"fat"}>tuky: {meal.nutrients.fat.toFixed(2)} g</li>
      <li key={"fiber"}>vláknina: {meal.nutrients.fiber.toFixed(2)} g</li>
      </ul>
      </div>
      </div>

      <h3>Postup:</h3>
      <p>{meal.preparation.firstStep}</p>
      <p>{meal.preparation.secondStep}</p>
      <p>{meal.preparation.thirdStep}</p>
      <p>{meal.preparation.fourthStep}</p>
    </>
  );
}
