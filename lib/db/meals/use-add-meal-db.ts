import { api } from "@/convex/_generated/api";
import { MealInput } from "@/types";
import { useMutation } from "convex/react";

// neřeší obrázek jako file, dostává jeho storageId
export function useAddMealDB() {
  const addMealDB = useMutation(api.mutations.addMeal.addMeal);

  // Žádný upload tady – jen předání dat
  const addMeal = async (data: MealInput) => {
    await addMealDB(data);
  };

  return { addMeal };
}