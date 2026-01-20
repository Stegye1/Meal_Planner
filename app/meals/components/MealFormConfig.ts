import { MealFormData, MealType } from "@/types";

export const defaultMeal: MealFormData = {
  name: "",
  types: [],
  servings: 1,
  pictureStorageId: undefined,
  ingredients: [],
  nutrients: {
    kcal: 0,
    fat: 0,
    carbohydrates: 0,
    protein: 0,
    sugar: 0,
    fiber: 0,
  },
  preparation: {
    firstStep: "",
    secondStep: "",
    thirdStep: "",
    fourthStep: "",
  },
};

export const mealTypes: { label: string; value: MealType }[] = [
  { label: "Snídaně", value: "breakfast" },
  { label: "Oběd", value: "lunch" },
  { label: "Večeře", value: "dinner" },
];
