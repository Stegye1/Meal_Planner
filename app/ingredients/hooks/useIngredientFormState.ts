// Čistý stav formuláře + naplnění z DB
import { useState } from "react";
import { Ingredient } from "@/types";
import { AltUnit } from "../components/IngredientAltUnitsFieldset";

export function useIngredientFormState(initialData: Ingredient | null) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [unit, setUnit] = useState<"g" | "ml">(initialData?.unit ?? "g");
   const [altUnits, setAltUnits] = useState<AltUnit[]>(
    initialData?.altUnits ?? []
  );
  const [nutrients, setNutrients] = useState(initialData?.nutrients ?? {
    kcal: 0,
    protein: 0,
    fat: 0,
    carbohydrates: 0,
    sugar: 0,
    fiber: 0,
  });


  return {
    name,
    setName,
    unit,
    setUnit,
    altUnits,
    setAltUnits,
    nutrients,
    setNutrients,
  };
}
