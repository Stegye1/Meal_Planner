import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const updateMeal = mutation({
  args: {
    _id: v.id("meals"),  
    name: v.string(),
    types: v.array(v.union(v.literal("breakfast"), v.literal("lunch"), v.literal("dinner"))),
    servings: v.number(),
    picture: v.optional(v.id("_storage")),
    preparation: v.object({
      firstStep: v.string(),
      secondStep: v.optional(v.string()),
      thirdStep: v.optional(v.string()),
      fourthStep: v.optional(v.string()),
    }),
    ingredients: v.array(v.object({
      ingredientId: v.id("ingredients"),
      amount: v.number()
    })),
    nutrients: v.array(v.number()),
  },

  handler: async (ctx, { _id, name, types, servings, picture, preparation, ingredients, nutrients }) => {
    await ctx.db.patch(_id, {
      name,
      types,
      servings,
      picture,
      preparation,
      ingredients,
      nutrients
    });
    return _id;
  }
});
