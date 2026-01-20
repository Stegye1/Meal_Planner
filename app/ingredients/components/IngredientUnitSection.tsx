import { useFormContext } from "react-hook-form";
import type { IngredientFormData } from "./types";

export default function IngredientUnitSection() {
  const { register } = useFormContext<IngredientFormData>();

  return (
    <div className="form-group">
      <label>Jednotka</label>
      <select {...register("unit")} className="app-input">
        <option value="g">g</option>
        <option value="ml">ml</option>
      </select>
    </div>
  );
}
