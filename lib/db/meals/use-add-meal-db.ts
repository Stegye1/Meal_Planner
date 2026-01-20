import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Meal, MealFormDataNew } from "@/types";

export function useAddMealDB() {
  const addMealDB = useMutation(api.mutations.addMeal.addMeal);
  const addMeal = async (data: MealFormDataNew) => {
    await addMealDB(data);
  };

  return { addMeal };
}
