import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";

export function useUploadImageDB() {
  const generateUploadUrl = useMutation(
    api.mutations.generateUploadUrl.generateUploadUrl
  );

  const uploadImage = async (file: File): Promise<Id<"_storage">> => {
    // 1. Získáme upload URL
    const uploadUrl = await generateUploadUrl();

    // 2. Nahrajeme soubor
    const result = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });

    if (!result.ok) {
      throw new Error("Nepodařilo se nahrát obrázek");
    }

    // 3. Získáme storageId
    const { storageId } = await result.json();
    return storageId as Id<"_storage">;
  };

  return { uploadImage };
}
