// convex/queries/getRecipe.ts
import { query } from "../_generated/server";
import { v } from "convex/values";

export const getMeal = query({
  args: {
    id: v.id("meals"),
  },
  handler: async (ctx, { id }) => {
    const meal = await ctx.db.get(id);
    return meal; 
  },
});
