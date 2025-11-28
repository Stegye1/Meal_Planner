"use client";

import RecipeForm from "@/app/recipes/components/Recipeform";

export default function NewRecipePage() {
  return (
    <main className="main-content">
      <h1>Přidání nového receptu</h1>
      <RecipeForm />
    </main>
  );
}
