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

      <p>
        <strong>Typ jídla:</strong> {meal.types.join(", ")}
      </p>
      <p>
        <strong>Porce:</strong> {meal.servings}
      </p>

      <h3>Ingredience:</h3>
      <ul>{mealIngredients && mealIngredients.map((item, i) => <li key={i}>{item}</li>)}</ul>

      <h3>Postup:</h3>
      <p>{meal.preparation.firstStep}</p>
      <p>{meal.preparation.secondStep}</p>
      <p>{meal.preparation.thirdStep}</p>
      <p>{meal.preparation.fourthStep}</p>
    </>
  );
}
