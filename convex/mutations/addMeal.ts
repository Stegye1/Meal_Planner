// import { v } from "convex/values";
// import { mutation } from "../_generated/server";

// export const addMeal = mutation({
//   args: {
//     name: v.string(),
//     types: v.array(v.union(v.literal("breakfast"), v.literal("lunch"), v.literal("dinner"))),
//     servings: v.number(),
//     pictureStorageId: v.optional(v.id("_storage")),
//     preparation: v.object({
//       firstStep: v.string(),
//       secondStep: v.optional(v.string()),
//       thirdStep: v.optional(v.string()),
//       fourthStep: v.optional(v.string()),
//     }),
//     ingredients: v.array(
//       v.object({
//         ingredientId: v.id("ingredients"),
//         amount: v.number(),
//       }),
//     ),
//     nutrients: v.object({
//       kcal: v.number(),
//       protein: v.number(),
//       fat: v.number(),
//       carbohydrates: v.number(),
//       sugar: v.number(),
//       fiber: v.number(),
//     }), // kcal, tuky, sacharidy, bílkoviny na porci
//   },
//   handler: async (ctx, { name, types, servings, preparation, ingredients, nutrients, pictureStorageId }) => {
//     return await ctx.db.insert("meals", {
    
//       name,
//       types,
//       servings,
//       preparation,
//       ingredients,
//       nutrients,
//       pictureStorageId,
//       authorId: authorId ?? null,
//   createdAt: Date.now(),
//     });
//   },
// });
import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const addMeal = mutation({
  args: {
    name: v.string(),
    types: v.array(
      v.union(v.literal("breakfast"), v.literal("lunch"), v.literal("dinner"))
    ),
    servings: v.number(),
    pictureStorageId: v.optional(v.id("_storage")), 
    preparation: v.object({
      firstStep: v.string(),
      secondStep: v.optional(v.string()),
      thirdStep: v.optional(v.string()),
      fourthStep: v.optional(v.string()),
    }),
    ingredients: v.array(
      v.object({
        ingredientId: v.id("ingredients"),
        amount: v.number(),
      })
    ),
    nutrients: v.object({
      kcal: v.number(),
      protein: v.number(),
      fat: v.number(),
      carbohydrates: v.number(),
      sugar: v.number(),
      fiber: v.number(),
    }),
  },

  handler: async (ctx, args) => {
   
    const mealId = await ctx.db.insert("meals", {
      ...args,
      createdAt: Date.now(),
      // authorId: ctx.auth.getUserIdentity()?.subject, // připraveno pro autentizaci
    });

    // vytvoření záznamů ve spojující tabulce
    await Promise.all(
      args.ingredients.map((i) =>
        ctx.db.insert("mealIngredients", {
          mealId,
          ingredientId: i.ingredientId,
        })
      )
    );

 
    return mealId;
  },
});
