import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const addMeal = mutation({
  args: {
    name: v.string(),
    types: v.array(
      v.union(v.literal("breakfast"), v.literal("lunch"), v.literal("dinner"))
    ),
    servings: v.float64(),
    picture: v.optional(v.id("_storage")),
    preparation: v.object({
      firstStep: v.string(),
      secondStep: v.optional(v.string()),
      thirdStep: v.optional(v.string()),
      fourthStep: v.optional(v.string()),
    }),
    ingredients: v.array(
      v.object({
        ingredientId: v.id("ingredients"),
        amount: v.float64(),
      })
    ),
    nutrients: v.array(v.float64()), // kcal, tuky, sacharidy, bílkoviny na porci
  },
  handler: async (
    ctx,
    { name, types, servings, preparation, ingredients, nutrients, picture }
  ) => {
    return await ctx.db.insert("meals", {
      name,
      types,
      servings,
      preparation,
      ingredients,
      nutrients,
      picture,
    });
  },
});
