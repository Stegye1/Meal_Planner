import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function useAddIngredientDB() {
  const addIngredient = useMutation(api.mutations.addIngredient.addIngredient);

  return {
    addIngredient: async (data: { name: string; unit: "g" | "ml"; nutrients: number[] }) => {
      const id = await addIngredient(data);
      return id; // vrací ID nové ingredience
    },
  };
}
