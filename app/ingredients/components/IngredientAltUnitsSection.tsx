import { useFormContext, useFieldArray } from "react-hook-form";
import type { IngredientFormData } from "./types";

const altUnitOptions = ["lžíce", "lžička", "špetka", "hrnek", "ks"];

export default function IngredientAltUnitsSection() {
  const { control, register } = useFormContext<IngredientFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "altUnits",
  });

  return (
    <div className="form-group">
      <label>Alternativní jednotky (volitelné)</label>
      <button
        type="button"
        onClick={() => append({ name: "lžíce", unitsPerAltUnit: undefined })}
        className="button small mt-1"
      >
        + Přidat jednotku
      </button>

      {fields.length > 0 && (
        <ul className="mt-2">
          {fields.map((field, index) => (
            <li key={field.id} className="flex-between">
              <select
                {...register(`altUnits.${index}.name` as const)}
                className="app-input small"
              >
                {altUnitOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="Převod na zákl. j."
                className="app-input middle"
                {...register(`altUnits.${index}.unitsPerAltUnit` as const, {
                  valueAsNumber: true,
                })}
              />

              <button
                type="button"
                onClick={() => remove(index)}
                className="button small danger"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}




// import { useFieldArray, useFormContext } from "react-hook-form";
// import { useState } from "react";
// import { IngredientFormData } from "./IngredientForm";

// type Props = {
//   mainUnit?: "g" | "ml";  // volitelné
// };

// export function IngredientAltUnitsFieldset({ mainUnit }: Props) {
 
//   const { control } = useFormContext<IngredientFormData>(); 
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "altUnits",
//   });
  
//   const [tempName, setTempName] = useState("lžíce");
//   const [tempConversion, setTempConversion] = useState(1);

//   const unitNameOptions = ["lžíce", "lžička", "špetka", "hrnek", "ks"];

//   const addUnit = () => {
//     if (tempName.trim()) {
//       append({ name: tempName.trim(), unitsPerAltUnit: tempConversion });
//       setTempName("lžíce");
//       setTempConversion(1);
//     }
//   };

//   return (
//     <div className="form-group">
//       <label>Alternativní jednotky + převod na základní jednotku (volitelné)</label>
      
//       <div className="flex gap-2 mb-4">
//         <select
//           value={tempName}
//           onChange={(e) => setTempName(e.target.value)}
//           className="app-input flex-1"
//         >
//           {unitNameOptions.map((name) => (
//             <option key={name} value={name}>{name}</option>
//           ))}
//         </select>
//         <input
//           type="number"
//           value={tempConversion}
//           onChange={(e) => setTempConversion(+e.target.value)}
//           placeholder="Převod"
//           step={1}
//           className="app-input w-24"
//           min={0}
//         />
//         <button type="button" onClick={addUnit} className="btn btn-primary">+</button>
//       </div>

//       {fields.length > 0 && (
//         <div className="space-y-1">
//           {fields.map((field, index) => (
//             <div key={field.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
//               <span>
//                 [translate:{field.name}]: {field.unitsPerAltUnit} {mainUnit}
//               </span>
//               <button
//                 type="button"
//                 onClick={() => remove(index)}
//                 className="text-red-500 hover:text-red-700 text-sm"
//               >
//                 ×
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



// // import { useState } from "react";

// // export type AltUnit = { name: string; unitsPerAltUnit: number };

// // type Props = {
// //   value: AltUnit[];
// //   onChange: (value: AltUnit[]) => void;
// //   mainUnit: "g" | "ml";
// // };

// // export function IngredientAltUnitsFieldset({ value, onChange, mainUnit }: Props) {
// //   const [tempName, setTempName] = useState("lžíce");
// //   const [tempConversion, setTempConversion] = useState(1);

// //   // Select možnosti pro názvy (společné pro g/ml)
// //   const unitNameOptions = [
// //     "lžíce",
// //     "lžička", 
// //     "špetka",
// //     "hrnek",  
// //     "kus"
// //   ];

// //   const addUnit = () => {
// //     if (tempName.trim()) {
// //       const newUnit: AltUnit = { 
// //         name: tempName.trim(), 
// //         unitsPerAltUnit: tempConversion 
// //       };
// //       onChange([...value, newUnit]);
// //       setTempName("lžíce");
      
// //     }
// //   };

// //   const removeUnit = (index: number) => {
// //     onChange(value.filter((_, i) => i !== index));
// //   };

// //   return (
// //     <div className="form-group">
// //       <label>Alternativní jednotky + převod na základní jednotku (volitelné)</label>
      
// //       {/* Přidání nové jednotky */}
// //       <div className="flex gap-2 mb-4">
// //         <select
// //           value={tempName}
// //           onChange={(e) => setTempName(e.target.value)}
// //           className="app-input flex-1"
// //         >
// //           {unitNameOptions.map((name) => (
// //             <option key={name} value={name}>{name}</option>
// //           ))}
// //         </select>
        
// //         <input
// //           type="number"
// //           value={tempConversion}
// //           onChange={(e) => setTempConversion(+e.target.value)}
// //           placeholder="Zadejte převod na základní jednotku "
         
// //           step={1}
// //           className="app-input w-24"
// //         />
        
// //         <button type="button" onClick={addUnit} className="btn btn-primary">
// //           +
// //         </button>
// //       </div>

// //       {/* Seznam přidaných */}
// //       {value.length > 0 && (
// //         <div className="space-y-1">
// //           {value.map((unit, index) => (
// //             <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
// //               <span>
// //                 [translate:{unit.name}]: {unit.unitsPerAltUnit} {mainUnit}
// //               </span>
// //               <button
// //                 type="button"
// //                 onClick={() => removeUnit(index)}
// //                 className="text-red-500 hover:text-red-700 text-sm"
// //               >
// //                 ×
// //               </button>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }




// /*

// export type AltUnit = { name: string; unitsPerAltUnit: number };

// type Props = {
//   value: AltUnit[];  // pole alternativních jednotek
//   onChange: (value: AltUnit[]) => void;
//   mainUnit: "g" | "ml";  // pro kontext (g → lžíce = 5g)


// export function IngredientAltUnitsFieldset({ value, onChange, mainUnit }: Props) {
//   const [tempName, setTempName] = useState("");
//   const [tempConversion, setTempConversion] = useState(1);

//   const predefinedUnits = mainUnit === "g" 
//     ? [
//         { name: "lžíce", unitsPerAltUnit: 15 },
//         { name: "lžička", unitsPerAltUnit: 5 },
//         { name: "špetka", unitsPerAltUnit: 1 },
//       ]
//     : [
//         { name: "lžíce", unitsPerAltUnit: 15 },
//         { name: "lžička", unitsPerAltUnit: 5 },
//         { name: "sklenice", unitsPerAltUnit: 200 },
//       ];

//   const addUnit = () => {
//     if (tempName.trim()) {
//       const newUnit: AltUnit = { 
//         name: tempName.trim(), 
//         unitsPerAltUnit: tempConversion 
//       };
//       onChange([...value, newUnit]);
//       setTempName("");
//       setTempConversion(1);
//     }
//   };

//   const removeUnit = (index: number) => {
//     onChange(value.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="form-group">
//       <label htmlFor="alt-units">Alternativní jednotky (volitelné)</label>
      
    
//       <div className="mb-4">
//         <p className="text-sm text-muted mb-2">Rychle přidat:</p>
//         {predefinedUnits.map((unit) => (
//           <button
//             key={unit.name}
//             type="button"
//             onClick={() => onChange([...value, unit])}
//             className="btn btn-sm btn-outline mr-2 mb-2"
//           >
//             {unit.name} ({unit.unitsPerAltUnit} {mainUnit})
//           </button>
//         ))}
//       </div>

   
//       <div className="flex gap-2 mb-2">
//         <input
//           id="alt-unit-name"
//           value={tempName}
//           onChange={(e) => setTempName(e.target.value)}
//           placeholder="název (např. hrnek)"
//           className="app-input flex-1"
//         />
//         <input
//           type="number"
//           value={tempConversion}
//           onChange={(e) => setTempConversion(+e.target.value)}
//           placeholder="převod"
//           min={0.1}
//           step={0.1}
//           className="app-input w-24"
//         />
//         <button type="button" onClick={addUnit} className="btn btn-primary">
//           +
//         </button>
//       </div>

 
//       {value.length > 0 && (
//         <div className="space-y-1">
//           {value.map((unit, index) => (
//             <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
//               <span>
//                 {unit.name}: {unit.unitsPerAltUnit} {mainUnit}
//               </span>
//               <button
//                 type="button"
//                 onClick={() => removeUnit(index)}
//                 className="text-red-500 hover:text-red-700 text-sm"
//               >
//                 ×
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
// */