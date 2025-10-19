import { Link } from "react-router-dom";
import { Meal } from "../types";

type Props = {
  meal: Meal;
};

export function RecipeCard({ meal }: Props) {
  return (
    <Link to={`/recipes/${meal.id}`} className="recipe-card">
      {meal.imageUrl ? (
        <img src={meal.imageUrl} alt={meal.name} className="recipe-img" />
      ) : (
        <div className="recipe-img-empty">Chybí obrázek</div>
      )}

      <h3 className="recipe-title">{meal.name}</h3>
    </Link>
  );
}