// convex/queries/getRecipe.ts
import { v } from "convex/values";
import { query } from "../_generated/server";

export const getMeal = query({
  args: {
    id: v.id("meals"),
  },
  handler: async (ctx, { id }) => {
    const meal = await ctx.db.get(id);
    return meal;
  },
});
