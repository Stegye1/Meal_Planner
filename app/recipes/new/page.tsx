"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import "../Recipes.css";
import { meals, ingredients, mealTypes } from "../../../mock-data"; 

export default function NewRecipePage() {
  const router = useRouter();

  // Stav pro všechna pole formuláře
  const [name, setName] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [servings, setServings] = useState(1);
  const [imageUrl, setImageUrl] = useState("");
  const [prepSteps, setPrepSteps] = useState<string[]>([""]); // pole textů kroků
 
  const [selectedIngredients, setSelectedIngredients] = useState<
    { ingredientId: string; amount: number }[]
  >([]);

  // Přidání ingredience do pole
  const addIngredient = () => {
    setSelectedIngredients((prev) => [...prev, { ingredientId: "", amount: 0 }]);
  };

  // Úprava ingredience dle indexu
  const updateIngredient = (index: number, field: "ingredientId" | "amount", value: string | number) => {
    setSelectedIngredients((prev) =>
      prev.map((ing, i) => (i === index ? { ...ing, [field]: value } : ing))
    );
  };

  // Odebrání ingredience
  const removeIngredient = (index: number) => {
    setSelectedIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  // Volba typů jídla (checkboxy)
  const toggleType = (type: string) => {
    setTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  
  // Přidání dalšího kroku, max 4 kroky
  const addPrepStep = () => {
    if (prepSteps.length < 4) {
      setPrepSteps((prev) => [...prev, ""]);
    }
  };

  
  // Úprava textu kroku přípravy
  const updatePrepStep = (index: number, value: string) => {
    setPrepSteps((prev) =>
      prev.map((step, i) => (i === index ? value : step))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO validace a odeslání receptu 

    // prozatím jen přesměrování
    router.push("/recipes");
  };

  return (
    <main className="main-content">
      <h1>Zadej nový recept</h1>
      <form className="new-recipe-form" onSubmit={handleSubmit}>
        <label>
          Název receptu
          <input
          type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Název receptu"
            required
          />
        </label>

        <fieldset className="meal-types">
          <label>Typy jídel</label>
          <div className="meal-types-items">
          {mealTypes.map(({ value, label }) => (
            <label key={value} >
              <input
                type="checkbox"
                checked={types.includes(value)}
                onChange={() => toggleType(value)}
              />
              {label}
            </label>
          ))}
          </div>
        </fieldset>

        <label>
          Počet porcí
          <input
            type="number"
            min={1}
            value={servings}
            onChange={(e) => setServings(Number(e.target.value))}
            required
          />
        </label>

        <label>
          URL obrázku (volitelné)
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </label>

        <fieldset>
          <legend>Ingredience</legend>
          {selectedIngredients.map((ing, i) => (
            <div key={i} style={{ marginBottom: 8, display: "flex", gap: 8, alignItems: "center" }}>
              <select
                value={ing.ingredientId}
                onChange={(e) => updateIngredient(i, "ingredientId", e.target.value)}
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
                required
                style={{ width: 80 }}
              />
              <button type="button" onClick={() => removeIngredient(i)} aria-label="Odebrat ingredienci">
                ×
              </button>
            </div>
          ))}
          <button type="button" onClick={addIngredient}>
            Přidat ingredienci
          </button>
        </fieldset>

       <fieldset>
          <legend>Postup přípravy</legend>
          {prepSteps.map((step, i) => (
            <label key={i}>
              Krok {i + 1}
              <textarea
                value={step}
                onChange={(e) => updatePrepStep(i, e.target.value)}
                rows={3}
                placeholder={`Popis kroku ${i + 1}`}
                style={{ width: "100%" }} // textarea roztáhne na celou šířku
                required={i === 0} // první krok je povinný
              />
            </label>
          ))}
          {prepSteps.length < 4 && (
            <button type="button" onClick={addPrepStep}>
              Přidat další krok
            </button>
          )}
        </fieldset>

        <button type="submit">Uložit recept</button>
      </form>
    </main>
  );
}


/*
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import "../Recipes.css";

export default function NewRecipePage() {
  const router = useRouter();
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //TODO: Uložení receptu (např. do databáze)

    // programatická navigace:
    router.push("/recipes");
  };

  return (
    <main className="main-content">
      <h1>Zadej nový recept</h1>
      <form className="new-recipe-form" onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Název receptu"
        />
        <button type="submit">Uložit</button>
      </form>
    </main>
  );
}
  */
