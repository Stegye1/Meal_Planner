import { MealType, Day, Meal } from "../types";
import { meals } from "../mockData";

type Props = {
  day: Day;
  mealType: MealType;
  label: string;
  selectedMeal?: Meal;
  selectMeal: (day: Day, type: MealType, mealId: number | undefined) => void;
};

export function MealSelect({
  day,
  mealType,
  label,
  selectedMeal,
  selectMeal,
}: Props) {
  const options = meals.filter((m) => m.types.includes(mealType));
  return (
    <div className="day-meal-selector">
      <label>{label}: </label>
      <select
    className="meal-window"
        value={selectedMeal?.id ?? ""}
        onChange={(e) =>
          selectMeal(
            day,
            mealType,
            e.target.value ? +e.target.value : undefined
          )
        }
      >
        <option  value="">-- vyberte jídlo --</option>
        {options.map((meal) => (
          <option key={meal.id} value={meal.id}>
            {meal.name}
          </option>
        ))}
      </select>
    </div>
  );
}
