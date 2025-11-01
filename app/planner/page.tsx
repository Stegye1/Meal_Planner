"use client";

import { useState } from "react";

import { days, DefaultWeekPlan, meals, mealTypes } from "../../mock-data";
import { WeekPlan, MealType, Day, PlannedMeal } from "../types";
import { DayMealSelector } from "../../components/DayMealSelector";
import { ShoppingList } from "../../components/ShoppingList";

export default function Planner() {
  const [plan, setPlan] = useState<WeekPlan>(DefaultWeekPlan);
  const [defaultServings, setDefaultServings] = useState<number>(1); //

  function selectMeal(
    day: Day,
    type: MealType,
    mealId: string | undefined,
    servings: number
  ) {
    setPlan((prev: WeekPlan) => {
      const dayPlan = prev[day] || {};
      const prevEntry = dayPlan[type];
      const prevMealId = prevEntry?.meal?.id;

      const selectedMeal =
        mealId !== undefined
          ? meals.find((m) => m.id === mealId && m.types.includes(type))
          : undefined;

      // logika výběru počtu porcí:
      let usedServings: number;

      if (!selectedMeal) {
        // jídlo bylo odstraněno
        usedServings = defaultServings;
      } else if (mealId !== prevMealId) {
        // vybralo se NOVÉ jídlo → použij výchozí porce
        usedServings = defaultServings;
      } else {
        // mění se počet porcí → použij hodnotu z inputu
        usedServings = servings ?? prevEntry?.servings ?? defaultServings;
      }

      return {
        ...prev,
        [day]: {
          ...dayPlan,
          [type]: selectedMeal
            ? { meal: selectedMeal, servings: usedServings }
            : dayPlan[type]
            ? { ...dayPlan[type], servings: usedServings }
            : undefined,
        },
      };
    });
  }

  return (
    <main className="main-content">
      <div id="plan">
        <div id="meal-planner">
          <h2 className="orange">Můj týdenní jídelníček</h2>
        
         
            <label>
              <strong>Počet porcí: </strong>
            </label>
            <input
              className="portions-window"
              type="number"
              min={1}
              value={defaultServings}
              onChange={(e) => {
                const newVal = Number(e.target.value);
                setDefaultServings(newVal);
                setPlan((prev) => {
                  const updated = { ...prev };
                  for (const day of days) {
                    for (const type of mealTypes.map((t) => t.value)) {
                      if (updated[day]?.[type]) {
                        updated[day][type] = {
                          ...(updated[day][type] as PlannedMeal),
                          servings: newVal,
                        };
                      }
                    }
                  }
                  return updated;
                });
              }}
             
            />
         
          {days.map((day) => (
            <DayMealSelector
              key={day}
              day={day}
              plan={plan}
              selectMeal={selectMeal}
            />
          ))}
        </div>

        <ShoppingList plan={plan} />
      </div>
    </main>
  );
}
