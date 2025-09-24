import React, { useState, useEffect, useMemo } from "react";
import { WeekPlan } from "../types";

type Props = {
  plan: WeekPlan;
};

export function ShoppingList({ plan }: Props) {
  // Vytvoření seznamu všech unikátních ingrediencí z plan (memoizace)
  const allIngredients = useMemo(() => {
    return Array.from(
      new Set(
        Object.values(plan).flatMap((dayPlan) =>
          ["breakfast", "lunch", "dinner"].flatMap((mealType) => {
            const meal = (dayPlan as any)[mealType];
            return meal ? meal.ingredients : [];
          })
        )
      )
    );
  }, [plan]);

  // Stav nákupního seznamu
  const [shoppingList, setShoppingList] = useState<string[]>([]);

  // Synchronizace stavu s props plan při jeho změně
  useEffect(() => {
    setShoppingList(allIngredients);
  }, [allIngredients]);

  // Mapování ingrediencí na jídla pro tooltip
  const ingredientToMealsMap = useMemo(() => {
    const map: Record<string, string[]> = {};
    Object.entries(plan).forEach(([day, dayPlan]) => {
      ["breakfast", "lunch", "dinner"].forEach((mealType) => {
        const meal = (dayPlan as any)[mealType];
        if (meal && meal.ingredients) {
          meal.ingredients.forEach((ingredient: string) => {
            if (!map[ingredient]) {
              map[ingredient] = [];
            }
            map[ingredient].push(`${mealType} (${day})`);
          });
        }
      });
    });
    return map;
  }, [plan]);

  function handleRemove(item: string) {
    setShoppingList((list) => list.filter((i) => i !== item));
  }

  return (
    <section id="shopping-list">
      <h2>Nákupní seznam</h2>
      {shoppingList.length > 0 ? (
        <ul>
          {shoppingList.map((item) => (
            <li key={item} className="list-item" style={{ position: "relative" }}>
              <span
                style={{ cursor: "pointer", textDecoration: "underline" }}
                title={`Používá se v: ${ingredientToMealsMap[item].join(", ")}`}
              >
                {item}
              </span>
              <button
                style={{ marginLeft: 10 }}
                onClick={() => handleRemove(item)}
                aria-label={`Zrušit ${item}`}
              >
                {`Zrušit ${item}`}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Žádná jídla nebyla vybrána.</p>
      )}
    </section>
  );
}



/*
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
  */
