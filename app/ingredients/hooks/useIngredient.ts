import { useState } from "react";
import { useAddIngredientDB } from "@/lib/db/ingredients/use-add-ingredient-db";
import { useGetIngredientDB } from "@/lib/db/ingredients/use-get-ingredient-db";
import { useUpdateIngredientDB } from "@/lib/db/ingredients/use-update-ingredient-db";

import { useIngredientFormState } from "./useIngredientFormState";
import { useIngredientNavigation } from "./useIngredientNavigation";
import { useIngredientId } from "./useIntredientId";

import { Id } from "@/convex/_generated/dataModel";

type FormData = {
  name: string;
  unit: "g" | "ml";
  altUnits: Array<{ name: string; unitsPerAltUnit: number }>;
  nutrients: {
    kcal: number; protein: number; fat: number;
    carbohydrates: number; sugar: number; fiber: number;
  };
};

export function useIngredient() {
  const { id } = useIngredientId();
  const { updateIngredient } = useUpdateIngredientDB();
  const { addIngredient } = useAddIngredientDB();
  const { goToDetail } = useIngredientNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);

   // useIngredient.ts
const onSubmit = async (data: FormData, id: Id<"ingredients">) => {
  const cleanedNutrients: FormData["nutrients"] = {
  kcal: parseFloat(data.nutrients.kcal.toString()) || 0,
  protein: parseFloat(data.nutrients.protein.toString()) || 0,
  fat: parseFloat(data.nutrients.fat.toString()) || 0,
  carbohydrates: parseFloat(data.nutrients.carbohydrates.toString()) || 0,
  sugar: parseFloat(data.nutrients.sugar.toString()) || 0,
  fiber: parseFloat(data.nutrients.fiber.toString()) || 0,
};

const cleanedData = { ...data, nutrients: cleanedNutrients };


  if (id) {
    await updateIngredient({ _id: id, ...cleanedData });
  } else {
    await addIngredient(cleanedData);
  }
};

  // const onSubmit = async (data: FormData) => {
  //   setIsSubmitting(true);
  //   try {
  //     if (isNew) {
  //       const newIngredientId = await addIngredient({
  //         name: data.name,
  //         unit: data.unit,
  //         altUnits: data.altUnits,  
  //         nutrients: data.nutrients,
  //       });
  //       goToDetail(newIngredientId);
  //     } else {
  //       await updateIngredient({
  //         _id: id!,
  //         name: data.name,
  //         unit: data.unit,
  //         altUnits: data.altUnits,  
  //         nutrients: data.nutrients,
  //       });
  //       goToDetail(id!);
  //     }
  //   } catch (err) {
  //     alert("Chyba při ukládání");
  //     console.error(err);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return {
    id,
    isNew: !id,
    isSubmitting,
    onSubmit,  // ✅ Nové API pro React Hook Form
  };
}


// // import { useState } from "react";
// import { useAddIngredientDB } from "@/lib/db/ingredients/use-add-ingredient-db";
// import { useGetIngredientDB } from "@/lib/db/ingredients/use-get-ingredient-db";
// import { useUpdateIngredientDB } from "@/lib/db/ingredients/use-update-ingredient-db";
// import { AltUnit } from "../components/IngredientAltUnitsFieldset";
// import { useIngredientFormState } from "./useIngredientFormState";
// import { useIngredientNavigation } from "./useIngredientNavigation";
// import { useIngredientId } from "./useIntredientId";

// import { useState } from "react";
// import { useAddIngredientDB } from "@/lib/db/ingredients/use-add-ingredient-db";
// import { useUpdateIngredientDB } from "@/lib/db/ingredients/use-update-ingredient-db";
// import { useIngredientId } from "./useIntredientId";
// import { useIngredientNavigation } from "./useIngredientNavigation";
// import { Id } from "@/convex/_generated/dataModel";



// export function useIngredient() {
//   const { id, isNew } = useIngredientId();
//   const ingredient = useGetIngredientDB(id);
//   const state = useIngredientFormState(ingredient);

//   const { updateIngredient } = useUpdateIngredientDB();
//   const { addIngredient } = useAddIngredientDB();
//   const { goToDetail } = useIngredientNavigation();

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
//     try {
//       if (isNew) {
//         const newIngredientId = await addIngredient({
//           name: state.name,
//           unit: state.unit,
//           nutrients: state.nutrients,
//         });
//         goToDetail(newIngredientId);
//       } else {
//         await updateIngredient({
//           _id: id!,
//           name: state.name,
//           unit: state.unit,
//           nutrients: state.nutrients,
//         });
//         goToDetail(id!);
//       }
//     } catch (err) {
//       alert("Chyba při ukládání");
//       console.error(err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return {
//     ...state,
//     isNew,
//     isSubmitting,
//     handleSubmit,
//   };
// }
