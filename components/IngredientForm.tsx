"use client";
import { useState } from "react";
import { useAddIngredientDB } from "@/lib/db/ingredients";

export function IngredientForm() {
  const { addIngredient } = useAddIngredientDB();

  const [name, setName] = useState("");
  const [unit, setUnit] = useState<"g" | "ml">("g");
  const [customUnit, setCustomUnit] = useState("");
  const [nutrients, setNutrients] = useState<[number, number, number, number]>([0, 0, 0, 0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addIngredient({ name, unit, nutrients });
    alert("Ingredience uložena ✅");
  };

  return (
    <form onSubmit={handleSubmit} className="app-form">
      <div className="form-group">
        <label htmlFor="ingredient-name">Název ingredience</label>
        <input
          id="ingredient-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="app-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="ingredient-unit">Jednotka</label>
        <select
          id="ingredient-unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value as "g" | "ml")}
          className="app-input"
        >
          <option value="g">gramy</option>
          <option value="ml">mililitry</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="custom-unit">Volitelná jednotka (např. ks, špetka...)</label>
        <input
          id="custom-unit"
          value={customUnit}
          onChange={(e) => setCustomUnit(e.target.value)}
          className="app-input"
        />
      </div>

      <fieldset className="form-group">
        <legend>Nutriční hodnoty (na 100 g/ml)</legend>
        {["kcal", "tuky", "sacharidy", "bílkoviny"].map((label, i) => (
          <div key={label} className="nutrient-row">
            <label htmlFor={label}>{label}</label>
            <input
              id={label}
              type="number"
              value={nutrients[i]}
              onChange={(e) => {
                const copy = [...nutrients] as [number, number, number, number];
                copy[i] = Number(e.target.value);
                setNutrients(copy);
              }}
              className="app-input small"
            />
          </div>
        ))}
      </fieldset>

      <button type="submit" className="action-button">
        Uložit ingredienci
      </button>
    </form>
  );
}



/* verze bez labelů a s css
"use client";
import { useState } from "react";
import { useAddIngredientDB } from "@/lib/db/ingredients";

export function IngredientForm() {
  const { addIngredient } = useAddIngredientDB();

  const [name, setName] = useState("");
  const [unit, setUnit] = useState<"g" | "ml">("g");
  const [customUnit, setCustomUnit] = useState("");
  const [nutrients, setNutrients] = useState<[number, number, number, number]>([0, 0, 0, 0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addIngredient({ name, unit, nutrients });
    alert("Ingredience uložena ✅");
  };

  return (
    <form onSubmit={handleSubmit} className="app-form">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Název ingredience"
        className="app-input"
      />

      <select value={unit} onChange={(e) => setUnit(e.target.value as "g" | "ml")} className="app-input">
        <option value="g">gramy</option>
        <option value="ml">mililitry</option>
      </select>

      <input
        value={customUnit}
        onChange={(e) => setCustomUnit(e.target.value)}
        placeholder="Volitelná jednotka (např. ks, špetka...)"
        className="app-input"
      />

      <label>Nutriční hodnoty (na 100 g/ml)</label>
      {["kcal", "tuky", "sacharidy", "bílkoviny"].map((label, i) => (
        <input
          key={label}
          type="number"
          placeholder={label}
          value={nutrients[i]}
          onChange={(e) => {
            const copy = [...nutrients] as [number, number, number, number];
            copy[i] = Number(e.target.value);
            setNutrients(copy);
          }}
          className="app-input"
        />
      ))}

      <button type="submit" className="button">
        Uložit ingredienci
      </button>
    </form>
  );
}
*/



/* verze s tailwindem
"use client";
import { useState } from "react";
import { useAddIngredientDB } from "@/lib/db/ingredients";

export function IngredientForm() {
  const { addIngredient } = useAddIngredientDB();

  const [name, setName] = useState("");
  const [unit, setUnit] = useState<"g" | "ml">("g");
  const [customUnit, setCustomUnit] = useState("");
  const [nutrients, setNutrients] = useState<[number, number, number, number]>([0, 0, 0, 0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addIngredient({name, unit, nutrients});
    alert("Ingredience uložena ✅");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-80">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Název ingredience"
        className="border rounded p-2"
      />
      <select value={unit} onChange={(e) => setUnit(e.target.value as "g" | "ml")}>
        <option value="g">gramy</option>
        <option value="ml">mililitry</option>
      </select>

      <input
        value={customUnit}
        onChange={(e) => setCustomUnit(e.target.value)}
        placeholder="Volitelná jednotka (např. ks, špetka...)"
        className="border rounded p-2"
      />

      <label>Nutriční hodnoty (na 100 g/ml)</label>
      {["kcal", "tuky", "sacharidy", "bílkoviny"].map((label, i) => (
        <input
          key={label}
          type="number"
          placeholder={label}
          value={nutrients[i]}
          onChange={(e) => {
            const copy = [...nutrients] as [number, number, number, number];
            copy[i] = Number(e.target.value);
            setNutrients(copy);
          }}
          className="border rounded p-2"
        />
      ))}

      <button type="submit" className="bg-blue-600 text-white rounded p-2 mt-2">
        Uložit ingredienci
      </button>
    </form>
  );
}
*/