import { query } from "../_generated/server";

export const getAllIngredients = query(async (ctx) => {
  return await ctx.db.query("ingredients").collect();
});
