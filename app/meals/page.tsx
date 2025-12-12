"use client";

import Link from "next/link";
import { useGetAllIngredientsDB } from "@/lib/db/ingredients/use-get-all-ingredients-db";
import { useGetAllMealsDB } from "@/lib/db/meals/use-get-all-meals-db";
import { Ingredient, Meal } from "@/types";
//import { meals } from "../../mock-data";
import "./Meals.css";
import { MealCard } from "./components/MealCard";
import { Header } from "../layout/components/Header";

export default function MealsPage() {
  const meals: Meal[] | null = useGetAllMealsDB();
  const ingredients: Ingredient[] | null = useGetAllIngredientsDB();

  return (
    <>
      <Header       
        actions={<><Link className="nav-action" href="/meals/new-meal">Přidat jídlo</Link> <Link className="nav-action" href="/ingredients/new-ingredient/">
          Přidat ingredienci
        </Link></>}
      />
    <main className="meals-page">
      <h1>Recepty</h1>
      <p className="meals-intro">
        Zde najdete všechny recepty z databáze. Později přidáme vyhledávání a filtrování podle typu jídla.
      </p>
      {meals ? (
        <div className="meals-grid">
          {meals.map((meal) => (
            <MealCard key={meal._id} meal={meal} />
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
    </>
  );
}
