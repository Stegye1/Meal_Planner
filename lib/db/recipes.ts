import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export type RecipeInput = {
  name: string;
  types: ("breakfast" | "lunch" | "dinner")[];
  servings: number;
  picture?: Id<"_storage">; // z formuláře přijde soubor, ten převedeme na storageId uloženého obrázku
  preparation: {
    firstStep: string;
    secondStep?: string;
    thirdStep?: string;
    fourthStep?: string;
  };
  ingredients: {
    ingredientId: Id<"ingredients">;
    amount: number;
  }[];
  nutrients: number[];
};

export type RecipeInputWithFile = Omit<RecipeInput, "picture"> & {
  picture?: File; // zde je File ze vstupu formuláře
};

export function useAddRecipeDB() {
  const addRecipe = useMutation(api.mutations.addRecipe.addRecipe);
  const generateUploadUrl = useMutation(
    api.mutations.generateUploadUrl.generateUploadUrl
  );

  async function uploadFile(file: File): Promise<Id<"_storage">> {
    const uploadUrl = await generateUploadUrl();

    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      headers: { "Content-Type": file.type },
      body: file,
    });

    const storageIdJson = await uploadResponse.json();

    // Přetypování na branded typ Id<_storage>
    const storageId = storageIdJson.storageId as Id<"_storage">;

    return storageId;
  }

  return {
    addRecipe: async (data: RecipeInputWithFile) => {
      let pictureStorageId: Id<"_storage"> | undefined = undefined;

      if (data.picture) {
        pictureStorageId = await uploadFile(data.picture);
      }

      // Vytvoříme objekt odpovídající mutaci, kde picture je storageId string nebo undefined
      const convertedData: RecipeInput = {
        ...data,
        picture: pictureStorageId,
      };

      // Odebereme properties, které nechceme (např. picture jako File)
      delete convertedData.picture;

      // Zavoláme mutaci s upravenými daty, kde picture je string
      await addRecipe({ ...convertedData, picture: pictureStorageId });
    },
  };
}

/*
export function useRecipe(id: string | undefined) {
  const recipe = useQuery(api.queries.getRecipe.getRecipe, id ? { id: id as Id<"meals">} : "skip");
  return recipe || null;
}
*/
export function useImageUrl(storageId: Id<"_storage"> | undefined) {
  const url = useQuery(
    api.queries.getImageUrl.getImageUrl,
    storageId ? { storageId } : "skip"
  );
  return url || null;
}
/*
export function useAllRecipesDB() {
  const getAllRecipes = useQuery(api.queries.getAllRecipes.getAllRecipes);
  return getAllRecipes || null;
}
*/
export function useRecipe(id: Id<"meals"> | undefined) {
  const recipe = useQuery(
    api.queries.getRecipe.getRecipe,
    id ? { id } : "skip"
  );
  const recipePictureId = recipe?.picture as Id<"_storage">;
  const imageUrl = useImageUrl(recipePictureId);
  if (!recipe) return null;

  return {
    ...recipe,
    picture: imageUrl, // zde je již URL obrázku, které můžete použít pro zobrazení
  };
}

export function useAllRecipesDB() {
  const recipes = useQuery(api.queries.getAllRecipes.getAllRecipes);
  if (!recipes) return null;

  return recipes;
}
