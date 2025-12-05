import { useIngredient } from "../hooks/useIngredient";
import { FormActions } from "./FormActions";
import { IngredientAltUnitsFieldset } from "./IngredientAltUnitsFieldset";
import { IngredientNameInput } from "./IngredientNameInput";
import { IngredientUnitSelect } from "./IngredientUnitSelect";
import { NutrientsFieldset } from "./NutrientsFieldSet";

export function IngredientForm() {
  const {
    isNew,
    name,
    setName,
    unit,
    setUnit,
    altUnits,
    setAltUnits,
    nutrients,
    setNutrients,
    isSubmitting,
    handleSubmit,
  } = useIngredient();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="app-form"
    >
      <IngredientNameInput value={name} onChange={setName} />
      <IngredientUnitSelect value={unit} onChange={setUnit} />
      <IngredientAltUnitsFieldset value={altUnits} onChange={setAltUnits} mainUnit={unit} />
      <NutrientsFieldset nutrients={nutrients} onChange={setNutrients} />
      <FormActions isNew={isNew} isLoading={isSubmitting} />
    </form>
  );
}
