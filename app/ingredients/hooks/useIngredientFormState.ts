// Čistý stav formuláře + naplnění z DB
import { useState } from "react";
import { Ingredient } from "@/types";

export function useIngredientFormState(initialData: Ingredient | null) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [unit, setUnit] = useState<"g" | "ml">(initialData?.unit ?? "g");
  const [nutrients, setNutrients] = useState<[number, number, number, number]>(
    initialData?.nutrients ?? [0, 0, 0, 0]
  );

  return {
    name,
    setName,
    unit,
    setUnit,
    nutrients,
    setNutrients,
  };
}
