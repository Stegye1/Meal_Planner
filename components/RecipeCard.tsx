import type { Meal } from "../app/types"

type Props = {
  meal: Meal;
};

export function RecipeCard({ meal }: Props) {
  return (
    <a href={`/recipes/${meal.id}`} className="recipe-card">
      {meal.imageUrl ? (
        <img src={meal.imageUrl} alt={meal.name} className="recipe-img" />
      ) : (
        <div className="recipe-img-empty">Chybí obrázek</div>
      )}

      <h3 className="recipe-title">{meal.name}</h3>
    </a>
  );
}