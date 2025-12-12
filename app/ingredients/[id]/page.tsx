"use client";

import Link from "next/link";
import { Header } from "@/app/layout/components/Header";
import { useGetIngredientDB } from "@/lib/db/ingredients/use-get-ingredient-db";
import { Ingredient } from "@/types";
import "../../meals/Meals.css";
import { useIngredientId } from "../hooks/useIntredientId";
import { IngredientDetail } from "./components/IngredientDetail";

export default function IngredientDetailPage() {
  const { id } = useIngredientId();

  const ingredient: Ingredient | null = useGetIngredientDB(id);

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
        ) : (
          <p>Omlouváme se, nepodařilo se načíst ingredienci.</p>
        )}
      </main>
    </>
  );
}
