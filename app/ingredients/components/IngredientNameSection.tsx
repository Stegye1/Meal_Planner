import { useFormContext } from "react-hook-form";
import type { IngredientFormData } from "./types";

export default function IngredientNameSection() {
  const { register, formState: { errors } } = useFormContext<IngredientFormData>();

  return (
    <div className="form-group">
      <label htmlFor="ingredient-name">Název ingredience</label>
      <input
        id="ingredient-name"
        className={`app-input ${errors.name ? "error" : ""}`}
        {...register("name", {
          required: "Název je povinný",
          setValueAs: (v) => v.toLowerCase(),
        })}
      />
      {errors.name && <span className="error">{errors.name.message}</span>}
    </div>
  );
}
