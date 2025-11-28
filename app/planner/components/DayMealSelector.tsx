import { mealTypes } from "@/app/recipes/components/Recipeform";
import { Day, MealType, WeekPlan } from "@/types";
import { MealSelect } from "./MealSelect";

type Props = {
  day: Day;
  plan: WeekPlan;
  selectMeal: (day: Day, type: MealType, mealId: string | undefined, servings: number) => void;
};

export function DayMealSelector({ day, plan, selectMeal }: Props) {
  return (
    <section>
      <h3 className="left">{day}</h3>
      {mealTypes.map(({ label, value }) => (
        <MealSelect
          key={value}
          day={day}
          mealType={value}
          label={label}
          selectedMeal={plan[day]?.[value]?.meal}
          selectMeal={selectMeal}
          servings={plan[day]?.[value]?.servings ?? 1}
        />
      ))}
    </section>
  );
}
