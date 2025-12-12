"use client";

import { useParams } from "next/navigation";
import { Header } from "@/app/layout/components/Header";
import MealForm from "@/app/meals/components/MealForm";
import { Id } from "@/convex/_generated/dataModel";
import { useGetMealDB } from "@/lib/db/meals/use-get-meal-db";

export default function ChangeMealPage() {
  const params = useParams();
  const mealId = params.id === "new-meal" ? null : (params.id as Id<"meals">);
  const meal = useGetMealDB(mealId);
  return (
    <>
      <Header />
      <main className="main-content">
        <h1>Úprava receptu</h1>
        <MealForm meal={meal} />
      </main>
    </>
  );
}
