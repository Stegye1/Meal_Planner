import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Meal } from "@/types";

/* ---------Typy-----------*/

type RecipeInput = Omit<Meal, "_id" | "pictureUrl">;

/*--------Uložení fotky do db a získání storageId--------*/

/**
 * Hook pro nahrání jednoho souboru a získání storageId
 * Použití:
 *   const { uploadImage, isLoading, error } = useUploadImage();
 *   const storageId = await uploadImage(file);
 */
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

/*---------Přidání receptu do db----------*/

// verze která už neřeší obrázek jako file, dostává storageId
export function useAddRecipeDB() {
  const addRecipeDB = useMutation(api.mutations.addRecipe.addRecipe);

  // Žádný upload tady – jen předání dat
  const addRecipe = async (data: RecipeInput) => {
    await addRecipeDB(data);
  };

  return { addRecipe };
}

/*---------------úprava existujícího receptu--------------*/

//TODO: je potřeba zařídit, aby se smazal předchozí obrázek, pokud se nahradí novým?

export function useUpdateRecipeDB() {
  const updateRecipeDB = useMutation(api.mutations.updateRecipe.updateRecipe);

  const updateRecipe = async (data: Meal) => {
    await updateRecipeDB(data);
  };

  return { updateRecipe };
}

/*

export function useUpdateRecipeDB() {
  const updateRecipe = useMutation(api.mutations.updateRecipe.updateRecipe);
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
    return storageIdJson.storageId as Id<"_storage">;
  }

  return {
    updateRecipe: async (data: {
      _id: Id<"meals">;
      name: string;
      types: ("breakfast" | "lunch" | "dinner")[];
      servings: number;
      picture?: Id<"_storage"> | File;
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
    }) => {
      let pictureStorageId: Id<"_storage"> | undefined = undefined;
      if (data.picture && data.picture instanceof File) {
        pictureStorageId = await uploadFile(data.picture);
      } else if (typeof data.picture === "string") {
        pictureStorageId = data.picture;
      }
      const convertedData = {
        ...data,
        picture: pictureStorageId,
      };
      const id = await updateRecipe(convertedData);
      return id;
    },
  };
}

*/

/*-------------získání obrázku z db podle id------------*/

export function useGetImageUrlDB(storageId: Id<"_storage"> | undefined) {
  const url = useQuery(
    api.queries.getImageUrl.getImageUrl,
    storageId ? { storageId } : "skip"
  );
  return url || null;
}

/*------------získání receptu z db podle id---------------*/

export function useGetRecipeDB(id: Id<"meals"> | null) {
  const recipe = useQuery(
    api.queries.getRecipe.getRecipe,
    id ? { id } : "skip"
  );
  const recipePictureId = recipe?.picture as Id<"_storage">;
  const imageUrl = useGetImageUrlDB(recipePictureId) || null;
  if (!recipe) return null;

  return {
    ...recipe,
    pictureUrl: imageUrl, // zde je již URL obrázku, které se dá použít pro zobrazení
  };
}

/*-------------získání všech receptů z db--------------*/

export function useGetAllRecipesDB() {
  const recipes = useQuery(api.queries.getAllRecipes.getAllRecipes);
  if (!recipes) return null;

  return recipes; // recepty se vrací se storageId obrázku, až když je chceme zobrazit použijeme useImageUrl
}
