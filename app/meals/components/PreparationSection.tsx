import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { MealFormData } from "@/types";

export function PreparationSection() {
  const { register, getValues } = useFormContext<MealFormData>();

  // Načteme aktuální data z formuláře (např. při editaci receptu)
  const preparation = getValues("preparation");

  // Lazy inicializace počtu kroků
  const initialSteps = (() => {
    const filledSteps = [
      preparation?.firstStep,
      preparation?.secondStep,
      preparation?.thirdStep,
      preparation?.fourthStep,
    ].filter((s) => s && s.trim() !== "").length;

    return Math.max(1, Math.min(4, filledSteps));
  })();

  const [visibleSteps, setVisibleSteps] = useState<number>(initialSteps);

  const addStep = () => {
    setVisibleSteps((prev) => Math.min(4, prev + 1));
  };

  const steps = [
    { key: "firstStep" as const, label: "Krok 1" },
    { key: "secondStep" as const, label: "Krok 2" },
    { key: "thirdStep" as const, label: "Krok 3" },
    { key: "fourthStep" as const, label: "Krok 4" },
  ];

  return (
    <fieldset className="form-group">
      <legend>Postup přípravy</legend>

      {steps.slice(0, visibleSteps).map((step) => (
        <div className="form-group" key={step.key}>
          <label>{step.label}</label>
          <textarea
            rows={3}
            className="app-input"
            placeholder={`Popis ${step.label.toLowerCase()}`}
            {...register(`preparation.${step.key}`)}
          />
        </div>
      ))}

      {visibleSteps < 4 && (
        <button
          type="button"
          onClick={addStep}
          className="button text-sm text-blue-600 hover:text-blue-800 underline mt-2"
        >
        + Přidat krok
        </button>
      )}
    </fieldset>
  );
}
