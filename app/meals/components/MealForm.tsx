"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import "@/app/meals/Meals.css";
import { Id } from "@/convex/_generated/dataModel";
import { useGetImageUrlDB } from "@/lib/db/images/use-get-image-url-db";
import { useUploadImageDB } from "@/lib/db/images/use-upload-image-db";
import { useGetAllIngredientsDB } from "@/lib/db/ingredients/use-get-all-ingredients-db";
import { useAddMealDB } from "@/lib/db/meals/use-add-meal-db";
import { useGetMealDB } from "@/lib/db/meals/use-get-meal-db";
import { useUpdateMealDB } from "@/lib/db/meals/use-update-meal-db";
import { IngredientAmount, Meal, MealType, Nutrients, Preparation } from "@/types";
import Image from "next/image";

export const mealTypes: { label: string; value: MealType }[] = [
  { label: "Snídaně", value: "breakfast" },
  { label: "Oběd", value: "lunch" },
  { label: "Večeře", value: "dinner" },
];

export default function MealForm() {
  const router = useRouter();

  const { uploadImage } = useUploadImageDB();
  const { addMeal } = useAddMealDB();
  const { updateMeal } = useUpdateMealDB();

  const params = useParams();
  const id = params.id ? params.id != "new-meal" ? params.id as Id<"meals"> : null : null;

  // pokud id není nebo je "ingredient-form", bereme to jako NEW
  // const isNew = !id;

  const meal: Meal | null = useGetMealDB(id);

  // Stav formuláře
  const [name, setName] = useState(meal ? meal.name : "");
  const [types, setTypes] = useState<MealType[]>(meal ? meal.types : []);
  const [servings, setServings] = useState(meal ? meal.servings : 1);
  const [pictureStorageId, setPictureStorageId] = useState<Id<"_storage"> | undefined>(
    meal ? (meal.pictureStorageId ? (meal.pictureStorageId as Id<"_storage">) : undefined) : undefined,
  ); // Získáme URL přímo z hooku – vždy aktuální!
  const pictureUrl = useGetImageUrlDB(pictureStorageId as Id<"_storage">); // pokud je picture storageId, získáme URL;
  const [prepStepsArray, setPrepStepsArray] = useState<string[]>(
    meal
      ? [
          meal.preparation.firstStep,
          meal.preparation.secondStep || "",
          meal.preparation.thirdStep || "",
          meal.preparation.fourthStep || "",
        ].filter(Boolean) // odstraní prázdné trailing kroky
      : [""],
  );
  const [selectedIngredients, setSelectedIngredients] = useState<
    IngredientAmount[] // pořešit ingredience
  >(meal ? meal.ingredients : []);

  // Nutriční hodnoty spočítané na 1 porci: [kcal, tuky, sacharidy, bílkoviny]

  const emptyNutrients: Nutrients = { kcal: 0, fat: 0, carbohydrates: 0, protein: 0, sugar: 0, fiber: 0 };

const [nutrientsPerServing, setNutrientsPerServing] = useState<Nutrients>(emptyNutrients);

  // Načtení všech ingrediencí z Convexu
  const allIngredients = useGetAllIngredientsDB();

  // Přidání ingredience do seznamu
  const addIngredient = () => {
    setSelectedIngredients((prev) => [...prev, { ingredientId: "" as Id<"ingredients">, amount: 0 }]);
  };

  // Aktualizace ingredience nebo množství
  const updateIngredient = (index: number, field: "ingredientId" | "amount", value: string | number) => {
    setSelectedIngredients((prev) => prev.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing)));
  };

  // Odebrání ingredience ze seznamu
  const removeIngredient = (index: number) => {
    setSelectedIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  // Přepínání typu jídla
  const toggleType = (type: MealType) => {
    setTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  // Přidání kroku přípravy
  const addPrepStep = () => {
    if (prepStepsArray.length < 4) {
      setPrepStepsArray((prev) => [...prev, ""]);
    }
  };

  // Aktualizace kroku přípravy
  const updatePrepStep = (index: number, value: string) => {
    setPrepStepsArray((prev) => prev.map((step, i) => (i === index ? value : step)));
  };

 const calculateNutrients = () => {
  if (!allIngredients) return;

  // Spočítáme celkové nutrienty
  const totalNutrients = selectedIngredients.reduce<Nutrients>(
    (totals, ing) => {
      const ingredient = allIngredients.find((i) => i._id === ing.ingredientId);
      if (!ingredient) return totals;
      const amount = ing.amount || 0;

      // Předpokládáme, že ingredient.nutrients má typ Nutrients nebo podobný objekt
      const nutrients = ingredient.nutrients || emptyNutrients;

      return {
        kcal: totals.kcal + (amount * nutrients.kcal) / 100,
        fat: totals.fat + (amount * nutrients.fat) / 100,
        carbohydrates: totals.carbohydrates + (amount * nutrients.carbohydrates) / 100,
        protein: totals.protein + (amount * nutrients.protein) / 100,
        sugar: totals.sugar + (amount * nutrients.sugar) / 100,
        fiber: totals.fiber + (amount * nutrients.fiber) / 100,
      };
    },
    emptyNutrients,
  );

  if (servings > 0) {
    setNutrientsPerServing({
      kcal: totalNutrients.kcal / servings,
      fat: totalNutrients.fat / servings,
      carbohydrates: totalNutrients.carbohydrates / servings,
      protein: totalNutrients.protein / servings,
      sugar: totalNutrients.sugar / servings,
      fiber: totalNutrients.fiber / servings,
    });
  } else {
    setNutrientsPerServing(emptyNutrients);
  }
};


  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPictureStorageId(undefined);
      return;
    }

    try {
      const storageId = (await uploadImage(file)) as Id<"_storage">; // ← vrací Id<"_storage">
      setPictureStorageId(storageId);
      // pictureUrl se aktualizuje automaticky díky useGetImageUrlDB!
    } catch (err) {
      alert("Nepodařilo se nahrát obrázek");
      console.error(err);
    }
  };

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

  if (!name.trim()) {
    alert("Zadejte název receptu");
    return;
  }

  if (types.length === 0) {
    alert("Vyberte alespoň jeden typ jídla");
    return;
  }

  if (selectedIngredients.length === 0) {
    alert("Přidejte alespoň jednu ingredienci");
    return;
  }

  const allNutrientsZero = 
    nutrientsPerServing.kcal === 0 &&
    nutrientsPerServing.fat === 0 &&
    nutrientsPerServing.carbohydrates === 0 &&
    nutrientsPerServing.protein === 0 &&
    nutrientsPerServing.sugar === 0 &&
    nutrientsPerServing.fiber === 0;

  if (allNutrientsZero) {
    alert("Nejdříve spočítejte nutriční hodnoty");
    return;
  }

    const preparationObj = toPreparationObject(prepStepsArray);

    const payload: Omit<Meal, "_id"> = {
      name,
      types,
      servings,
      pictureStorageId: pictureStorageId ?? undefined,
      ingredients: selectedIngredients,
      nutrients: nutrientsPerServing,
      preparation: preparationObj,
    };

    try {
      if (!id) {
        await addMeal(payload);
      } else {
        await updateMeal({ _id: id as Id<"meals">, ...payload });
      }

      router.push("/meals");
    } catch (error) {
      alert("Chyba při ukládání receptu");
      console.error(error);
    }
  };


  return (
    <form className="app-form" onSubmit={handleSubmit}>
      {/* Název receptu */}
      <div className="form-group">
        <label htmlFor="meal-name">Název receptu</label>
        <input
          id="meal-name"
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
              <input type="checkbox" checked={types.includes(value)} onChange={() => toggleType(value)} /> {label}
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
      {pictureUrl && <Image src={pictureUrl} alt="Náhled obrázku" style={{ maxWidth: "200px", marginTop: 10 }} />}

      <div className="form-group">
        <label htmlFor="image-url">URL obrázku (volitelné)</label>
        <input
          id="meal-image"
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
              onChange={(e) => updateIngredient(i, "ingredientId", e.target.value)}
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
              onChange={(e) => updateIngredient(i, "amount", Number(e.target.value))}
              placeholder="množství"
              className="app-input small"
              required
            />
            <button type="button" onClick={() => removeIngredient(i)} className="button remove-btn">
              x
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
    <p>Kcal na porci: {nutrientsPerServing.kcal.toFixed(1)}</p>
    <p>Tuky na porci: {nutrientsPerServing.fat.toFixed(1)} g</p>
    <p>Sacharidy na porci: {nutrientsPerServing.carbohydrates.toFixed(1)} g</p>
    <p>Cukr na porci: {nutrientsPerServing.sugar.toFixed(1)} g</p>
    <p>Vláknina na porci: {nutrientsPerServing.fiber.toFixed(1)} g</p>
    <p>Bílkoviny na porci: {nutrientsPerServing.protein.toFixed(1)} g</p>

    <button type="button" onClick={handleSubmit} className="action-button">
      Uložit recept
    </button>
  </div>
)}

    </form>
  );
}
