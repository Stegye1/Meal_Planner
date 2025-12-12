import { useFormContext } from "react-hook-form";
import { MealFormData } from "@/types";

type Props = { onCalculate: () => void };

export function NutrientsSection({ onCalculate }: Props) {
  const { watch } = useFormContext<MealFormData>();
  const nutrients = watch("nutrients");

  return (
    <div className="form-group">
      <button type="button" onClick={onCalculate} className="button">
        Spočítat nutriční hodnoty
      </button>

      {nutrients && Object.values(nutrients).some((v) => v > 0) && (
        <div className="nutrients-preview">
          <p>Kcal na porci: {nutrients.kcal.toFixed(1)}</p>
          <p>Tuky: {nutrients.fat.toFixed(1)} g</p>
          <p>Sacharidy: {nutrients.carbohydrates.toFixed(1)} g</p>
          <p>Bílkoviny: {nutrients.protein.toFixed(1)} g</p>
          <p>Cukry: {nutrients.sugar.toFixed(1)} g</p>
          <p>Vlákna: {nutrients.fiber.toFixed(1)} g</p>
        </div>
      )}
    </div>
  );
}
