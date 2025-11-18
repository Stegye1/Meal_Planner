

import { Id } from "@/convex/_generated/dataModel";
import { useGetImageUrlDB } from "@/lib/db/recipes";
import { Meal } from "@/types";
import Link from "next/link";

type Props = {
  meal: Meal;
};

export function RecipeCard({ meal }: Props) {

  const storageId = meal?.picture as Id<"_storage">
const imageUrl = useGetImageUrlDB(storageId);


  return (
    <Link href={`/recipes/${meal._id}`} className="recipe-card">
      {imageUrl ? (
        <img src={imageUrl} alt={meal.name} className="recipe-img" />
      ) : (
        <div className="recipe-img-empty">Chybí obrázek</div>
      )}

      <h3 className="recipe-title">{meal.name}</h3>
    </Link>
  );
}