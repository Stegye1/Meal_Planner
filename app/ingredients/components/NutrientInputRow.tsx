type Props = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

export function NutrientInputRow({ label, value, onChange }: Props) {
  return (
    <div className="nutrient-row">
      <label htmlFor={label.toLowerCase()}>{label}</label>
      <input
        id={label.toLowerCase()}
        type="number"
        min="0"
        step="0.1"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="app-input small"
      />
    </div>
  );
}