// types.ts
export type MealType = 'breakfast' | 'lunch' | 'dinner';

export interface Meal {
  id: number;
  name: string;
  types: MealType[];  // kde se má jídlo nabízet
  ingredients: string[];
}

export interface DailyPlan {
  breakfast?: Meal;
  lunch?: Meal;
  dinner?: Meal;
}

export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type WeekPlan = {
  [day in Day]: DailyPlan;
}
