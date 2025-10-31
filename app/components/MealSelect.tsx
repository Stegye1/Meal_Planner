import { MealType, Day, Meal } from "../types";
import { meals } from "../../app/mock-data";

type Props = {
  day: Day;
  mealType: MealType;
  label: string;
  selectedMeal?: Meal;
  selectMeal: (
    day: Day,
    type: MealType,
    mealId: string | undefined,
    servings: number
  ) => void;
  servings: number;
};

export function MealSelect({
  day,
  mealType,
  label,
  selectedMeal,
  selectMeal,
  servings,
}: Props) {
  const options = meals.filter((m) => m.types.includes(mealType));

  const onMealChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mealId = e.target.value ? e.target.value : undefined;
    selectMeal(day, mealType, mealId, servings);
  };

  const onServingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newServings = Math.max(1, Number(e.target.value));
    selectMeal(day, mealType, selectedMeal?.id, newServings);
  };

  return (
    <div className="day-meal-selector">
      <label>{label}: </label>
      <select
        className="meal-window"
        value={selectedMeal?.id ?? ""}
        onChange={onMealChange}
      >
        <option value="">-- vyberte jídlo --</option>
        {options.map((meal) => (
          <option key={meal.id} value={meal.id}>
            {meal.name}
          </option>
        ))}
      </select>
      {selectedMeal && (
        <input
          className="portions-window"
          type="number"
          min={1}
          value={servings}
          onChange={onServingsChange}
        />
      )}
    </div>
  );
}
