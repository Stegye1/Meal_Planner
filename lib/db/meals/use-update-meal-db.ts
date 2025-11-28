import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Meal } from "@/types";

export function useUpdateMealDB() {
  const updateMealDB = useMutation(api.mutations.updateMeal.updateMeal);

  const updateMeal = async (data: Meal) => {
    await updateMealDB(data);
  };

  return { updateMeal };
}
