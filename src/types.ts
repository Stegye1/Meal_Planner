export type MealType = "breakfast" | "lunch" | "dinner";

export type Ingredient = {
  id: string;
  name: string;
  unit: 'g' | 'ml' | 'ks' | 'stroužky'| 'špetka';
};

type IngredientAmount = {
  ingredientId: string;
  amount: number;
};

type Preparation = {
  firstStep: string;
  secondStep?: string;
  thirdStep?: string;
  fourthStep?: string;
}

export type Meal = {
  id: string;
  name: string;
  types: MealType[];
  imageUrl: string | null;
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
