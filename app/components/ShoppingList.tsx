"use client";

import { useState, useMemo, useEffect } from "react";

import { WeekPlan, MealType } from "../types";
import { ingredients } from "../../app/mock-data"; // import centrálního seznamu ingrediencí

type Props = {
  plan: WeekPlan;
};

export function ShoppingList({ plan }: Props) {
  // Vytvoření mapy ingrediencí pro rychlý přístup
  const ingredientMap = useMemo(() => {
    const map = new Map<string, { name: string; unit: string }>();
    ingredients.forEach(({ id, name, unit }) => {
      map.set(id, { name, unit });
    });
    return map;
  }, []);

  // Výpočet celkového množství ingrediencí a zároveň vytvoření mapy pro tooltip:
  // ingredientToMealsCountMap eviduje, kolikrát se každé jídlo podílí na dané ingredienci
  // useMemo zajistí, že se výpočet dělá jen při změně plánu nebo ingredientMapy
  const { allIngredients, ingredientToMealsCountMap } = useMemo(() => {
    const totals = new Map<string, number>();
    const mealsCountMap = new Map<string, Map<string, number>>();

    // Projdeme každý den a každý denní pokrm v plánu
    Object.values(plan).forEach((dayPlan) => {
      (Object.keys(dayPlan) as MealType[]).forEach((mealType) => {
        const entry = dayPlan[mealType];
        if (entry?.meal && entry.servings) {
          const { meal, servings } = entry;
          const factor = servings / meal.servings;

          // Projdeme ingredience jídla a připočteme množství do totals
          // Současně připravíme mapu jídel pro tooltip k ingrediencím
          meal.ingredients.forEach(({ ingredientId, amount }) => {
            totals.set(
              ingredientId,
              (totals.get(ingredientId) || 0) + amount * factor
            );

            if (!mealsCountMap.has(ingredientId)) {
              mealsCountMap.set(ingredientId, new Map());
            }
            const innerMap = mealsCountMap.get(ingredientId)!;
            innerMap.set(meal.name, (innerMap.get(meal.name) || 0) + 1);
          });
        }
      });
    });

    // Převod mapy totals na pole s detaily (id, název, jednotka, množství)
    const allIngredientsArray = Array.from(totals.entries()).map(
      ([id, amount]) => {
        const ingredient = ingredientMap.get(id);
        return {
          id,
          name: ingredient?.name || "Unknown",
          unit: ingredient?.unit || "",
          amount,
        };
      }
    );

    return {
      allIngredients: allIngredientsArray,
      ingredientToMealsCountMap: mealsCountMap,
    };
  }, [plan, ingredientMap]);

  const [shoppingList, setShoppingList] = useState(allIngredients);

  // aktualizace při změně
  useEffect(() => {
    setShoppingList(allIngredients);
  }, [allIngredients]);

  // Funkce pro odstranění položky ze seznamu
  function handleRemove(id: string) {
    setShoppingList((list) => list.filter((item) => item.id !== id));
  }

  return (
    <section id="shopping-list">
      <h2 className="orange">Nákupní seznam</h2>
      {shoppingList.length > 0 ? (
        <ul>
          {shoppingList.map(({ id, name, amount, unit }) => (
            <li key={id} className="list-item" style={{ position: "relative" }}>
              <span
                title={`Používá se v: ${Array.from(
                  ingredientToMealsCountMap.get(id) || []
                )
                  .map(([mealName, count]) =>
                    count > 1 ? `${count} × ${mealName}` : mealName
                  )
                  .join(", ")}`}
              >
                {amount} {unit} {name}
              </span>

              <button
                onClick={() => handleRemove(id)}
                aria-label={`Zrušit ${name}`}
              >
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
