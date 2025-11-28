// src/components/ingredients/form/FormActions.tsx
type Props = {
  isNew: boolean;
  isLoading?: boolean;
};

export function FormActions({ isNew, isLoading }: Props) {
  return (
    <div className="form-actions mt-6">
      <button type="submit" disabled={isLoading} className="action-button">
        {isLoading ? "Ukládám..." : isNew ? "Přidat novou ingredienci" : "Uložit upravenou ingredienci"}
      </button>
    </div>
  );
}
