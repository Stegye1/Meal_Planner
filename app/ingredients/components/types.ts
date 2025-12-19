export type IngredientFormData = {
  name: string;
  unit: "g" | "ml";
  altUnits: Array<{ name: string; unitsPerAltUnit: number | undefined }>;
  nutrients: {
    kcal: number | undefined;
    protein: number | undefined;
    fat: number | undefined;
    carbohydrates: number | undefined;
    sugar: number | undefined;
    fiber: number | undefined;
  };
};
