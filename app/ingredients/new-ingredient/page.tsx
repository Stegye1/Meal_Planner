"use client";

import { Header } from "@/app/layout/components/Header";
import { IngredientForm } from "../components/IngredientForm";

export default function NewIngredientPage() {
  return (
    <>
      <Header />
      <main className="main-content">
        <h1> Přidání ingredience</h1>
        <IngredientForm />
      </main>
    </>
  );
}
