"use client";

import { useEffect, useMemo, useState } from "react";
import { useGetAllIngredientsDB } from "@/lib/db/ingredients/use-get-all-ingredients-db";
import { MealType, WeekPlan } from "@/types";

type Props = {
  plan: WeekPlan;
};

export function ShoppingList({ plan }: Props) {
  const ingredients = useGetAllIngredientsDB();

  // 🔹 1️⃣ Ošetříme, že useMemo se může spustit i bez dat
  const ingredientMap = useMemo(() => {
    const map = new Map<string, { name: string; unit: string }>();
    if (ingredients) {
      ingredients.forEach(({ _id, name, unit }) => {
        map.set(_id, { name, unit });
      });
    }
    return map;
  }, [ingredients]);

  // 🔹 2️⃣ Spočítáme všechny ingredience
  const { allIngredients, ingredientToMealsCountMap } = useMemo(() => {
    const totals = new Map<string, number>();
    const mealsCountMap = new Map<string, Map<string, number>>();

    Object.values(plan).forEach((dayPlan) => {
      (Object.keys(dayPlan) as MealType[]).forEach((mealType) => {
        const entry = dayPlan[mealType];
        if (entry?.meal && entry.servings) {
          const { meal, servings } = entry;
          const factor = servings / meal.servings;

          meal.ingredients.forEach(({ ingredientId, amount }) => {
            totals.set(ingredientId, (totals.get(ingredientId) || 0) + amount * factor);

            if (!mealsCountMap.has(ingredientId)) {
              mealsCountMap.set(ingredientId, new Map());
            }
            const innerMap = mealsCountMap.get(ingredientId)!;
            innerMap.set(meal.name, (innerMap.get(meal.name) || 0) + 1);
          });
        }
      });
    });

    const allIngredientsArray = Array.from(totals.entries()).map(([id, amount]) => {
      const ingredient = ingredientMap.get(id);
      return {
        id,
        name: ingredient?.name || "Neznámá ingredience",
        unit: ingredient?.unit || "",
        amount,
      };
    });

    return {
      allIngredients: allIngredientsArray,
      ingredientToMealsCountMap: mealsCountMap,
    };
  }, [plan, ingredientMap]);

  // 🔹 3️⃣ Stav pro nákupní seznam
  const [shoppingList, setShoppingList] = useState(allIngredients);

  useEffect(() => {
    setShoppingList(allIngredients);
  }, [allIngredients]);

  function handleRemove(id: string) {
    setShoppingList((list) => list.filter((item) => item.id !== id));
  }

  // 🔹 4️⃣ Až teď se podmíněně vrací JSX
  if (!ingredients) {
    return <p>Omlouváme se, nepodařilo se načíst nákupní seznam.</p>;
  }

  return (
    <section id="shopping-list">
      <h2 className="orange">Nákupní seznam</h2>
      {shoppingList.length > 0 ? (
        <ul>
          {shoppingList.map(({ id, name, amount, unit }) => (
            <li key={id} className="list-item" style={{ position: "relative" }}>
              <span
                title={`Používá se v: ${Array.from(ingredientToMealsCountMap.get(id) || [])
                  .map(([mealName, count]) => (count > 1 ? `${count} × ${mealName}` : mealName))
                  .join(", ")}`}
              >
                {amount} {unit} {name}
              </span>

              <button onClick={() => handleRemove(id)} aria-label={`Zrušit ${name}`}>
                Zrušit
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
