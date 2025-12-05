import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const updateMeal = mutation({
  args: {
    _id: v.id("meals"),
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
    const { _id, pictureStorageId, ingredients, ...rest } = args;

    // 1️⃣ Získáme původní záznam
    const existingMeal = await ctx.db.get(_id);
    if (!existingMeal) throw new Error("Meal not found");

    // 2️⃣ Pokud se změnil obrázek, smažeme starý
    if (
      existingMeal.pictureStorageId &&
      pictureStorageId &&
      existingMeal.pictureStorageId !== pictureStorageId
    ) {
      try {
        await ctx.storage.delete(existingMeal.pictureStorageId);
      } catch (e) {
        console.warn("⚠️ Nepodařilo se smazat původní obrázek:", e);
      }
    }

    // 3️⃣ Aktualizujeme záznam v tabulce meals
    await ctx.db.patch(_id, {
      ...rest,
      ingredients,
      pictureStorageId,
      updatedAt: Date.now(),
    });

    // 4️⃣ Aktualizace spojující tabulky (mealIngredients)
    // Nejprve smažeme staré vazby
    const oldRelations = await ctx.db
      .query("mealIngredients")
      .withIndex("by_meal", (q) => q.eq("mealId", _id))
      .collect();

    await Promise.all(oldRelations.map((r) => ctx.db.delete(r._id)));

    // Poté vložíme nové
    await Promise.all(
      ingredients.map((i) =>
        ctx.db.insert("mealIngredients", {
          mealId: _id,
          ingredientId: i.ingredientId,
        })
      )
    );

    return _id;
  },
});



// import { v } from "convex/values";
// import { mutation } from "../_generated/server";

// export const updateMeal = mutation({
//   args: {
//     _id: v.id("meals"),
//     name: v.string(),
//     types: v.array(v.union(v.literal("breakfast"), v.literal("lunch"), v.literal("dinner"))),
//     servings: v.number(),
//     picture: v.optional(v.id("_storage")),
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
//     nutrients: v.array(v.number()),
//   },

//   handler: async (ctx, { _id, name, types, servings, picture, preparation, ingredients, nutrients }) => {
//     await ctx.db.patch(_id, {
//       name,
//       types,
//       servings,
//       picture,
//       preparation,
//       ingredients,
//       nutrients,
//     });
//     return _id;
//   },
// });
