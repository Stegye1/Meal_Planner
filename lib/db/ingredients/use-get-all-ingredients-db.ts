import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function useGetAllIngredientsDB() {
  const ingredients = useQuery(api.queries.getAllIngredients.getAllIngredients, {});
  if (!ingredients) return null;
  return ingredients;
}
