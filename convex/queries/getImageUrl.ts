import { query } from "../_generated/server";
import { v } from "convex/values";

export const getImageUrl = query({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, { storageId }) => {
    const url = await ctx.storage.getUrl(storageId);
    return url; // vrací přístupnou URL nebo null
  },
});

