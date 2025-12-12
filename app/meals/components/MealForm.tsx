"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { useGetImageUrlDB } from "@/lib/db/images/use-get-image-url-db.ts";
import { useUploadImageDB } from "@/lib/db/images/use-upload-image-db.ts";
import { useGetAllIngredientsDB } from "@/lib/db/ingredients/use-get-all-ingredients-db";
import { useAddMealDB } from "@/lib/db/meals/use-add-meal-db.ts";
import { useUpdateMealDB } from "@/lib/db/meals/use-update-meal-db.ts";
import { Meal, MealType } from "@/types";
import { FormActionsSection } from "./FormActionsSection";
import { IngredientsListSection } from "./IngredientsListSection";
import { MealImageSection } from "./MealImageSection";
import { MealNameSection } from "./MealNameSection";
import { MealServingsSection } from "./MealServingsSection";
import { MealTypesSection } from "./MealTypesSection";
import { NutrientsSection } from "./NutrientsSection";
import { PreparationSection } from "./PreparationSection";

export const mealTypes: { label: string; value: MealType }[] = [
  { label: "Snídaně", value: "breakfast" },
  { label: "Oběd", value: "lunch" },
  { label: "Večeře", value: "dinner" },
];

export type FormData = Omit<Meal, "_id">;

type Props = {
  meal?: Meal | null;
};

export default function MealForm({ meal }: Props) {
  const router = useRouter();

  const isEditing = Boolean(meal?._id);

  const allIngredients = useGetAllIngredientsDB();
  const currentMeal = meal;
  const { uploadImage } = useUploadImageDB();
  const { addMeal } = useAddMealDB();
  const { updateMeal } = useUpdateMealDB();
  const pictureUrl = useGetImageUrlDB(currentMeal?.pictureStorageId);

  const methods = useForm<FormData>({
    defaultValues: {
      name: meal?.name ?? "",
      types: meal?.types ?? [],
      servings: meal?.servings ?? 1,
      pictureStorageId: meal?.pictureStorageId ?? undefined,
      ingredients: meal?.ingredients ?? [],
      nutrients: meal?.nutrients ?? { kcal: 0, fat: 0, carbohydrates: 0, protein: 0, sugar: 0, fiber: 0 },
      preparation: {
        firstStep: meal?.preparation.firstStep ?? "",
        secondStep: meal?.preparation.secondStep ?? "",
        thirdStep: meal?.preparation.thirdStep ?? "",
        fourthStep: meal?.preparation.fourthStep ?? "",
      },
    },
  });

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

  const calculateNutrients = () => {
    if (!allIngredients?.length) return;

    const totalNutrients = ingredients.reduce(
      (totals, ing) => {
        const ingredient = allIngredients.find((i) => i._id === ing.ingredientId);
        if (!ingredient || !ing.amount) return totals;

        const nutrients = ingredient.nutrients;
        const amount = ing.amount;

        return {
          kcal: totals.kcal + (amount * nutrients.kcal) / 100,
          fat: totals.fat + (amount * nutrients.fat) / 100,
          carbohydrates: totals.carbohydrates + (amount * nutrients.carbohydrates) / 100,
          protein: totals.protein + (amount * nutrients.protein) / 100,
          sugar: totals.sugar + (amount * nutrients.sugar) / 100,
          fiber: totals.fiber + (amount * nutrients.fiber) / 100,
        };
      },
      { kcal: 0, fat: 0, carbohydrates: 0, protein: 0, sugar: 0, fiber: 0 },
    );

    const nutrientsPerServing =
      servings > 0
        ? {
            kcal: totalNutrients.kcal / servings,
            fat: totalNutrients.fat / servings,
            carbohydrates: totalNutrients.carbohydrates / servings,
            protein: totalNutrients.protein / servings,
            sugar: totalNutrients.sugar / servings,
            fiber: totalNutrients.fiber / servings,
          }
        : { kcal: 0, fat: 0, carbohydrates: 0, protein: 0, sugar: 0, fiber: 0 };

    setValue("nutrients", nutrientsPerServing);
  };

  const handleImageUpload = async (file: File) => {
    try {
      const storageId = await uploadImage(file);
      setValue("pictureStorageId", storageId);
    } catch (err) {
      alert("Chyba při nahrávání obrázku");
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      if (isEditing && meal) {
        await updateMeal({ _id: meal._id, ...data });
      } else {
        await addMeal(data);
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
        <NutrientsSection onCalculate={calculateNutrients} />
        <FormActionsSection isSubmitting={isSubmitting} isEditing={isEditing} />
      </form>
    </FormProvider>
  );
}
