//TYPY ODVOZENÉ Z DATABÁZE
import { Id, Doc } from "@/convex/_generated/dataModel";

export type Ingredient = Doc<"ingredients">;

export type Meal = Doc<"meals">;
export type MealFormData = Omit<Meal, "_id" | "authorId" | "createdAt" | "updatedAt">;




// typy pro frontend
// // TODO: využívat typy z databáze pro frontend

//  export type AltUnit = { name: string; unitsPerAltUnit: number };

// import { Id } from "@/convex/_generated/dataModel";

export type MealType = "breakfast" | "lunch" | "dinner";

// export type Nutrients = {kcal: number, fat: number, carbohydrates: number, protein: number, sugar: number,
//       fiber: number};

// export type Ingredient = {
//   _id: Id<"ingredients">;
//   name: string;
//   unit: "g" | "ml";
//   // jak naložit s jednotkami jako 'ks' | 'stroužky'| 'špetka' ? Potřebujeme je do receptů, ale pro
//   // výpočet nutričních hodnot a pro výpočet množství do nákupního seznamu je potřebujeme mít převedené na g / ml
//   altUnits?: AltUnit[]
//   nutrients: Nutrients; //na 100g nebo 100ml
// };

// export type IngredientAmount = {
//   ingredientId: Id<"ingredients">;
//   amount: number;
//     // altUnitIndex?: number;
// };

// export type Preparation = {
//   firstStep: string;
//   secondStep?: string;
//   thirdStep?: string;
//   fourthStep?: string;
// };

// export type Meal = {
//   _id: Id<"meals">;
//   name: string;
//   types: MealType[];
//   pictureStorageId?: Id<"_storage">; // storageId obrázku!
//   //  pictureUrl?: string | null;
//   ingredients: IngredientAmount[];
//   nutrients: Nutrients; // na 1 porci
//   preparation: Preparation;
//   servings: number; //pro kolik porcí jsou zadaná množství ingrediencí
// };

// export type MealInput = Omit<Meal, "_id">;

 export type PlannedMeal = {
     meal: Meal;
   servings: number;
 };

type DayPlan = Partial<Record<MealType, PlannedMeal>>;

export type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

 export type WeekPlan = Record<Day, DayPlan>;
