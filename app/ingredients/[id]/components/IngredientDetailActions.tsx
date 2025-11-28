import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";

type Props = {
  ingredientId: Id<"ingredients">;
};

export function IngredientDetailActions({ ingredientId }: Props) {
  return (
    <Link className="button" href={`/ingredients/${ingredientId}/change-ingredient`}>
      Upravit
    </Link>
  );
}
