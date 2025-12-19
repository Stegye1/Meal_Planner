"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Header } from "@/app/layout/components/Header";
import { Id } from "@/convex/_generated/dataModel";
import "../Meals.css";
import MealDetail from "./components/MealDetail";
import { useMealDetail } from "./hooks/useMealDetail";

export default function MealDetailPage() {
  const params = useParams();
  const id = params.id as Id<"meals">;
  const { meal, mealIngredients, imageUrl, isLoading } = useMealDetail(id);

  if (isLoading) {
    return <p>Načítání receptu...</p>;
  }

  if (!meal || !mealIngredients.length) {
    return <p>Omlouváme se, nepodařilo se načíst recept.</p>;
  }

  return (
    <>
      <Header
        actions={
          <Link className="nav-action" href={`/meals/${id}/change-meal`}>
            Upravit jídlo
          </Link>
        }
      />
      <main className="meal-detail">
        <MealDetail meal={meal} mealIngredients={mealIngredients} imageUrl={imageUrl} />
      </main>
    </>
  );
}
