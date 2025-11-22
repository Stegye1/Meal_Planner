"use client";

import { useParams, useRouter } from "next/navigation";

import "@/app/recipes/Recipes.css";

import {
  useAddRecipeDB,
  useGetImageUrlDB,
  useGetRecipeDB,
  useUpdateRecipeDB,
  useUploadImageDB,
} from "../../../lib/db/recipes"; // hook pro uložení receptu
import { IngredientAmount, Meal, MealType, Preparation } from "@/types";
import { Id } from "@/convex/_generated/dataModel";
import { useGetAllIngredientsDB } from "@/lib/db/ingredients";
import { useState } from "react";

export const mealTypes: { label: string; value: MealType }[] = [
  { label: "Snídaně", value: "breakfast" },
  { label: "Oběd", value: "lunch" },
  { label: "Večeře", value: "dinner" },
];

export default function RecipeForm() {
  const router = useRouter();

  const { uploadImage } = useUploadImageDB();
  const { addRecipe } = useAddRecipeDB();
  const { updateRecipe } = useUpdateRecipeDB();

  const params = useParams();
  const id = params.id as Id<"meals"> | null;

  // pokud id není nebo je "ingredient-form", bereme to jako NEW
  // const isNew = !id;

  const recipe: Meal | null = useGetRecipeDB(id);

  // Stav formuláře
  const [name, setName] = useState(recipe ? recipe.name : "");
  const [types, setTypes] = useState<MealType[]>(recipe ? recipe.types : []);
  const [servings, setServings] = useState(recipe ? recipe.servings : 1);
  const [picture, setPicture] = useState<Id<"_storage"> | undefined>(
    recipe
      ? recipe.picture
        ? (recipe.picture as Id<"_storage">)
        : undefined
      : undefined
  ); // Získáme URL přímo z hooku – vždy aktuální!
  const pictureUrl = useGetImageUrlDB(picture as Id<"_storage">); // pokud je picture storageId, získáme URL;
  const [prepStepsArray, setPrepStepsArray] = useState<string[]>(
    recipe
      ? [
          recipe.preparation.firstStep,
          recipe.preparation.secondStep || "",
          recipe.preparation.thirdStep || "",
          recipe.preparation.fourthStep || "",
        ].filter(Boolean) // odstraní prázdné trailing kroky
      : [""]
  );
  const [selectedIngredients, setSelectedIngredients] = useState<
    IngredientAmount[] // pořešit ingredience
  >(recipe ? recipe.ingredients : []);

  // Nutriční hodnoty spočítané na 1 porci: [kcal, tuky, sacharidy, bílkoviny]
  const [nutrientsPerServing, setNutrientsPerServing] = useState<
    [number, number, number, number]
  >([0, 0, 0, 0]);

  // Načtení všech ingrediencí z Convexu
  const allIngredients = useGetAllIngredientsDB();

  // Přidání ingredience do seznamu
  const addIngredient = () => {
    setSelectedIngredients((prev) => [
      ...prev,
      { ingredientId: "" as Id<"ingredients">, amount: 0 },
    ]);
  };

  // Aktualizace ingredience nebo množství
  const updateIngredient = (
    index: number,
    field: "ingredientId" | "amount",
    value: string | number
  ) => {
    setSelectedIngredients((prev) =>
      prev.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing))
    );
  };

  // Odebrání ingredience ze seznamu
  const removeIngredient = (index: number) => {
    setSelectedIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  // Přepínání typu jídla
  const toggleType = (type: MealType) => {
    setTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // Přidání kroku přípravy
  const addPrepStep = () => {
    if (prepStepsArray.length < 4) {
      setPrepStepsArray((prev) => [...prev, ""]);
    }
  };

  // Aktualizace kroku přípravy
  const updatePrepStep = (index: number, value: string) => {
    setPrepStepsArray((prev) =>
      prev.map((step, i) => (i === index ? value : step))
    );
  };

  const calculateNutrients = () => {
    if (!allIngredients) return;

    const totalNutrients = selectedIngredients.reduce(
      (totals, ing) => {
        const ingredient = allIngredients.find(
          (i) => i._id === ing.ingredientId
        );
        if (!ingredient) return totals;
        const amount = ing.amount || 0;
        const nutrients = ingredient.nutrients || [0, 0, 0, 0];
        return totals.map(
          (total, idx) => total + (amount * nutrients[idx]) / 100
        ) as [number, number, number, number];
      },
      [0, 0, 0, 0] as [number, number, number, number]
    );

    if (servings > 0) {
      setNutrientsPerServing(
        totalNutrients.map((n) => n / servings) as [
          number,
          number,
          number,
          number,
        ]
      );
    } else {
      setNutrientsPerServing([0, 0, 0, 0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPicture(undefined);
      return;
    }

    try {
      const storageId = (await uploadImage(file)) as Id<"_storage">; // ← vrací Id<"_storage">
      setPicture(storageId);
      // pictureUrl se aktualizuje automaticky díky useGetImageUrlDB!
    } catch (err) {
      alert("Nepodařilo se nahrát obrázek");
      console.error(err);
    }
  };

  // const handleConfirm = async () => {
  //   if (!nutrientsPerServing) {
  //     alert("Nejdříve spočítejte nutriční hodnoty.");
  //     return;
  //   }

  //   try {
  //     await addRecipe({
  //       name,
  //       types,
  //       servings,
  //       picture: picture || undefined,
  //       ingredients: selectedIngredients,
  //       nutrients: nutrientsPerServing,
  //       preparation: {
  //         firstStep: prepSteps.firstStep || "",
  //         secondStep: prepSteps.secondStep,
  //         thirdStep: prepSteps.thirdStep,
  //         fourthStep: prepSteps.fourthStep,
  //       },
  //     });
  //     router.push("/recipes");
  //   } catch (error) {
  //     alert("Chyba při ukládání receptu");
  //     console.error(error);
  //   }
  // };

  const toPreparationObject = (steps: string[]): Preparation => {
    return {
      firstStep: steps[0] ?? "",
      secondStep: steps[1] || undefined,
      thirdStep: steps[2] || undefined,
      fourthStep: steps[3] || undefined,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !name.trim() ||
      types.length === 0 ||
      selectedIngredients.length === 0
    ) {
      alert("Vyplňte všechny povinné údaje a přidejte ingredience");
      return;
    }

    if (
      selectedIngredients.length > 0 &&
      nutrientsPerServing.every((n) => n === 0)
    ) {
      alert("Nejdříve spočítejte nutriční hodnoty.");
      return;
    }

    const preparationObj = toPreparationObject(prepStepsArray);

    const payload: Omit<Meal, "_id"> = {
      name,
      types,
      servings,
      picture: picture ?? undefined,
      ingredients: selectedIngredients,
      nutrients: nutrientsPerServing,
      preparation: preparationObj,
    };

    try {
      if (!id) {
        await addRecipe(payload);
      } else {
        await updateRecipe({ _id: id as Id<"meals">, ...payload });
      }

      router.push("/recipes");
    } catch (error) {
      alert("Chyba při ukládání receptu");
      console.error(error);
    }
  };

  /*
  // Odeslání formuláře
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Základní validace (například alespoň 1 ingredience)
    if (
      !name.trim() ||
      types.length === 0 ||
      selectedIngredients.length === 0
    ) {
      alert("Vyplňte všechny povinné údaje a přidejte ingredience");
      return;
    }

    try {
      await addRecipe({
        name,
        types,
        servings,
        picture: picture || undefined,
        ingredients: selectedIngredients,
        nutrients: nutrientsPerServing,
        preparation: {
          firstStep: prepSteps.firstStep || "",
          secondStep: prepSteps.secondStep,
          thirdStep: prepSteps.thirdStep,
          fourthStep: prepSteps.fourthStep,
        },
      });
      router.push("/recipes");
    } catch (error) {
      alert("Chyba při ukládání receptu");
      console.error(error);
    }
  };
*/
  // Výpis dat pro debug
  // console.log("Nutriční hodnoty na porci:", nutrientsPerServing);

  return (
    <form className="app-form" onSubmit={handleSubmit}>
      {/* Název receptu */}
      <div className="form-group">
        <label htmlFor="recipe-name">Název receptu</label>
        <input
          id="recipe-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="app-input"
          required
        />
      </div>

      {/* Typy jídel */}
      <fieldset className="form-group">
        <legend>Typy jídel</legend>
        <div className="meal-types-items">
          {mealTypes.map(({ value, label }) => (
            <label key={value}>
              <input
                type="checkbox"
                checked={types.includes(value)}
                onChange={() => toggleType(value)}
              />{" "}
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Počet porcí */}
      <div className="form-group">
        <label htmlFor="servings">Počet porcí</label>
        <input
          id="servings"
          type="number"
          min={1}
          value={servings}
          onChange={(e) => setServings(Number(e.target.value))}
          className="app-input small"
          required
        />
      </div>

      {/* Obrázek */}
      {pictureUrl && (
        <img
          src={pictureUrl}
          alt="Náhled obrázku"
          style={{ maxWidth: "200px", marginTop: 10 }}
        />
      )}

      <div className="form-group">
        <label htmlFor="image-url">URL obrázku (volitelné)</label>
        <input
          id="recipe-image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          placeholder="Vyberte obrázek"
          className="app-input"
        />
      </div>

      {/* Ingredience */}
      <fieldset className="form-group">
        <legend>Ingredience</legend>
        {selectedIngredients.map((ing, i) => (
          <div key={i} className="ingredient-row">
            <select
              value={ing.ingredientId}
              onChange={(e) =>
                updateIngredient(i, "ingredientId", e.target.value)
              }
              className="app-input"
              required
            >
              <option value="">Vyber ingredienci</option>
              {allIngredients?.map(({ _id, name }) => (
                <option key={_id} value={_id}>
                  {name}
                </option>
              ))}
            </select>
            <input
              type="number"
              min={0}
              step={0.1}
              value={ing.amount}
              onChange={(e) =>
                updateIngredient(i, "amount", Number(e.target.value))
              }
              placeholder="množství"
              className="app-input small"
              required
            />
            <button
              type="button"
              onClick={() => removeIngredient(i)}
              className="button remove-btn"
            >
              ×
            </button>
          </div>
        ))}
        <button type="button" onClick={addIngredient} className="button">
          Přidat ingredienci
        </button>
      </fieldset>

      {/* Postup přípravy */}
      <fieldset className="form-group">
        <legend>Postup přípravy</legend>

        {prepStepsArray.map((step, i) => (
          <div key={i} className="form-group">
            <label>Krok {i + 1}</label>
            <textarea
              value={step}
              onChange={(e) => updatePrepStep(i, e.target.value)}
              rows={3}
              placeholder={`Popis kroku ${i + 1}`}
              className="app-input"
              required={i === 0}
            />
          </div>
        ))}

        {prepStepsArray.length < 4 && (
          <button type="button" onClick={addPrepStep} className="button">
            Přidat další krok
          </button>
        )}
      </fieldset>

      {/*    <button type="submit" className="action-button">
        Uložit recept
      </button>  */}

      <button type="button" onClick={calculateNutrients} className="button">
        Spočítat nutriční hodnoty
      </button>

      {nutrientsPerServing && (
        <div className="nutrients-preview">
          <p>Kcal na porci: {nutrientsPerServing[0].toFixed(1)}</p>
          <p>Tuky na porci: {nutrientsPerServing[1].toFixed(1)} g</p>
          <p>Sacharidy na porci: {nutrientsPerServing[2].toFixed(1)} g</p>
          <p>Bílkoviny na porci: {nutrientsPerServing[3].toFixed(1)} g</p>

          <button
            type="button"
            onClick={handleSubmit}
            className="action-button"
          >
            Uložit recept
          </button>
        </div>
      )}
    </form>
  );
}
