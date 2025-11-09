import { query } from "../_generated/server";

export const getAllRecipes = query(async (ctx) => {
  return await ctx.db.query("meals").collect();
});