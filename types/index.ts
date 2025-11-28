// typy pro frontend
import { Id } from "@/convex/_generated/dataModel";

export type MealType = "breakfast" | "lunch" | "dinner";

export type Nutrients = [kcal: number, fat: number, carbohydrates: number, protein: number];

export type Ingredient = {
  _id: Id<"ingredients">;
  name: string;
  unit: "g" | "ml";
  // jak naložit s jednotkami jako 'ks' | 'stroužky'| 'špetka' ? Potřebujeme je do receptů, ale pro
  // výpočet nutričních hodnot a pro výpočet množství do nákupního seznamu je potřebujeme mít převedené na g / ml
  nutrients: Nutrients; //na 100g nebo 100ml
};

export type IngredientAmount = {
  ingredientId: Id<"ingredients">;
  amount: number;
};

export type Preparation = {
  firstStep: string;
  secondStep?: string;
  thirdStep?: string;
  fourthStep?: string;
};

export type Meal = {
  _id: Id<"meals">;
  name: string;
  types: MealType[];
  picture?: Id<"_storage">; // storageId obrázku!
  //  pictureUrl?: string | null;
  ingredients: IngredientAmount[];
  nutrients: Nutrients; // na 1 porci
  preparation: Preparation;
  servings: number; //pro kolik porcí jsou zadaná množství ingrediencí
};

export type MealInput = Omit<Meal, "_id" | "pictureUrl">;

export type PlannedMeal = {
  meal: Meal;
  servings: number;
};

type DayPlan = Partial<Record<MealType, PlannedMeal>>;

export type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export type WeekPlan = Record<Day, DayPlan>;
