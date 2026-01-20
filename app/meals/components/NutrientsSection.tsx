import { Nutrients } from "../hooks/useCalculateNutrients";


type Props = { 
  nutrients: Nutrients; 
  isReady: boolean; 
};

export function NutrientsSection({ nutrients, isReady }: Props) {

  return (
    <div className="form-group">
      {!isReady ? <p>Načítám ingredience...</p> : (
      
    
        <div className="nutrients-preview">
          <p>Kcal na porci: {nutrients.kcal.toFixed(1)}</p>
          <p>Tuky: {nutrients.fat.toFixed(1)} g</p>          
          <p>Bílkoviny: {nutrients.protein.toFixed(1)} g</p>
          <p>Sacharidy: {nutrients.carbohydrates.toFixed(1)} g</p>
         <p>Cukry: {nutrients.sugar.toFixed(1)} g</p>
        <p>Vlákna: {nutrients.fiber.toFixed(1)} g</p>
        </div>
      )}
    </div>
      
  );
}
