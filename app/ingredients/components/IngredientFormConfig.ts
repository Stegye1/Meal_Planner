import { IngredientFormData } from "./types";

export const defaultIngredient: IngredientFormData = {
  name: "",
  unit: "g",
  altUnits: [],
  nutrients: {
    kcal: undefined,
    protein: undefined,
    fat: undefined,
    carbohydrates: undefined,
    sugar: undefined,
    fiber: undefined,
  },
};

export const altUnitNameOptions = ["lžíce", "lžička", "špetka", "hrnek", "ks"] as const;
