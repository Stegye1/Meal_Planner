import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Meal } from "@/types";

export function useAddMealDB() {
  const addMealDB = useMutation(api.mutations.addMeal.addMeal);
  const addMeal = async (data: Omit<Meal, "_id">) => {
    await addMealDB(data);
  };

  return { addMeal };
}
