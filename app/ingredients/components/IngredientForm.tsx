// FUNKČNÍ FORMULÁŘ S REACT HOOK FORM!!!

"use client";

import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useUpdateIngredientDB } from "@/lib/db/ingredients/use-update-ingredient-db";
import { useAddIngredientDB } from "@/lib/db/ingredients/use-add-ingredient-db";
import { Ingredient } from "@/types";
import { useIngredientNavigation } from "../hooks/useIngredientNavigation";


type FormData = {
  name: string;
  unit: "g" | "ml";
  altUnits: Array<{ name: string; unitsPerAltUnit: number }>;
  nutrients: {
    kcal: number;
    protein: number;
    fat: number;
    carbohydrates: number;
    sugar: number;
    fiber: number;
  };
};

type Props = {
  ingredient?: Ingredient | null;  
};

export function IngredientForm({ ingredient }: Props) {
 
   const { updateIngredient } = useUpdateIngredientDB();
    const { addIngredient } = useAddIngredientDB();

  const isEditing = Boolean(ingredient?._id);

  const defaultNutrients =  {
    kcal:0,
    protein: 0,
    fat: 0,
    carbohydrates: 0,
    sugar: 0,
    fiber: 0,
  }

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
   defaultValues: {
  name: ingredient?.name ?? "",
  unit: ingredient?.unit ?? "g", 
  altUnits: ingredient?.altUnits ?? [],
  nutrients: ingredient?.nutrients ?? defaultNutrients,
}
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "altUnits",
  });

  const altUnitNameOptions = ["lžíce", "lžička", "špetka", "hrnek", "kus"];

const { goToDetail } = useIngredientNavigation();

  const onSubmit = async (data: FormData) => {
    
   const cleanedData = {
  ...data,
  altUnits: data.altUnits.map(unit => ({
    name: unit.name,
    unitsPerAltUnit: Number(unit.unitsPerAltUnit) || 0  
  })),
  nutrients: Object.fromEntries(
    Object.entries(data.nutrients).map(([key, val]) => [key, Number(val) || 0])
  ),
} as FormData;

    try {
      let id=undefined
      if (isEditing && ingredient?._id) {
        id=await updateIngredient({ _id: ingredient._id, ...cleanedData });
        alert("Ingredience byla upravena")
        goToDetail(id);
      } else {
        id=await addIngredient(cleanedData);
       alert("Ingredience byla přidána")
       goToDetail(id);
      } 

       } catch (err) {
      alert("Chyba při ukládání");
      console.error("❌ Error saving ingredient:", err);  
    }    
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="app-form">
      {/* Název ingredience */}
      <Controller
        name="name"
        control={control}
        rules={{ required: "Název je povinný" }}
        render={({ field, fieldState: { error } }) => (
          <div className="form-group">
            <label htmlFor="ingredient-name">Název ingredience</label>
            <input
              {...field}
              id="ingredient-name"
              type="text"
              required
              onChange={(e) => field.onChange(e.target.value.toLowerCase())}
              className={`app-input ${error ? "error" : ""}`}
            />
            {error && <span className="error">{error.message}</span>}
          </div>
        )}
      />

      {/* Jednotka */}
      <Controller
        name="unit"
        control={control}
        render={({ field }) => (
          <div className="form-group">
            <label>Jednotka</label>
            <select {...field} className="app-input">
              <option value="g">g</option>
              <option value="ml">ml</option>
            </select>
          </div>
        )}
      />

      {/* Alternativní jednotky */}
      <div className="form-group">
        <label>Alternativní jednotky (volitelné)</label>

        <button
          type="button"
          onClick={() => append({ name: "lžíce", unitsPerAltUnit: 1 })}
          className="button small mt-1"
        >
          + Přidat jednotku
        </button>

        {fields.length > 0 && (
          <ul className="mt-2">
            {fields.map((field, index) => (
              <li key={field.id} className="flex-between">
                <Controller
                  name={`altUnits.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <select {...field} className="app-input small">
                      {altUnitNameOptions.map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  )}
                />
                <Controller
                  name={`altUnits.${index}.unitsPerAltUnit`}
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      step="0.01"
                      min="0"
                      className="app-input small"
                      placeholder="Převod"
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="button small danger"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Nutriční hodnoty */}
      <fieldset className="form-group">
        <legend>Nutriční hodnoty (na 100 g/ml)</legend>
        {[
          { key: "kcal", label: "kcal" },
          { key: "fat", label: "tuky (g)" },
          { key: "carbohydrates", label: "sacharidy (g)" },
          { key: "protein", label: "bílkoviny (g)" },
          { key: "sugar", label: "cukry (g)" },
          { key: "fiber", label: "vlákna (g)" },
        ].map(({ key, label }) => (
          <Controller
            key={key}
            name={`nutrients.${key as keyof FormData["nutrients"]}`}
            control={control}
            render={({ field }) => (
              <div className="nutrient-row">
                <label>{label}</label>
                <input
                  {...field}
                  type="number"
                  step="0.01"
                  min="0"
                  className="app-input small"
                />
              </div>
            )}
          />
        ))}
      </fieldset>

      {/* Odeslání */}
      <div className="form-actions mt-6">
        <button type="submit" disabled={isSubmitting} className="action-button">
          {isSubmitting
            ? "Ukládám..."
            : isEditing
            ? "Uložit změny"
            : "Přidat ingredienci"}
        </button>
      </div>
    </form>
  );
}



// import { useIngredient } from "../hooks/useIngredient";
// import { FormActions } from "./FormActions";
// import { IngredientAltUnitsFieldset } from "./IngredientAltUnitsFieldset";
// import { IngredientNameInput } from "./IngredientNameInput";
// import { IngredientUnitSelect } from "./IngredientUnitSelect";
// import { NutrientsFieldset } from "./NutrientsFieldSet";

// export function IngredientForm() {
//   const {
//     isNew,
//     name,
//     setName,
//     unit,
//     setUnit,
//     altUnits,
//     setAltUnits,
//     nutrients,
//     setNutrients,
//     isSubmitting,
//     handleSubmit,
//   } = useIngredient();

//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault();
//         handleSubmit();
//       }}
//       className="app-form"
//     >
//       <IngredientNameInput value={name} onChange={setName} />
//       <IngredientUnitSelect value={unit} onChange={setUnit} />
//       <IngredientAltUnitsFieldset value={altUnits} onChange={setAltUnits} mainUnit={unit} />
//       <NutrientsFieldset nutrients={nutrients} onChange={setNutrients} />
//       <FormActions isNew={isNew} isLoading={isSubmitting} />
//     </form>
//   );
// }
