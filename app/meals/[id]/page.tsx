"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useGetImageUrlDB } from "@/lib/db/images/use-get-image-url-db";
import { useGetAllIngredientsDB } from "@/lib/db/ingredients/use-get-all-ingredients-db";
import { useGetMealDB } from "@/lib/db/meals/use-get-meal-db";
import { Ingredient, Meal } from "@/types";
//import { meals, ingredients } from "../../../mock-data";
import "../Meals.css";

export default function MealDetailPage() {
  const params = useParams();
  const id = params.id as Id<"meals">;

  const meal: Meal | null = useGetMealDB(id);
  const ingredients: Ingredient[] | null = useGetAllIngredientsDB();

  const storageId = meal?.pictureStorageId as Id<"_storage">;
  const imageUrl = useGetImageUrlDB(storageId);

  const mealIngredients = meal?.ingredients.map((ing) => {
    const ingredient = ingredients?.find((i) => i._id === ing.ingredientId);
    return `${ingredient?.name} - ${ing.amount} ${ingredient?.unit}`;
  });

  if (!meal || !mealIngredients) {
    return <p>Omlouváme se, nepodařilo se načíst recept.</p>;
  }

  return (
    <main className="meal-detail">
      {meal && mealIngredients ? (
        <>
          <h2>{meal.name}</h2>

          {imageUrl ? (
            <img src={imageUrl} alt={meal.name} className="meal-img-detail" />
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
          <ul>
            {mealIngredients.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3>Postup:</h3>
          <p>{meal.preparation.firstStep}</p>
          <p>{meal.preparation.secondStep}</p>
          <p>{meal.preparation.thirdStep}</p>
          <p>{meal.preparation.fourthStep}</p>
        </>
      ) : (
        <p>Omlouváme se, nepodařilo se načíst recept.</p>
      )}

      <Link className="button" href={`/meals/${id}/change-meal`}>
        Upravit
      </Link>
    </main>
  );
}
