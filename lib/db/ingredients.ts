// lib/db/ingredients.ts
// import { api } from "@/convex/_generated/api";
// import { useMutation, useQuery } from "convex/react";
// import { Id } from "@/convex/_generated/dataModel";

/*---------------vložení nové ingredience------------*/

// export function useAddIngredientDB() {
//   const addIngredient = useMutation(api.mutations.addIngredient.addIngredient);

//   return {
//     addIngredient: async (data: {
//       name: string;
//       unit: "g" | "ml";
//       nutrients: number[];
//     }) => {
//       const id = await addIngredient(data);
//       return id; // vrací ID nové ingredience
//     },
//   };
// }

/*---------------úprava existující ingredience--------------*/

// export function useUpdateIngredientDB()  {
//   const updateIngredient = useMutation(api.mutations.updateIngredient.updateIngredient);

//   return {
//     updateIngredient: async (data: {
//       _id: Id<"ingredients">;
//       name: string;
//       unit: "g" | "ml";
//       nutrients: [number, number, number, number];
//     }) => {const id = await updateIngredient(data);
//       return id; } // vrací ID upravené ingredience
//   };
// }

/*---------------získání všech ingrediencí z db--------------*/

// export function useGetAllIngredientsDB() {
//   const ingredients = useQuery(api.queries.getAllIngredients.getAllIngredients, {})
// if (!ingredients) return null;
//   return ingredients
// }

/*----------------získání ingredience z db podle id-----------*/

// export function useGetIngredientDB(id: Id<"ingredients"> | null) {
//   const ingredient = useQuery(
//     api.queries.getIngredient.getIngredient,
//     id ? { id } : "skip"
//   );
//     if (!ingredient) return null;
//   return ingredient
// }
