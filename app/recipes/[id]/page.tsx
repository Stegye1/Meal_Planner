"use client";

import { useParams } from "next/navigation";

//import { meals, ingredients } from "../../../mock-data";
import "../Recipes.css";
import { Ingredient, Meal } from "@/types";

import { useGetAllIngredientsDB } from "@/lib/db/ingredients";
import { useGetRecipeDB } from "@/lib/db/recipes";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";


export default function RecipeDetail() {
  const params = useParams();
  const id = params.id as Id<"meals">;



  const recipe: Meal | null = useGetRecipeDB(id)
  const ingredients: Ingredient[] | null = useGetAllIngredientsDB()

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
     
      {recipe.pictureUrl ? (
        <img
          src={recipe.pictureUrl}
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

      
      <Link className="button" href={`/recipes/${id}/change-recipe`}>
        Upravit
      </Link>
    </main>
  );
}
