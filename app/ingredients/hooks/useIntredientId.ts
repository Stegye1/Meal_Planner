import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

export function useIngredientId() {
  const params = useParams();
  const id = params.id as Id<"ingredients"> | null;

  return { id };
}
