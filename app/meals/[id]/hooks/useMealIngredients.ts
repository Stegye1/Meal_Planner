import { useMemo } from "react";
import { Ingredient, Meal } from "@/types";

export function useMealIngredients(ingredients: Ingredient[] | null, meal: Meal | null): string[] {
  const mealIngredients = useMemo((): string[] => {
    if (!meal?.ingredients?.length || !ingredients?.length) return [];
    return meal.ingredients
      .map((ing) => {
        const ingredient = ingredients.find((i) => i._id === ing.ingredientId);

        if (!ingredient) return null;

        let displayUnit: string = ingredient.unit || "";
        const displayAmount = ing.amount;

        if (ing.altUnitIndex !== undefined && ingredient.altUnits) {
          const altUnit = ingredient.altUnits[ing.altUnitIndex];
          if (altUnit) {
            displayUnit = ` x ${altUnit.name}`;
          }
        }

        return `${ingredient.name} - ${displayAmount} ${displayUnit}`;
      })
      .filter((item): item is string => item !== null);
  }, [meal?.ingredients, ingredients]);

  return mealIngredients;
}
