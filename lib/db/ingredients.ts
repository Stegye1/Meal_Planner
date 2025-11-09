// lib/db/ingredients.ts
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

export function useAddIngredientDB() {
  const addIngredient = useMutation(api.mutations.addIngredient.addIngredient);

  return {
    addIngredient: async (data: {
      name: string;
      unit: "g" | "ml";
      nutrients: [number, number, number, number];
    }) => addIngredient(data),
  };
}


export function useAllIngredientsDB() {
  const getAllIngredients = useQuery(api.queries.getAllIngredients.getAllIngredients)
  return getAllIngredients
}



// import { api } from "../../convex/_generated/api";


// // lib/db/recipes.ts
// import { createIngredient } from "@/convex/mutations/createIngredient";
// import { useMutation } from "convex/react";



// export type MealType = "breakfast" | "lunch" | "dinner";

// export type Nutrients = [kcal: number, fat: number, carbohydrates: number, protein: number]

// export type DBIngredient = {
//   _id: string;
//   name: string;
//   unit: 'g' | 'ml' 
//   // jak naložit s jednotkami jako 'ks' | 'stroužky'| 'špetka' ? Potřebujeme je do receptů, ale pro 
//   // výpočet nutričních hodnot a pro výpočet množství do nákupního seznamu je potřebujeme mít převedené na g / ml
//   nutrients: Nutrients  //na 100g nebo 100ml
// };
 
// export const addIngredient = async (data: Omit<DBIngredient, "_id" | "createdAt">) => {
//  // const { createIngredient } = await import("@/convex/mutations/createIngredient");
//   const mutation = (await import("convex/react")).useMutation;
//   const m = mutation(createIngredient);
//   return m(data);
// };

