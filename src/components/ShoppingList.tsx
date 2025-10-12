import { useState, useEffect, useMemo } from "react";
import { MealType, WeekPlan } from "../types";

type Props = {
  plan: WeekPlan;
};

export function ShoppingList({ plan }: Props) {
  // Vytvoření seznamu všech unikátních ingrediencí z plan (memoizace)
  const allIngredients = useMemo(() => {
    return Array.from(
      new Set(
        Object.values(plan).flatMap((dayPlan) =>
          (Object.keys(dayPlan) as MealType[]).flatMap((mealType) => {
            const meal = dayPlan[mealType];
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
        if (meal && meal.ingredients && meal.name) {
          meal.ingredients.forEach((ingredient: string) => {
            if (!map[ingredient]) {
              map[ingredient] = [];
            }
            map[ingredient].push(meal.name);
          });
        }
      });
    });

    // sloučí duplicity a přidá počty (např. "2 × kuřecí salát")
    Object.keys(map).forEach((ingredient) => {
      const counts: Record<string, number> = {};
      map[ingredient].forEach((mealName) => {
        counts[mealName] = (counts[mealName] || 0) + 1;
      });
      map[ingredient] = Object.entries(counts).map(([mealName, count]) =>
        count > 1 ? `${count} × ${mealName}` : mealName
      );
    });

    return map;
  }, [plan]);

  function handleRemove(item: string) {
    setShoppingList((list) => list.filter((i) => i !== item));
  }

  return (
    <section id="shopping-list">
      <h2 className="orange">Nákupní seznam</h2>
      {shoppingList.length > 0 ? (
        <ul>
          {shoppingList.map((item) => (
            <li
              key={item}
              className="list-item"
              style={{ position: "relative" }}
            >
              <span
              
                title={`Používá se v: ${ingredientToMealsMap[item].join(", ")}`}
              >
                {item}
              </span>
              <button
              
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
