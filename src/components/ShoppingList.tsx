import React from "react";
import { WeekPlan } from "../types";

type Props = {
  plan: WeekPlan;
};

export function ShoppingList({ plan }: Props) {
  const shoppingList = Array.from(
    new Set(
      Object.values(plan).flatMap((dayPlan) =>
        ["breakfast", "lunch", "dinner"].flatMap((mealType) => {
          const meal = (dayPlan as any)[mealType];
          return meal ? meal.ingredients : [];
        })
      )
    )
  );

  return (
    <section id="shopping-list">
      <h2>Nákupní seznam</h2>
      {shoppingList.length > 0 ? (
        <ul>
          {shoppingList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>Žádná jídla nebyla vybrána.</p>
      )}
    </section>
  );
}
