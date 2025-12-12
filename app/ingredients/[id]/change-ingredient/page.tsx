"use client";

import { Header } from "@/app/layout/components/Header";
import { useGetIngredientDB } from "@/lib/db/ingredients/use-get-ingredient-db";
import { IngredientForm } from "../../components/IngredientForm";
import { useIngredientId } from "../../hooks/useIntredientId";

export default function ChangeIngredientPage() {
  const { id } = useIngredientId();
  const ingredient = useGetIngredientDB(id);

  return (
    <>
      <Header />
      <main className="main-content">
        <h1>Úprava ingredience</h1>
        <IngredientForm ingredient={ingredient} />
      </main>
    </>
  );
}
