import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./Home";
import { MealPlanner } from "./MealPlanner";
import { Contacts } from "./Contacts";
import { Recipes } from "./Recipes";
import { RecipeDetail } from "./RecipeDetail";
import { RecipeNew } from "./RecipeNew";
import { Videos } from "./Videos";
import LoginModal from "./components/LoginModal";
import "./App.css";

function Layout() {
  const location = useLocation();
  const [showLogin, setShowLogin] = useState(false);

  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  type UserData = {
    email: string;
  };

  const handleLogin = (userData: UserData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const hideHeaderOn = ["/"];
  const shouldHideHeader = hideHeaderOn.includes(location.pathname);

  let headerAction;
  if (location.pathname === "/planner") {
    headerAction = <button onClick={() => window.print()}>Vytisknout</button>;
  } else if (location.pathname === "/welcome") {
    headerAction = user ? (
      <button  onClick={handleLogout}>Odhlásit se</button>
    ) : (
      <button onClick={() => setShowLogin(true)}>Registrace/Přihlášení</button>
    );
  } else if (location.pathname === "/recipes") {
    headerAction = <Link to="/recipes/new">Přidat recept</Link>;
  }


  return (
    <>
      {!shouldHideHeader && <Header headerAction={headerAction} />}

      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} onLogin={handleLogin} />
      )}

      <Routes>
        <Route index element={<Home />} />
        <Route path="/welcome" element={<Home />} />
        <Route path="/planner" element={<MealPlanner />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/recipes/new" element={<RecipeNew />} />
        <Route path="/videos" element={<Videos />} />
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
