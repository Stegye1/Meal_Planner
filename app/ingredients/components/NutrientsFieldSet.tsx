import { NutrientInputRow } from "./NutrientInputRow";

type Props = {
  nutrients: [number, number, number, number];
  onChange: (nutrients: [number, number, number, number]) => void;
};

const labels = ["kcal", "tuky (g)", "sacharidy (g)", "bílkoviny (g)"] as const;

export function NutrientsFieldset({ nutrients, onChange }: Props) {
  return (
    <fieldset className="form-group">
      <legend>Nutriční hodnoty (na 100 g/ml)</legend>
      {labels.map((label, i) => (
        <NutrientInputRow
          key={label}
          label={label}
          value={nutrients[i]}
          onChange={(value) => {
            const copy = [...nutrients] as [number, number, number, number];
            copy[i] = value;
            onChange(copy);
          }}
        />
      ))}
    </fieldset>
  );
}
