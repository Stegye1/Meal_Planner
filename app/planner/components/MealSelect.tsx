import { useGetAllRecipesDB } from "@/lib/db/recipes";

import { Id } from "@/convex/_generated/dataModel";
import type { Day, Meal, MealType } from "@/types";

type Props = {
  day: Day;
  mealType: MealType;
  label: string;
  selectedMeal?: Meal;
  selectMeal: (
    day: Day,
    type: MealType,
    mealId: Id<"meals"> | undefined,
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
  const meals: Omit<Meal, "picture">[] | null = useGetAllRecipesDB();
  const options = meals ? meals.filter((m) => m.types.includes(mealType)) : [];

  const onMealChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const mealId = e.target.value ? (e.target.value as Id<"meals">) : undefined;
    selectMeal(day, mealType, mealId, servings);
  };

  const onServingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newServings = Math.max(1, Number(e.target.value));
    selectMeal(day, mealType, selectedMeal?._id, newServings);
  };

  return (
    <div className="day-meal-selector">
      <label>{label}: </label>
      <select
        className="meal-window"
        value={selectedMeal?._id ?? ""}
        onChange={onMealChange}
      >
        <option value="">-- vyberte jídlo --</option>
        {options.map((meal) => (
          <option key={meal._id} value={meal._id}>
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
