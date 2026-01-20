import { useFormContext } from "react-hook-form";
import type { IngredientFormData } from "./types";

const nutrientFields = [
  { key: "kcal", label: "kcal" },
  { key: "fat", label: "tuky (g)" },
  { key: "carbohydrates", label: "sacharidy (g)" },
  { key: "protein", label: "bílkoviny (g)" },
  { key: "sugar", label: "cukry (g)" },
  { key: "fiber", label: "vláknina (g)" },
] as const;

export default function IngredientNutrientsSection() {
  const { register } = useFormContext<IngredientFormData>();

  return (
    <fieldset className="form-group">
      <legend>Nutriční hodnoty (na 100 g/ml)</legend>
      {nutrientFields.map(({ key, label }) => (
        <div key={key} className="nutrient-row">
          <label>{label}</label>
          <input
         
            type="number"
            step="0.01"
            min="0"
            className="app-input small"
            {...register(`nutrients.${key}` as const, { valueAsNumber: true })}
          />
        </div>
      ))}
    </fieldset>
  );
}
