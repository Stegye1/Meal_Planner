import { Controller, useFormContext } from "react-hook-form";
import { NutrientInputRow } from "./NutrientInputRow";

// Nahraďte Controller v IngredientForm:
<NutrientsFieldset />  // ✅ Použije useFormContext

// NutrientsFieldset.tsx:
export function NutrientsFieldset() {
  const { control } = useFormContext<FormData>();
  
  return (
    <fieldset className="form-group">
      <legend>Nutriční hodnoty (na 100 g/ml)</legend>
      {nutrientFields.map(({ key, label }) => (
        <Controller
          key={key}
          name={`nutrients.${key}`}
          control={control}
          rules={{ min: 0 }}
          render={({ field }) => (
            <NutrientInputRow label={label} {...field} />
          )}
        />
      ))}
    </fieldset>
  );
}




// import { NutrientInputRow } from "./NutrientInputRow";

// import { Controller, useFormContext } from "react-hook-form";

// type Props = {
//   nutrients: {
//     kcal: number;
//     protein: number;
//     fat: number;
//     carbohydrates: number;
//     sugar: number;
//     fiber: number;
//   };
//   onChange: (nutrients: Props["nutrients"]) => void;
// };

// export function NutrientsFieldset({ nutrients, onChange }: Props) {
//   return (
//     <fieldset className="form-group">
//       <legend>Nutriční hodnoty (na 100 g/ml)</legend>
//       {nutrientFields.map(({ key, label }) => (
//         <Controller
//           key={key}
//           name={`nutrients.${key}`}
//           rules={{ min: 0 }}
//           render={({ field }) => (
//             <NutrientInputRow
//               label={label}
//               {...field}
//             />
//           )}
//         />
//       ))}
//     </fieldset>
//   );
// }



/*
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

*/


// type Props = {
//   nutrients: {
//     kcal: number;
//     protein: number;
//     fat: number;
//     carbohydrates: number;
//     sugar: number;
//     fiber: number;
//   };
//   onChange: (nutrients: Props["nutrients"]) => void;
// };

// // Mapování pro pořadí a popisky
// const nutrientFields = [
//   { key: "kcal" as const, label: "kcal" },
//   { key: "fat" as const, label: "tuky (g)" },
//   { key: "carbohydrates" as const, label: "sacharidy (g)" },
//   { key: "protein" as const, label: "bílkoviny (g)" },
//   { key: "sugar" as const, label: "cukry (g)" },
//   { key: "fiber" as const, label: "vlákna (g)" },
// ] as const;

// type NutrientKey = keyof Props["nutrients"];

// export function NutrientsFieldset({ nutrients, onChange }: Props) {
//   return (
//     <fieldset className="form-group">
//       <legend>Nutriční hodnoty (na 100 g/ml)</legend>
//       {nutrientFields.map(({ key, label }) => (
//         <NutrientInputRow
//           key={key}
//           label={label}
//           value={nutrients[key as NutrientKey]}
//           onChange={(value) => {
//             onChange({ ...nutrients, [key as NutrientKey]: value });
//           }}
//         />
//       ))}
//     </fieldset>
//   );
// }

