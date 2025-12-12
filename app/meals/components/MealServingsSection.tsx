import { useFormContext } from "react-hook-form";
import { MealFormData } from "@/types";

export function MealServingsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<MealFormData>();

  return (
    <div className="form-group">
      <label htmlFor="servings">Počet porcí</label>
      <input
        id="servings"
        type="number"
        min="1"
        className={`app-input small ${errors.servings ? "error" : ""}`}
        {...register("servings", {
          required: "Zadejte počet porcí",
          valueAsNumber: true,
          min: { value: 1, message: "Min. 1 porce" },
        })}
      />
      {errors.servings && <span className="error">{errors.servings.message}</span>}
    </div>
  );
}
