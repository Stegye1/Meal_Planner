import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const updateIngredient = mutation({
  args: {
    _id: v.id("ingredients"), // ID existující ingredience
     name: v.string(),
    unit: v.union(v.literal("g"), v.literal("ml")),
    nutrients: v.object({
      kcal: v.number(),
      protein: v.number(),
      fat: v.number(),
      carbohydrates: v.number(),
      sugar: v.number(),
      fiber: v.number(),
    }),
    altUnits: v.optional(
      v.array(
        v.object({
          name: v.string(),
          unitsPerAltUnit: v.number(),
        })
      )
    ),
  
  },
  handler: async (ctx, { _id, name, unit, altUnits, nutrients }) => {
    await ctx.db.patch(_id, {
      name,
      unit,
      altUnits,
      nutrients,
    });
    return _id;
  },
});
