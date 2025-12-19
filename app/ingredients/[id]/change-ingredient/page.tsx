"use client";

import { Header } from "@/app/layout/components/Header";
import { useGetIngredientDB } from "@/lib/db/ingredients/use-get-ingredient-db";
import IngredientForm from "../../components/IngredientForm";
import { useIngredientId } from "../../hooks/useIntredientId";

export default function ChangeIngredientPage() {
  const { id } = useIngredientId();
  const { data: ingredient, loading, error, notFound } = useGetIngredientDB(id);

  return (
    <>
      <Header />
      <main className="main-content">
        <h1>Úprava ingredience</h1>
        {ingredient ? (
          <IngredientForm ingredient={ingredient} />
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
