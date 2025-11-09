"use client";

import { useParams } from "next/navigation";

//import { meals, ingredients } from "../../../mock-data";
import "../Recipes.css";
import { Ingredient, Meal } from "@/types";
import { useRecipe } from "@/lib/db/recipes";
import { useAllIngredientsDB } from "@/lib/db/ingredients";

export default function RecipeDetail() {
  const params = useParams();
  const id = params.id as string;



  const recipe: Meal | null = useRecipe(id)
  const ingredients: Ingredient[] | undefined = useAllIngredientsDB()

   const recipeIngredients = recipe?.ingredients.map((ing) => {
    const ingredient = ingredients?.find((i) => i._id === ing.ingredientId);
    return `${ingredient?.name} – ${ing.amount} ${ingredient?.unit}`;
  });


  if (!recipe || !recipeIngredients) {
    return <p>Omlouváme se, nepodařilo se načíst recept.</p>;
  }

  return (
    <main className="recipe-detail">
      { (recipe && recipeIngredients) ? (
        <>
      <h2>{recipe.name}</h2>
     
      {recipe.picture ? (
        <img
          src={recipe.picture}
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
      </>) : <p>Omlouváme se, nepodařilo se načíst recept.</p> }
    </main>
  );
}
