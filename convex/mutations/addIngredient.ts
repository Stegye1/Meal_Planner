import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const addIngredient = mutation({
  args: {
    name: v.string(),
    unit: v.union(v.literal("g"), v.literal("ml")),
    nutrients: v.array(v.number()),
  },
  handler: async (ctx, { name, unit, nutrients }) => {
    return await ctx.db.insert("ingredients", {
      name,
      unit,
      nutrients
    });   
  }
});
// insert automaticky vrací id nové položky, není potřeba to tam psát