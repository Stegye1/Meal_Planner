import { useCallback } from "react";

export interface Nutrients {
  kcal: number;
  fat: number;
  carbohydrates: number;
  protein: number;
  sugar: number;
  fiber: number;
}

const ZERO_NUTRIENTS: Nutrients = {
  kcal: 0,
  fat: 0,
  carbohydrates: 0,
  protein: 0,
  sugar: 0,
  fiber: 0,
};

export const useCalculateNutrients = (ingredients: any[], allIngredients: any[], servings: number) => {
  const nutrients = (() => {
    if (!allIngredients?.length || !ingredients?.length) {
      return ZERO_NUTRIENTS;
    }

    const totalNutrients = ingredients.reduce((totals, ing) => {
      const ingredient = allIngredients.find((i) => i._id === ing.ingredientId);
      if (!ingredient || !ing.amount) return totals;

      let amountInUnits = ing.amount;
      if (ing.altUnitIndex !== undefined && ingredient.altUnits) {
        const altUnit = ingredient.altUnits[ing.altUnitIndex];
        if (altUnit) amountInUnits = ing.amount * altUnit.unitsPerAltUnit;
      }

      return {
        kcal: totals.kcal + (amountInUnits * ingredient.nutrients.kcal) / 100,
        fat: totals.fat + (amountInUnits * ingredient.nutrients.fat) / 100,
        carbohydrates: totals.carbohydrates + (amountInUnits * ingredient.nutrients.carbohydrates) / 100,
        protein: totals.protein + (amountInUnits * ingredient.nutrients.protein) / 100,
        sugar: totals.sugar + (amountInUnits * ingredient.nutrients.sugar) / 100,
        fiber: totals.fiber + (amountInUnits * ingredient.nutrients.fiber) / 100,
      };
    }, ZERO_NUTRIENTS);

    return servings > 0
      ? {
          kcal: totalNutrients.kcal / servings,
          fat: totalNutrients.fat / servings,
          carbohydrates: totalNutrients.carbohydrates / servings,
          protein: totalNutrients.protein / servings,
          sugar: totalNutrients.sugar / servings,
          fiber: totalNutrients.fiber / servings,
        }
      : ZERO_NUTRIENTS;
  })();

  const isReady = Boolean(allIngredients?.length);

  return { nutrients, isReady };
};
