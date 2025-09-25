export type MealType = "breakfast" | "lunch" | "dinner";

export interface Meal {
  id: number;
  name: string;
  types: MealType[]; 
  ingredients: string[];
}

export type DailyPlan = Partial<Record<MealType, Meal>>;

export type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type WeekPlan = Record<Day, DailyPlan>;
