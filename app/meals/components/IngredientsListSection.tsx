import React from "react";
import { Controller, UseFieldArrayAppend, useFormContext } from "react-hook-form";
import { Id } from "@/convex/_generated/dataModel";
import { Ingredient, MealFormData } from "@/types";


type Props = {
  allIngredients: Ingredient[];
  fields: Array<{ id: string }>;
  append: UseFieldArrayAppend<MealFormData, "ingredients">;
  remove: (index: number) => void;
};

export function IngredientsListSection({ allIngredients, fields, append, remove }: Props) {
  const { control, watch } = useFormContext<MealFormData>();

  return (
    <fieldset className="form-group">
      <legend>Ingredience</legend>

      {fields.map((field, index) => {
       
        const selectedIngredientId = watch(`ingredients.${index}.ingredientId`);
        const selectedIngredient = allIngredients.find(ing => ing._id === selectedIngredientId);
        const altUnits = selectedIngredient?.altUnits || [];

        return (
          <div key={field.id} className="ingredient-row">
            
            <Controller
              name={`ingredients.${index}.ingredientId`}
              control={control}
              render={({ field: selectField, fieldState: { error } }) => (
                <div>
                  <select
                    value={selectField.value || ""}
                    onChange={selectField.onChange}
                    className={`app-input ${error ? "error" : ""}`}
                  >
                    <option value="">Vyber ingredienci</option>
                    {allIngredients.map((ing) => (
                      <option key={ing._id} value={ing._id}>
                        {ing.name}
                      </option>
                    ))}
                  </select>
                  {error && <span className="error">{error.message}</span>}
                </div>
              )}
            />

         
            <Controller
              name={`ingredients.${index}.amount`}
              control={control}
              render={({ field: amountField, fieldState: { error } }) => (
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={amountField.value || 0}
                  onChange={(e) => amountField.onChange(Number(e.target.value) || 0)}
                  placeholder="množství"
                  className={`app-input small ${error ? "error" : ""}`}
                />
              )}
            />

          
            <Controller
              name={`ingredients.${index}.altUnitIndex`}
              
              control={control}
              render={({ field: altField, fieldState: { error } }) => (
                <div>
                  <select
                    value={altField.value ?? ""}                  
                    onChange={(e) => altField.onChange(e.target.value)} 
                    className={`app-input small ${error ? "error" : ""}`}
                    disabled={!altUnits.length}                    
                  >
                    <option value="">{selectedIngredient?.unit || ""}</option>
                    {altUnits.map((altUnit, idx) => (
                      <option key={idx} value={idx}>
                        {altUnit.name}
                      </option>
                    ))}
                  </select>
                  {error && <span className="error">{error.message}</span>}
                </div>
              )}
            />

          
            <button type="button" onClick={() => remove(index)} className="button remove-btn">
              x
            </button>
          </div>
        );
      })}

      <button
        type="button"
        onClick={() => append({ ingredientId: "" as Id<"ingredients">, amount: 0, altUnitIndex: undefined })}
        className="button"
      >
        + Přidat ingredienci
      </button>
    </fieldset>
  );
}
