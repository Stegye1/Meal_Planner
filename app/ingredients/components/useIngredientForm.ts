"use client";

import { UseFormReturn, useForm } from "react-hook-form";
import { Ingredient } from "@/types";
import { defaultIngredient } from "./IngredientFormConfig";
import { IngredientFormData } from "./types";

export function useIngredientForm(ingredient?: Ingredient | null): UseFormReturn<IngredientFormData> {
  return useForm<IngredientFormData>({
    defaultValues: ingredient ? ingredient : defaultIngredient,
  });
}
