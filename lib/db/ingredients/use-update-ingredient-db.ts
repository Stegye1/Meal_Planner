import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
/*
export function useUpdateIngredientDB() {
  const updateIngredient = useMutation(api.mutations.updateIngredient.updateIngredient);

  return {
    updateIngredient: async (data: {
      _id: Id<"ingredients">;
      name: string;
      unit: "g" | "ml";
      nutrients: [number, number, number, number];
    }) => {
      const id = await updateIngredient(data);
      return id;
    }, // vrací ID upravené ingredience
  };
}
*/


export function useUpdateIngredientDB() {
  const updateIngredient = useMutation(api.mutations.updateIngredient.updateIngredient); 
  return { updateIngredient };
}
