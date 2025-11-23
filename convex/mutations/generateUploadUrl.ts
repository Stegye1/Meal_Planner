import { mutation } from "../_generated/server";

export const generateUploadUrl = mutation(async ({ storage }) => {
  // Vygenerování jednorázové URL pro nahrání souboru
  return await storage.generateUploadUrl();
});
