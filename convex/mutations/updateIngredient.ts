import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const updateIngredient = mutation({
  args: {
    _id: v.id("ingredients"),  // ID existující ingredience
    name: v.string(),
    unit: v.union(v.literal("g"), v.literal("ml")),
    nutrients: v.array(v.number()),
  },
  handler: async (ctx, { _id, name, unit, nutrients }) => {
    await ctx.db.patch(_id, {
      name,
      unit,
      nutrients,
    });
    return _id;
  }
});
