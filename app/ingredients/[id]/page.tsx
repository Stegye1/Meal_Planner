"use client";

import "../../recipes/Recipes.css";
import { Ingredient } from "@/types";

import { useIngredientId } from "../hooks/useIntredientId";
import { IngredientDetail } from "./components/IngredientDetail";
import { IngredientDetailActions } from "./components/IngredientDetailActions";
import { useGetIngredientDB } from "@/lib/db/ingredients/use-get-ingredient-db";


export default function RecipeDetail() {
  const { id } = useIngredientId();

  const ingredient: Ingredient | null = useGetIngredientDB(id);

  return (
    <main className="recipe-detail">
      {ingredient ? (
        <IngredientDetail ingredient={ingredient} />
      ) : (
        <p>Omlouváme se, nepodařilo se načíst ingredienci.</p>
      )}
      {id && <IngredientDetailActions ingredientId={id} />}
    </main>
  );
}
