"use client";

import { useState } from "react";
import {
  useAddIngredientDB,
  useGetIngredientDB,
  useUpdateIngredientDB,
} from "@/lib/db/ingredients";
import { useParams, useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { Ingredient } from "@/types";

export function IngredientForm() {
  const router = useRouter();
  const { addIngredient } = useAddIngredientDB();
  const { updateIngredient } = useUpdateIngredientDB();

  const params = useParams();
  const id = params.id as Id<"ingredients"> | null;

  // pokud id není bereme to jako NEW INGREDIENT
  const isNew = !id;

  const ingredient: Ingredient | null = useGetIngredientDB(id);

  const [name, setName] = useState(ingredient ? ingredient.name : "");
  const [unit, setUnit] = useState<"g" | "ml">(
    ingredient ? ingredient.unit : "g"
  );
  //  const [customUnit, setCustomUnit] = useState(ingredient ? ingredient.customUnit || "" : "");  // pořešit stroužku, kusy, lžičky apod.
  const [nutrients, setNutrients] = useState<[number, number, number, number]>(
    ingredient ? ingredient.nutrients : [0, 0, 0, 0]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isNew) {
        await addIngredient({ name, unit, nutrients });
        alert("Ingredience byla vytvořena.");
        router.push(`/ingredients/${id}`);
      } else {
        await updateIngredient({ _id: id!, name, unit, nutrients });
        alert("Ingredience byla upravena.");
        router.push(`/ingredients/${id}`);
      }
    } catch (error) {
      alert("Došlo k chybě při ukládání ingredience.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="app-form">
      <div className="form-group">
        <label htmlFor="ingredient-name">Název ingredience</label>
        <input
          id="ingredient-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="app-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="ingredient-unit">Jednotka</label>
        <select
          id="ingredient-unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value as "g" | "ml")}
          className="app-input"
        >
          <option value="g">gramy</option>
          <option value="ml">mililitry</option>
        </select>
      </div>

      {/*
      <div className="form-group">
        <label htmlFor="custom-unit">Volitelná jednotka (např. ks, špetka...)</label>
        <input
          id="custom-unit"
          value={customUnit}
          onChange={(e) => setCustomUnit(e.target.value)}
          className="app-input"
        />
      </div>

 */}

      <fieldset className="form-group">
        <legend>Nutriční hodnoty (na 100 g/ml)</legend>
        {["kcal", "tuky", "sacharidy", "bílkoviny"].map((label, i) => (
          <div key={label} className="nutrient-row">
            <label htmlFor={label}>{label}</label>
            <input
              id={label}
              type="number"
              value={nutrients[i]}
              onChange={(e) => {
                const copy = [...nutrients] as [number, number, number, number];
                copy[i] = Number(e.target.value);
                setNutrients(copy);
              }}
              className="app-input small"
            />
          </div>
        ))}
      </fieldset>

      <button type="submit" className="action-button">
        {id ? "Uložit upravenou ingredienci" : "Přidat novou ingredienci"}
      </button>
    </form>
  );
}
