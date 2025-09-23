import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./Home";
import { MealPlanner } from "./MealPlanner";
import "./App.css";
import { Contacts } from "./Contacts";
import { Recipes } from "./Recipes";
import { Videos } from "./Videos";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planner" element={<MealPlanner />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/recipes" element={<Recipes />} />
         <Route path="/videos" element={<Videos />} />
         <Route path="/welcome" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

/*

type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

const days: Day[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const mealTypes: { label: string; value: MealType }[] = [
  { label: "Snídaně", value: "breakfast" },
  { label: "Oběd", value: "lunch" },
  { label: "Večeře", value: "dinner" },
];

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
          <img src="logo.jpg" alt="Logo" />
        </div>
        <ul className="nav-links">
          <li>
            <a href="/">Plánování jídelníčku</a>
          </li>
          <li>
            <a href="/videos/">Videa</a>
          </li>
          <li>
            <a href="/recipes/">Recepty</a>
          </li>

          <li>
            <a href="/contacts/">Kontakty</a>
          </li>
        </ul>
        <button className="nav-action" onClick={() => window.print()}>
          Tisknout nákupní seznam
        </button>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      &copy; 2025 Můj chytrý jídelníček / Smart Meal Planner
    </footer>
  );
}

const DefaultWeekPlan = {
  Monday: {},
  Tuesday: {},
  Wednesday: {},
  Thursday: {},
  Friday: {},
  Saturday: {},
  Sunday: {},
};

function App() {
  const [plan, setPlan] = useState<WeekPlan>(DefaultWeekPlan);

  // Update meal selection for konkrétní den a typ jídla
  function selectMeal(day: Day, type: MealType, mealId: number | undefined) {
    setPlan((prev: WeekPlan) => {
      const dayPlan = prev[day] || {};
      let selectedMeal: Meal | undefined = undefined;
      if (mealId !== undefined) {
        selectedMeal = meals.find(
          (m) => m.id === mealId && m.types.includes(type)
        );
      }
      return { ...prev, [day]: { ...dayPlan, [type]: selectedMeal } };
    });
  }

  // Sestavení nákupního seznamu – sloučení všech ingrediencí bez opakování
  const shoppingList = Array.from(
    new Set(
      Object.values(plan).flatMap((dayPlan) =>
        ["breakfast", "lunch", "dinner"].flatMap((mealType) => {
          const meal = (dayPlan as any)[mealType];
          return meal ? meal.ingredients : [];
        })
      )
    )
  );

  return (
    <>
      <Header />

    
      <main className="main-content" id="plan">
        <div id="menu">
          <h2>Můj chytrý jídelníček</h2>
          {days.map((day) => (
            <div
              key={day}
              style={{
                marginBottom: 20,
                borderBottom: "1px solid #ccc",
                paddingBottom: 10,
              }}
            >
              <h2>{day}</h2>
              {mealTypes.map(({ label, value }) => {
                // filtrace jídel pro typ
                const options = meals.filter((m) => m.types.includes(value));
                // aktuálně vybrané jídlo pro den a typ

                const selectedId = plan[day as Day]?.[value]?.id;

                return (
                  <div key={value} style={{ marginBottom: 8 }}>
                    <label>{label}: </label>
                    <select
                      value={selectedId ?? ""}
                      onChange={(e) =>
                        selectMeal(
                          day,
                          value,
                          e.target.value ? +e.target.value : undefined
                        )
                      }
                    >
                      <option value="">-- vyberte jídlo --</option>
                      {options.map((meal) => (
                        <option key={meal.id} value={meal.id}>
                          {meal.name}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

      
        <section id="shopping-list" className="shopping-list">
          <h2>Nákupní seznam</h2>
          {shoppingList.length > 0 ? (
            <ul>
              {shoppingList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>Žádná jídla nebyla vybrána.</p>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
*/
