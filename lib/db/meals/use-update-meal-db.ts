import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Meal, MealFormData, MealFormDataUpdate } from "@/types";

export function useUpdateMealDB() {
  const updateMealDB = useMutation(api.mutations.updateMeal.updateMeal);

  const updateMeal = async (data: MealFormDataUpdate) => {
    await updateMealDB(data);
  };

  return { updateMeal };
}
