import { useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

export function useIngredientNavigation() {
  const router = useRouter();

  const goToDetail = (id: Id<"ingredients">) => {
    router.push(`/ingredients/${id}`);
  };

  return { goToDetail };
}