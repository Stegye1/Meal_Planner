type Props = { isSubmitting: boolean; isEditing: boolean };

export function FormActionsSection({ isSubmitting, isEditing }: Props) {
  return (
    <div className="form-actions mt-6">
      <button type="submit" disabled={isSubmitting} className="action-button">
        {isSubmitting ? "Ukládám..." : isEditing ? "Uložit změny" : "Přidat recept"}
      </button>
    </div>
  );
}
