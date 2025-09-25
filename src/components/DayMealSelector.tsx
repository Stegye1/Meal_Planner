import { Day, MealType, WeekPlan, Meal } from "../types";
import { MealSelect } from "./MealSelect";
import { mealTypes } from "../mockData";

type Props = {
  day: Day;
  plan: WeekPlan;
  selectMeal: (day: Day, type: MealType, mealId: number | undefined) => void;
};

export function DayMealSelector({ day, plan, selectMeal }: Props) {
  return (
    <section
      style={{
        marginBottom: 20,
        borderBottom: "1px solid #ccc",
        paddingBottom: 10,
      }}
    >
      <h3>{day}</h3>
      {mealTypes.map(({ label, value }) => (
        <MealSelect
          key={value}
          day={day}
          mealType={value}
          label={label}
          selectedMeal={plan[day]?.[value]}
          selectMeal={selectMeal}
        />
      ))}
    </section>
  );
}
