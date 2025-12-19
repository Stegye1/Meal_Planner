import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import type { Ingredient } from "@/types";
import { useState, useEffect } from "react";

export function useGetIngredientDB(id: Id<"ingredients"> | null) {
  const [error, setError] = useState<string | null>(null);

  let ingredient: Ingredient | null | undefined;
  try {
    ingredient = useQuery(api.queries.getIngredient.getIngredient, id ? { id } : "skip");
  } catch (err: any) {
    console.error("❌ Chyba v dotazu na ingredienci:", err);
    setError("Nastala chyba při načítání ingredience");
    ingredient = null;
  }

  const loading = id ? ingredient === undefined && !error : false;
  const notFound = id && ingredient === null && !error;

  return {
    data: ingredient as Ingredient | null,
    loading,
    error,
    notFound,
  };
}


// export function useGetIngredientDB(id: Id<"ingredients"> | null) {
//   const ingredient = useQuery(api.queries.getIngredient.getIngredient, id ? { id } : "skip");
//   if (!ingredient) return null;
//   return ingredient;
// }
