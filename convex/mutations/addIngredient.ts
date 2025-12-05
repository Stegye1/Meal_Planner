/*
import { v } from "convex/values";
import { mutation } from "../_generated/server";

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
      nutrients,
    });
  },
});
// insert automaticky vrací id nové položky, není potřeba to tam psát
*/

import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const addIngredient = mutation({
  args: {
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
  handler: async (ctx, args) => {
    return await ctx.db.insert("ingredients", args);
  },
});

