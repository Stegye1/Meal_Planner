import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export function useGetAllIngredientsDB() {
  const ingredients = useQuery(api.queries.getAllIngredients.getAllIngredients, {})
if (!ingredients) return null;
  return ingredients
}