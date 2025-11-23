import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export function useGetAllMealsDB() {
  const meals = useQuery(api.queries.getAllMeals.getAllMeals);
  if (!meals) return null;

  return meals; // recepty se vrací se storageId obrázku, až když je chceme zobrazit získáme url pomocí useImageUrl
}
