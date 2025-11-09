import { useImageUrl } from "@/lib/db/recipes";
import type { Meal } from "../app/types"
import { Id } from "@/convex/_generated/dataModel";

type Props = {
  meal: Meal;
};

export function RecipeCard({ meal }: Props) {

  const storageId = meal?.picture as Id<"_storage">
const imageUrl = useImageUrl(storageId);
console.log("imageUrl: ", imageUrl)

  return (
    <a href={`/recipes/${meal._id}`} className="recipe-card">
      {meal.picture ? (
        <img src={imageUrl} alt={meal.name} className="recipe-img" />
      ) : (
        <div className="recipe-img-empty">Chybí obrázek</div>
      )}

      <h3 className="recipe-title">{meal.name}</h3>
    </a>
  );
}