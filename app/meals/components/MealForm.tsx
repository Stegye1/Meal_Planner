"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FormProvider, useFieldArray } from "react-hook-form";
import { useGetImageUrlDB } from "@/lib/db/images/use-get-image-url-db";
import { useUploadImageDB } from "@/lib/db/images/use-upload-image-db";
import { useGetAllIngredientsDB } from "@/lib/db/ingredients/use-get-all-ingredients-db";
import { useUpdateMealDB } from "@/lib/db/meals/use-update-meal-db";
import { Meal, MealFormData } from "@/types";
import { FormActionsSection } from "./FormActionsSection";
import { IngredientsListSection } from "./IngredientsListSection";
import { MealImageSection } from "./MealImageSection";
import { MealNameSection } from "./MealNameSection";
import { MealServingsSection } from "./MealServingsSection";
import { MealTypesSection } from "./MealTypesSection";
import { NutrientsSection } from "./NutrientsSection";
import { PreparationSection } from "./PreparationSection";
import { useAddMealDB } from "@/lib/db/meals/use-add-meal-db";
import { useMealForm } from "../hooks/useMealForm";
import { useCalculateNutrients } from "../hooks/useCalculateNutrients";

type Props = {
  meal?: Meal | null;
};

export default function MealForm({ meal }: Props) {

  const methods = useMealForm(meal)


  const router = useRouter();

  const isEditing = Boolean(meal?._id);

  const allIngredients = useGetAllIngredientsDB();
  const currentMeal = meal;
  const { uploadImage } = useUploadImageDB();
  const { addMeal } = useAddMealDB();
  const { updateMeal } = useUpdateMealDB();
  const pictureUrl = useGetImageUrlDB(currentMeal?.pictureStorageId);

  const { control, handleSubmit, setValue, getValues, watch, formState } = methods;
  const ingredients = watch("ingredients");
  const servings = watch("servings");

  const { isSubmitting } = formState;

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });


const { nutrients, isReady } = useCalculateNutrients(
  ingredients ?? [], 
  allIngredients ?? [], 
  servings ?? 1, 
);

useEffect(() => {
  if (isReady) { 
    setValue("nutrients", nutrients);
  }
}, [nutrients, isReady, setValue]);

  const handleImageUpload = async (file: File) => {
    try {
      const storageId = await uploadImage(file);
      setValue("pictureStorageId", storageId);
    } catch (err) {
      alert("Chyba při nahrávání obrázku")
      console.error("CHYBA PŘI NAHRÁVÁNÍ OBRÁZKU:", err);
    }
  };
  
const cleanedData = (data: MealFormData) => ({
  name: data.name,
  types: data.types,
  servings: data.servings,
  pictureStorageId: data.pictureStorageId,
  preparation: data.preparation,
  ingredients: data.ingredients.map(ing => ({
    ...ing,
    altUnitIndex: ing.altUnitIndex !== undefined ? Number(ing.altUnitIndex) : undefined
  })),
  nutrients: data.nutrients
});

  const onSubmit = async (data: MealFormData) => {

const finalData = cleanedData(data)  

    try {
      if (isEditing && meal) {
        await updateMeal({ _id: meal._id, ...finalData });
      } else {
        await addMeal(finalData);
      }
      router.push("/meals");
    } catch (err) {
      console.error("CHYBA PŘI UKLÁDÁNÍ:", err);
      alert(`Nastala chyba: ${err || "Neznámá chyba"}`);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="app-form">
        <MealNameSection />
        <MealTypesSection />
        <MealServingsSection />
        <MealImageSection pictureUrl={pictureUrl} onUpload={handleImageUpload} />
        <IngredientsListSection
          allIngredients={allIngredients ?? []}
          fields={ingredientFields}
          append={appendIngredient}
          remove={removeIngredient}
        />
        <PreparationSection />
       
        <NutrientsSection 
  nutrients={nutrients} 
 
  isReady={isReady}
/>
        <FormActionsSection isSubmitting={isSubmitting} isEditing={isEditing} />
      </form>
    </FormProvider>
  );
}
