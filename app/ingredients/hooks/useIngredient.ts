import { useState } from "react";
import { useIngredientId } from "./useIntredientId";
import { useIngredientNavigation } from "./useIngredientNavigation";
import { useIngredientFormState } from "./useIngredientFormState";
import { useGetIngredientDB } from "@/lib/db/ingredients/use-get-ingredient-db";
import { useUpdateIngredientDB } from "@/lib/db/ingredients/use-update-ingredient-db";
import { useAddIngredientDB } from "@/lib/db/ingredients/use-add-ingredient-db";


export function useIngredient() {
  const { id, isNew } = useIngredientId();
  const ingredient = useGetIngredientDB(id);
  const state = useIngredientFormState(ingredient);

  const { updateIngredient } = useUpdateIngredientDB();
  const { addIngredient } = useAddIngredientDB();
  const { goToDetail } = useIngredientNavigation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (isNew) {
        const newIngredientId = await addIngredient({
          name: state.name,
          unit: state.unit,
          nutrients: state.nutrients,
        });
        goToDetail(newIngredientId);
      } else {
        await updateIngredient({
            _id: id!, 
          name: state.name,
          unit: state.unit,
          nutrients: state.nutrients,
       } );
        goToDetail(id!);
      }
    } catch (err) {
      alert("Chyba při ukládání");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    ...state,       
    isNew,
    isSubmitting,
    handleSubmit,
  };
}