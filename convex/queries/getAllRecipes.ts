import { query } from "../_generated/server";

export const getAllRecipes = query(async (ctx) => {
const allRecipes = await ctx.db.query("meals").collect();   

   // Řazení podle name vzestupně
    allRecipes.sort((a, b) => a.name.localeCompare(b.name));

    return allRecipes
});