import { query } from "../_generated/server";

export const getAllMeals = query(async (ctx) => {
  const allMeals = await ctx.db.query("meals").collect();

  // Řazení podle name vzestupně
  allMeals.sort((a, b) => a.name.localeCompare(b.name));

  return allMeals;
});
