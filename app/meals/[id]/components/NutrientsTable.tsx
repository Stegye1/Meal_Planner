type Nutrients = {
  kcal: number;
  protein: number;
  carbohydrates: number;
  sugar: number;
  fat: number;
  fiber: number;
};

type NutrientsTableProps = {
  nutrients: Nutrients;
  title: "1 porci" | "100 g" | "100 ml";
};

export default function NutrientsTable({ nutrients, title = "100 g" }: NutrientsTableProps) {
  if (!nutrients || Object.keys(nutrients).length === 0) {
    return <div className="text-gray-500">Nutriční hodnoty nejsou dostupné</div>;
  }

  const format = (value: number) => {
    if (value === undefined || value === null) return "-";
    return value.toFixed(1).replace(/\.0$/, "");
  };

  const kcal = nutrients.kcal || 0;
  const kj = Math.round(kcal * 4.184);

  return (
    <div className={`nutrition-table`}>
      <h3>Nutriční hodnoty na {title}</h3>

      <table>
        <tbody>
          <tr>
            <td>Energetická hodnota</td>
            <td>
              {format(kj)} kJ / {kcal} kcal
            </td>
          </tr>

          <tr>
            <td>Tuky</td>
            <td>{format(nutrients.fat)} g</td>
          </tr>

          <tr>
            <td>Sacharidy</td>
            <td>{format(nutrients.carbohydrates)} g</td>
          </tr>

          <tr>
            <td>- z toho cukry</td>
            <td>{format(nutrients.sugar)} g</td>
          </tr>

          <tr>
            <td>Vláknina</td>
            <td>{format(nutrients.fiber)} g</td>
          </tr>

          <tr>
            <td>Bílkoviny</td>
            <td>{format(nutrients.protein)} g</td>
          </tr>
        </tbody>
      </table>

      <p>Referenční hodnota příjmu průměrné dospělé osoby (8400 kJ / 2000 kcal)</p>
    </div>
  );
}
