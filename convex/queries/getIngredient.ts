// convex/queries/getRecipe.ts
import { v } from "convex/values";
import { query } from "../_generated/server";

export const getIngredient = query({
  args: {
    id: v.id("ingredients"),
  },
  handler: async (ctx, { id }) => {
    const ingredient = await ctx.db.get(id);
    return ingredient;
  },
});
