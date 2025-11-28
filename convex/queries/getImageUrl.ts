import { v } from "convex/values";
import { query } from "../_generated/server";

export const getImageUrl = query({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, { storageId }) => {
    const url = await ctx.storage.getUrl(storageId);
    return url; // vrací přístupnou URL nebo null
  },
});
