import { useFormContext, useFieldArray } from "react-hook-form";
import type { IngredientFormData } from "./types";

const altUnitOptions = ["lžíce", "lžička", "špetka", "hrnek", "ks", "krajíc"];

export default function IngredientAltUnitsSection() {
  const { control, register } = useFormContext<IngredientFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "altUnits",
  });

  return (
    <div className="form-group">
      <label>Alternativní jednotky (volitelné)</label>
      <button
        type="button"
        onClick={() => append({ name: "lžíce", unitsPerAltUnit: undefined })}
        className="button small mt-1"
      >
        + Přidat jednotku
      </button>

      {fields.length > 0 && (
        <ul className="mt-2">
          {fields.map((field, index) => (
            <li key={field.id} className="flex-between">
              <select
                {...register(`altUnits.${index}.name` as const)}
                className="app-input small"
              >
                {altUnitOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="Převod na zákl. j."
                className="app-input middle"
                {...register(`altUnits.${index}.unitsPerAltUnit` as const, {
                  valueAsNumber: true,
                })}
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
  );
}
