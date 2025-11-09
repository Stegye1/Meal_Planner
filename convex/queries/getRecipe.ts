// convex/queries/getRecipe.ts
import { query } from "../_generated/server";
import { v } from "convex/values";

export const getRecipe = query({
  args: {
    id: v.id("meals"),
  },
  handler: async (ctx, { id }) => {
    const recipe = await ctx.db.get(id);
    return recipe; // vrací celý včetně { picture: storageId }
  },
});
