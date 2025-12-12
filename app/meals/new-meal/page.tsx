"use client";

import { Header } from "@/app/layout/components/Header";
import MealForm from "@/app/meals/components/MealForm";

export default function NewMealPage() {
  return (
    <>
      <Header />
      <main className="main-content">
        <h1>Přidání nového jídla</h1>
        <MealForm meal={null} />
      </main>
    </>
  );
}
