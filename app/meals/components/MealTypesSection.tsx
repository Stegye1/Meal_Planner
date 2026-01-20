import { MealFormData } from "@/types";
import { useFormContext } from "react-hook-form";
import { mealTypes } from "./MealFormConfig";

export function MealTypesSection() {
  const { watch, setValue, formState: { errors } } = useFormContext<MealFormData>();
  const types = watch("types") || [];
  const typeError = errors.types?.message;
  
  const toggleType = (type: MealFormData["types"][number]) => {
    const newTypes = types.includes(type)
      ? types.filter(t => t !== type)
      : [...types, type];
    setValue("types", newTypes);
  };

  return (
    <fieldset className="form-group">
      <legend>Typy jídel</legend>
      <div className="meal-types-items">
        {mealTypes.map(({ value, label }) => (
          <label key={value} className="checkbox-label">
            <input
              type="checkbox"
              checked={types.includes(value)}
              onChange={() => toggleType(value)}
            />
            {label}
          </label>
        ))}
      </div>
      {typeError && <span className="error">{typeError}</span>}
    </fieldset>
  );
}
