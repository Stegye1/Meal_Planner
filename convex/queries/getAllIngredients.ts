import { v } from "convex/values";
import { query } from "../_generated/server";

/*
export const getAllIngredients = query(async (ctx) => {
  return await ctx.db.query("ingredients").collect();
});
*/

export const getAllIngredients = query({
  args: {
    search: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { search, limit }) => {
    // Nejprve načteme všechny záznamy
    let allIngredients = await ctx.db.query("ingredients").collect();

    // Filtrování podle textu v názvu pomocí JavaScript includes
    if (search) {
      allIngredients = allIngredients.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Řazení podle name vzestupně
    allIngredients.sort((a, b) => a.name.localeCompare(b.name));

    // Aplikace limitu
    if (limit) {
      allIngredients = allIngredients.slice(0, limit);
    }

    return allIngredients;
  },
});
