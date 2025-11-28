import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export function useGetIngredientDB(id: Id<"ingredients"> | null) {
  const ingredient = useQuery(api.queries.getIngredient.getIngredient, id ? { id } : "skip");
  if (!ingredient) return null;
  return ingredient;
}
