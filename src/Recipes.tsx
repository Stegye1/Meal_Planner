import { RecipeCard } from "./components/RecipeCard";
import { meals } from "./mockData";
import "./Recipes.css";


export function Recipes() {
  return (
    <main className="recipes-page">
      <h1>Recepty</h1>
      <p className="recipes-intro">
        Zde najdete všechny recepty z databáze. Později přidáme vyhledávání a filtrování podle typu jídla.
      </p>

      <div className="recipes-grid">
        {meals.map((meal) => (
          <RecipeCard key={meal.id} meal={meal} />
        ))}
      </div>
    </main>
  );
}

