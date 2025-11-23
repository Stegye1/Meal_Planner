import { api } from "@/convex/_generated/api";
import { Meal } from "@/types";
import { useMutation } from "convex/react";

export function useUpdateMealDB() {
  const updateMealDB = useMutation(api.mutations.updateMeal.updateMeal);

  const updateMeal = async (data: Meal) => {
    await updateMealDB(data);
  };

  return { updateMeal };
}