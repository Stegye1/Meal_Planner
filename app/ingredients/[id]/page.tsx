"use client";

import Link from "next/link";
import { Header } from "@/app/layout/components/Header";
import { useGetIngredientDB } from "@/lib/db/ingredients/use-get-ingredient-db";
import "../../meals/Meals.css";
import { useIngredientId } from "../hooks/useIntredientId";
import { IngredientDetail } from "./components/IngredientDetail";

export default function IngredientDetailPage() {
  const { id } = useIngredientId();

//  const ingredient: Ingredient | null = useGetIngredientDB(id);
const { data: ingredient, loading, error, notFound } = useGetIngredientDB(id);

  return (
    <>
      <Header
        actions={
          <Link className="nav-action" href={`/ingredients/${id}/change-ingredient`}>
            Upravit ingredienci
          </Link>
        }
      />
      <main className="meal-detail">
         {ingredient ? (
          <IngredientDetail ingredient={ingredient} />
        ) : loading ? (
          <p>Načítám ingredienci...</p>
        ) : notFound ? (
          <p>Ingredience nenalezena</p>
        ) : error ? (
          <p>Nastala chyba při načítání</p>
        ) : null}
      </main>
    </>
  );
}
