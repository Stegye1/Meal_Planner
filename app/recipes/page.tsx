"use client";

import Link from "next/link";
import { useGetAllIngredientsDB } from "@/lib/db/ingredients/use-get-all-ingredients-db";
import { useGetAllMealsDB } from "@/lib/db/meals/use-get-all-meals-db";
import { Ingredient, Meal } from "@/types";
//import { meals } from "../../mock-data";
import "./Recipes.css";
import { RecipeCard } from "./components/RecipeCard";

export default function Recipes() {
  const recipes: Meal[] | null = useGetAllMealsDB();
  const ingredients: Ingredient[] | null = useGetAllIngredientsDB();

  return (
    <main className="recipes-page">
      <h1>Recepty</h1>
      <p className="recipes-intro">
        Zde najdete všechny recepty z databáze. Později přidáme vyhledávání a filtrování podle typu jídla.
      </p>
      {recipes ? (
        <div className="recipes-grid">
          {recipes.map((meal) => (
            <RecipeCard key={meal._id} meal={meal} />
          ))}
        </div>
      ) : (
        <p>Omlouváme se, nepodařilo se načíst recepty.</p>
      )}

      <h2 className="ingredients-h2">Ingredience</h2>
      {ingredients ? (
        <div className="ingredients-grid">
          {ingredients.map((ingr) => (
            <Link href={`/ingredients/${ingr._id}/`} key={ingr._id}>
              {ingr.name}
            </Link>
          ))}
        </div>
      ) : (
        <p>Omlouváme se, nepodařilo se načíst ingredience.</p>
      )}
    </main>
  );
}
