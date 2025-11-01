"use client";

import { useParams } from "next/navigation";

import { meals, ingredients } from "../../../mock-data";
import "../Recipes.css";

export default function RecipeDetail() {
  const params = useParams();
  const id = params.id;
  const recipe = meals.find((m) => m.id === id);

  if (!recipe) {
    return <p>Recept nebyl nalezen.</p>;
  }

  const recipeIngredients = recipe.ingredients.map((ing) => {
    const ingredient = ingredients.find((i) => i.id === ing.ingredientId);
    return `${ingredient?.name} – ${ing.amount} ${ingredient?.unit}`;
  });

  return (
    <main className="recipe-detail">
      <h2>{recipe.name}</h2>
      {recipe.imageUrl ? (
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="recipe-img-detail"
        />
      ) : (
        <div className="recipe-img-empty">Chybí obrázek</div>
      )}

      <p>
        <strong>Typ jídla:</strong> {recipe.types.join(", ")}
      </p>
      <p>
        <strong>Porce:</strong> {recipe.servings}
      </p>

      <h3>Ingredience:</h3>
      <ul>
        {recipeIngredients.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h3>Postup:</h3>
      <p>{recipe.preparation.firstStep}</p>
      <p>{recipe.preparation.secondStep}</p>
      <p>{recipe.preparation.thirdStep}</p>
      <p>{recipe.preparation.fourthStep}</p>
    </main>
  );
}
