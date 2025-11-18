"use client";

import { useParams } from "next/navigation";

//import { meals, ingredients } from "../../../mock-data";
import "../../recipes/Recipes.css";
import { Ingredient } from "@/types";
import { useGetIngredientDB } from "@/lib/db/ingredients";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";

export default function RecipeDetail() {
  const params = useParams();
  const id = params.id as Id<"ingredients">;

  const ingredient: Ingredient | null = useGetIngredientDB(id);

  return (
    <main className="recipe-detail">
      {ingredient ? (
        <>
          <h2>{ingredient.name}</h2>

          <p>Měříme v {ingredient.unit}</p>

          <h3>Nutriční hodnoty:</h3>
        </>
      ) : (
        <p>Omlouváme se, nepodařilo se načíst ingredienci.</p>
      )}

      <Link className="button" href={`/ingredients/${id}/change-ingredient`}>
        Upravit
      </Link>
    </main>
  );
}
