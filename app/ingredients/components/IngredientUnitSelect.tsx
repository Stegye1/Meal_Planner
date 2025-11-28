type Props = {
  value: "g" | "ml";
  onChange: (value: "g" | "ml") => void;
};

export function IngredientUnitSelect({ value, onChange }: Props) {
  return (
    <div className="form-group">
      <label htmlFor="ingredient-unit">Jednotka</label>
      <select
        id="ingredient-unit"
        value={value}
        onChange={(e) => onChange(e.target.value as "g" | "ml")}
        className="app-input"
      >
        <option value="g">g</option>
        <option value="ml">ml</option>
      </select>
    </div>
  );
}
