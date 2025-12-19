"use client";

import { FormProvider } from "react-hook-form";
import { useAddIngredientDB } from "@/lib/db/ingredients/use-add-ingredient-db";
import { useUpdateIngredientDB } from "@/lib/db/ingredients/use-update-ingredient-db";
import { Ingredient } from "@/types";
import { useIngredientNavigation } from "../hooks/useIngredientNavigation";
import IngredientActionsSection from "./IngredientActionsSection";
import IngredientAltUnitsSection from "./IngredientAltUnitsSection";
import IngredientNameSection from "./IngredientNameSection";
import IngredientNutrientsSection from "./IngredientNutrientsSection";
import IngredientUnitSection from "./IngredientUnitSection";
import { IngredientFormData } from "./types";
import { useIngredientForm } from "./useIngredientForm";

type Props = {
  ingredient?: Ingredient | null;
};

export default function IngredientForm({ ingredient }: Props) {
  const methods = useIngredientForm(ingredient);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { addIngredient } = useAddIngredientDB();
  const { updateIngredient } = useUpdateIngredientDB();
  const { goToDetail } = useIngredientNavigation();

  const isEditing = Boolean(ingredient?._id);

  const onSubmit = async (formData: IngredientFormData) => {
    const ingredientData: Omit<Ingredient, "_id" | "_creationTime"> = {
      name: formData.name,
      unit: formData.unit,
      altUnits: formData.altUnits.map((u) => ({
        name: u.name,
        unitsPerAltUnit: Number(u.unitsPerAltUnit) || 0,
      })),
      nutrients: {
        kcal: Number(formData.nutrients.kcal) || 0,
        protein: Number(formData.nutrients.protein) || 0,
        fat: Number(formData.nutrients.fat) || 0,
        carbohydrates: Number(formData.nutrients.carbohydrates) || 0,
        sugar: Number(formData.nutrients.sugar) || 0,
        fiber: Number(formData.nutrients.fiber) || 0,
      },
    };

    try {
      let id;
      if (isEditing && ingredient?._id) {
        id = await updateIngredient({ _id: ingredient._id, ...ingredientData });
        alert("Ingredience byla upravena");
      } else {
        id = await addIngredient(ingredientData);
        alert("Ingredience byla přidána");
      }
      goToDetail(id);
    } catch (err) {
      console.error("❌ Chyba při ukládání:", err);
      alert("Chyba při ukládání ingredience");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="app-form">
        <IngredientNameSection />
        <IngredientUnitSection />
        <IngredientAltUnitsSection />
        <IngredientNutrientsSection />
        <IngredientActionsSection isSubmitting={isSubmitting} isEditing={isEditing} />
      </form>
    </FormProvider>
  );
}
