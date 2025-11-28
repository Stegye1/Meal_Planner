import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const deleteImage = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, { storageId }) => {
    await ctx.storage.delete(storageId);

    return true;
  },
});
