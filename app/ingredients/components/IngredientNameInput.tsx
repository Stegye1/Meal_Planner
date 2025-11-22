type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function IngredientNameInput({ value, onChange, ...rest }: Props) {
  return (
    <div className="form-group">
      <label htmlFor="ingredient-name">Název ingredience</label>
      <input
        id="ingredient-name"
        type="text"
        required
        value={value}
        onChange={(e) => {
          const normalized = e.target.value.toLowerCase();
          onChange(normalized);
        }}
        className="app-input"
        {...rest}
      />
    </div>
  );
}
