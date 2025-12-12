import { MealFormData } from "@/types";
import { useFormContext } from "react-hook-form";

export function PreparationSection() {
  const { register, formState: { errors } } = useFormContext<MealFormData>();

  return (
    <fieldset className="form-group">
      <legend>Postup přípravy</legend>
      
      {/* ✅ Pevné klíče - TypeScript je zná */}
      <div className="form-group">
        <label>Krok 1</label>
        <textarea
          rows={3}
          className="app-input"
          placeholder="Popis kroku 1"
          {...register("preparation.firstStep")}
        />
      </div>

      <div className="form-group">
        <label>Krok 2</label>
        <textarea
          rows={3}
          className="app-input"
          placeholder="Popis kroku 2"
          {...register("preparation.secondStep")}
        />
      </div>

      <div className="form-group">
        <label>Krok 3</label>
        <textarea
          rows={3}
          className="app-input"
          placeholder="Popis kroku 3"
          {...register("preparation.thirdStep")}
        />
      </div>

      <div className="form-group">
        <label>Krok 4</label>
        <textarea
          rows={3}
          className="app-input"
          placeholder="Popis kroku 4"
          {...register("preparation.fourthStep")}
        />
      </div>
    </fieldset>
  );
}