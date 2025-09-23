import React, { useState } from "react";
import { days, DefaultWeekPlan, meals } from "./mockData";
import { WeekPlan, MealType, Day } from "./types";
import { DayMealSelector } from "./components/DayMealSelector";
import { ShoppingList } from "./components/ShoppingList";

export function MealPlanner() {
  const [plan, setPlan] = useState<WeekPlan>(DefaultWeekPlan);

  function selectMeal(day: Day, type: MealType, mealId: number | undefined) {
    setPlan((prev: WeekPlan) => {
      const dayPlan = prev[day] || {};
      let selectedMeal = undefined;
      if (mealId !== undefined) {
        selectedMeal = meals.find(
          (m) => m.id === mealId && m.types.includes(type)
        );
      }
      return { ...prev, [day]: { ...dayPlan, [type]: selectedMeal } };
    });
  }

  return (
    <main className="main-content">
 
      <div  id="plan">
      <div id="meal-planner">
        <h2>Můj týdenní jídelníček</h2>     
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
