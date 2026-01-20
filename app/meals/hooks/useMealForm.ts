"use client";

import { UseFormReturn, useForm } from "react-hook-form";
import { Meal, MealFormData, MealFormDataUpdate } from "@/types";
import { defaultMeal } from "../components/MealFormConfig";

export function useMealForm(meal?: MealFormDataUpdate | null): UseFormReturn<MealFormData> {
  return useForm<MealFormData>({
    defaultValues: meal ? meal : defaultMeal,
  });
}
