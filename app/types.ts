/* motají se mi tu dva soubory s typy, potřebuji sjednotit
import { Id } from "@/convex/_generated/dataModel";

export type MealType = "breakfast" | "lunch" | "dinner";

export type Ingredient = {
  _id: Id<"ingredients">;
  name: string;
  unit: 'g' | 'ml' | 'ks' | 'stroužky'| 'špetka';
};



type IngredientAmount = {
  ingredientId: Id<"ingredients">;
  amount: number;
};

type Preparation = {
  firstStep: string;
  secondStep?: string;
  thirdStep?: string;
  fourthStep?: string;
}

export type Meal = {
  _id: Id<"meals">;
  name: string;
  types: MealType[];
  picture?: Id<"_storage"> | null;
  ingredients: IngredientAmount[];
  preparation: Preparation;
  servings: number; //pro kolik porcí jsou zadaná množství ingrediencí
};

export type PlannedMeal = {
  meal: Meal;
  servings: number;
};

type DayPlan = Partial<Record<MealType, PlannedMeal>>;

export type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type WeekPlan = Record<Day, DayPlan>;
*/
