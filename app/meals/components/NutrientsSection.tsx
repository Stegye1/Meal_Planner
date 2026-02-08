import NutrientsTable from "../[id]/components/NutrientsTable";
import { Nutrients } from "../hooks/useCalculateNutrients";

type Props = {
  nutrients: Nutrients;
  isReady: boolean;
};

export function NutrientsSection({ nutrients, isReady }: Props) {
  return (
    <div className="form-group">
      {!isReady ? <p>Načítám ingredience...</p> : <NutrientsTable nutrients={nutrients} title="1 porci" />}
    </div>
  );
}
