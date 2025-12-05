"use client";

import { useGetIngredientDB } from "@/lib/db/ingredients/use-get-ingredient-db";
import { Ingredient } from "@/types";
import "../../meals/Meals.css";
import { useIngredientId } from "../hooks/useIntredientId";
import { IngredientDetail } from "./components/IngredientDetail";
import { IngredientDetailActions } from "./components/IngredientDetailActions";

export default function IngredientDetailPage() {
  const { id } = useIngredientId();

  const ingredient: Ingredient | null = useGetIngredientDB(id);

  return (
    <main className="meal-detail">
      {ingredient ? (
        <IngredientDetail ingredient={ingredient} />
      ) : (
        <p>Omlouváme se, nepodařilo se načíst ingredienci.</p>
      )}
      {id && <IngredientDetailActions ingredientId={id} />}
    </main>
  );
}
