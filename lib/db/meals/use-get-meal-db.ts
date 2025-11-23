import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

export function useGetMealDB(id: Id<"meals"> | null) {
  const meal = useQuery(
    api.queries.getMeal.getMeal,
    id ? { id } : "skip"
  );
 
  if (!meal) return null;

  return meal // obsahuje storageId obrázku, až když je chceme zobrazit získáme url pomocí useImageUrl
  
}