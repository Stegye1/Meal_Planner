"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import "@/app/recipes/Recipes.css";

import { useAllIngredientsDB } from "../lib/db/ingredients"; // hook pro načtení ingrediencí z Convexu
import { useAddRecipeDB } from "../lib/db/recipes";        // hook pro uložení receptu
import { MealType } from "@/types";


export const mealTypes: { label: string; value: MealType }[] = [
  { label: "Snídaně", value: "breakfast" },
  { label: "Oběd", value: "lunch" },
  { label: "Večeře", value: "dinner" },
];

export default function RecipeForm() {
 
  const router = useRouter();

  // Stav formuláře
  const [name, setName] = useState("");
  const [types, setTypes] = useState<MealType[]>([]);
  const [servings, setServings] = useState(1);
  const [picture, setPicture] = useState<File | null>(null);
  const [prepSteps, setPrepSteps] = useState<string[]>([""]);
  const [selectedIngredients, setSelectedIngredients] = useState<
    { ingredientId: string; amount: number }[]
  >([]);

  // Nutriční hodnoty spočítané na 1 porci: [kcal, tuky, sacharidy, bílkoviny]
  const [nutrientsPerServing, setNutrientsPerServing] = useState<[number, number, number, number]>([
    0, 0, 0, 0,
  ]);

  // Načtení všech ingrediencí z Convexu
  const allIngredients = useAllIngredientsDB();

  // Mutace pro uložení receptu
  const { addRecipe } = useAddRecipeDB();

  // Přidání ingredience do seznamu
  const addIngredient = () => {
    setSelectedIngredients((prev) => [...prev, { ingredientId: "", amount: 0 }]);
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
    if (prepSteps.length < 4) setPrepSteps((prev) => [...prev, ""]);
  };

  // Aktualizace kroku přípravy
  const updatePrepStep = (index: number, value: string) => {
    setPrepSteps((prev) => prev.map((step, i) => (i === index ? value : step)));
  };

 

const calculateNutrients = () => {
  if (!allIngredients) return;

  const totalNutrients = selectedIngredients.reduce(
    (totals, ing) => {
      const ingredient = allIngredients.find((i) => i._id === ing.ingredientId);
      if (!ingredient) return totals;
      const amount = ing.amount || 0;
      const nutrients = ingredient.nutrients || [0, 0, 0, 0];
      return totals.map((total, idx) => total + (amount * nutrients[idx]) / 100) as [
        number,
        number,
        number,
        number
      ];
    },
    [0, 0, 0, 0] as [number, number, number, number]
  );

  if (servings > 0) {
    setNutrientsPerServing(totalNutrients.map(n => n / servings) as [number, number, number, number]);
  } else {
    setNutrientsPerServing([0, 0, 0, 0]);
  }
};

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
    setPicture(e.target.files[0]);
  } else {
    setPicture(null);
  }
};

const handleConfirm = async () => {
  if (!nutrientsPerServing) {
    alert("Nejdříve spočítejte nutriční hodnoty.");
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
        firstStep: prepSteps[0] || "",
        secondStep: prepSteps[1],
        thirdStep: prepSteps[2],
        fourthStep: prepSteps[3],
      },
    });
    router.push("/recipes");
  } catch (error) {
    alert("Chyba při ukládání receptu");
    console.error(error);
  }
};


  // Odeslání formuláře
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Základní validace (například alespoň 1 ingredience)
    if (!name.trim() || types.length === 0 || selectedIngredients.length === 0) {
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
          firstStep: prepSteps[0] || "",
          secondStep: prepSteps[1],
          thirdStep: prepSteps[2],
          fourthStep: prepSteps[3],
        },
      });
      router.push("/recipes");
    } catch (error) {
      alert("Chyba při ukládání receptu");
      console.error(error);
    }
  };

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
      {picture && (
        
  <img
    src={URL.createObjectURL(picture)}
    alt="Náhled obrázku"
    style={{ maxWidth: "200px", marginTop: "10px" }}
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
        {prepSteps.map((step, i) => (
          <div key={i} className="form-group">
            <label htmlFor={`step-${i}`}>Krok {i + 1}</label>
            <textarea
              id={`step-${i}`}
              value={step}
              onChange={(e) => updatePrepStep(i, e.target.value)}
              rows={3}
              placeholder={`Popis kroku ${i + 1}`}
              className="app-input"
              required={i === 0}
            />
          </div>
        ))}
        {prepSteps.length < 4 && (
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

    <button type="button" onClick={handleConfirm} className="action-button">
      Uložit recept
    </button>
  </div>
)}


    </form>
  );
}


/*
import { useRouter } from "next/navigation";
import { useState } from "react";
import "@/app/recipes/Recipes.css";
import { ingredients, mealTypes } from "@/mock-data";

export default function RecipeForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [servings, setServings] = useState(1);
  const [imageUrl, setImageUrl] = useState("");
  const [prepSteps, setPrepSteps] = useState<string[]>([""]);
  const [selectedIngredients, setSelectedIngredients] = useState<
    { ingredientId: string; amount: number }[]
  >([]);

  const addIngredient = () => {
    setSelectedIngredients((prev) => [
      ...prev,
      { ingredientId: "", amount: 0 },
    ]);
  };

  const updateIngredient = (
    index: number,
    field: "ingredientId" | "amount",
    value: string | number
  ) => {
    setSelectedIngredients((prev) =>
      prev.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing))
    );
  };

  const removeIngredient = (index: number) => {
    setSelectedIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleType = (type: string) => {
    setTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const addPrepStep = () => {
    if (prepSteps.length < 4) setPrepSteps((prev) => [...prev, ""]);
  };

  const updatePrepStep = (index: number, value: string) => {
    setPrepSteps((prev) => prev.map((step, i) => (i === index ? value : step)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: validace + uložení do DB
    router.push("/recipes");
  };

  return (
    <form className="app-form" onSubmit={handleSubmit}>
      * Název receptu *
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

      * Typy jídel *
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

      * Počet porcí *
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

      * Obrázek *
      <div className="form-group">
        <label htmlFor="image-url">URL obrázku (volitelné)</label>
        <input
          id="image-url"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/obrazek.jpg"
          className="app-input"
        />
      </div>

      

      * Ingredience *
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
                {ingredients.map(({ id, name }) => (
                  <option key={id} value={id}>
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
         

      * Kroky přípravy *
      <fieldset className="form-group">
        <legend>Postup přípravy</legend>
        {prepSteps.map((step, i) => (
          <div key={i} className="form-group">
            <label htmlFor={`step-${i}`}>Krok {i + 1}</label>
            <textarea
              id={`step-${i}`}
              value={step}
              onChange={(e) => updatePrepStep(i, e.target.value)}
              rows={3}
              placeholder={`Popis kroku ${i + 1}`}
              className="app-input"
              required={i === 0}
            />
          </div>
        ))}
        {prepSteps.length < 4 && (
          <button type="button" onClick={addPrepStep} className="button">
            Přidat další krok
          </button>
        )}
      </fieldset>

      <button type="submit" className="action-button">
        Uložit recept
      </button>
    </form>
  );
}
*/
