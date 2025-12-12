import { useFormContext } from "react-hook-form";
import { MealFormData } from "@/types";

export function MealNameSection() {
  const { register, formState: { errors } } = useFormContext<MealFormData>();
  
  return (
    <div className="form-group">
      <label htmlFor="meal-name">Název receptu</label>
      <input
        id="meal-name"
        className={`app-input ${errors.name ? "error" : ""}`}
        {...register("name", { required: "Název je povinný" })}
      />
      {errors.name && <span className="error">{errors.name.message}</span>}
    </div>
  );
}


// export function MealNameSection({ control }: { control: Control<FormData> }) {

//     export function MealNameSection() {
//   const { register, formState: { errors } } = useFormContext<MealFormData>();
//   return (
//     <Controller
//       name="name"
      
//       rules={{ required: "Název je povinný" }}
//       render={({ field, fieldState: { error } }) => (
//         <div className="form-group">
//           <label>Název receptu</label>
//           <input {...field} className={`app-input ${error ? "error" : ""}`} />
//           {error && <span className="error">{error.message}</span>}
//         </div>
//       )}
//     />
//   );
// }
