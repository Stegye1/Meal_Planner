// convex/queries/getRecipe.ts
import { query } from "../_generated/server";
import { v } from "convex/values";

export const getIngredient = query({
  args: {
    id: v.id("ingredients"),
  },
  handler: async (ctx, { id }) => {
    const ingredient = await ctx.db.get(id);
    return ingredient; 
  },
});
