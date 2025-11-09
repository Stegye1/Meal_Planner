"use client";

import { useAllRecipesDB } from "@/lib/db/recipes";
import { RecipeCard } from "../../components/RecipeCard";
import { Meal } from "../types";
//import { meals } from "../../mock-data";
import "./Recipes.css";

export default function Recipes() {

  const recipes:Meal[] | null = useAllRecipesDB()

  return (
    <main className="recipes-page">
      <h1>Recepty</h1>
      <p className="recipes-intro">
        Zde najdete všechny recepty z databáze. Později přidáme vyhledávání a
        filtrování podle typu jídla.
      </p>
{recipes ? (
      <div className="recipes-grid">
        {recipes.map((meal) => (
          <RecipeCard key={meal._id} meal={meal} />
        ))}
      </div> ) : <p>Omlouváme se, nepodařilo se načíst recepty.</p> }
    </main>
  );
}
