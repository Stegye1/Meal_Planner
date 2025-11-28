import { useIngredient } from "../hooks/useIngredient";
import { FormActions } from "./FormActions";
import { IngredientNameInput } from "./IngredientNameInput";
import { IngredientUnitSelect } from "./IngredientUnitSelect";
import { NutrientsFieldset } from "./NutrientsFieldSet";

export function IngredientForm() {
  const { isNew, name, setName, unit, setUnit, nutrients, setNutrients, isSubmitting, handleSubmit } = useIngredient();

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
      <NutrientsFieldset nutrients={nutrients} onChange={setNutrients} />
      <FormActions isNew={isNew} isLoading={isSubmitting} />
    </form>
  );
}
