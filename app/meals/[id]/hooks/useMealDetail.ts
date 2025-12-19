"use client";

import { useMemo } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useGetImageUrlDB } from "@/lib/db/images/use-get-image-url-db";
import { useGetAllIngredientsDB } from "@/lib/db/ingredients/use-get-all-ingredients-db";
import { useGetMealDB } from "@/lib/db/meals/use-get-meal-db";
import { Ingredient, Meal } from "@/types";
import { useMealIngredients } from "./useMealIngredients";

export function useMealDetail(mealId: Id<"meals">) {
  const meal: Meal | null = useGetMealDB(mealId);
  const ingredients: Ingredient[] | null = useGetAllIngredientsDB();
  const storageId = meal?.pictureStorageId as Id<"_storage">;
  const imageUrl: string | null = useGetImageUrlDB(storageId);

  const mealIngredients: string[] = useMealIngredients(ingredients, meal);
  const isLoading = !meal || !ingredients;

  return { meal, mealIngredients, imageUrl, isLoading };
}
