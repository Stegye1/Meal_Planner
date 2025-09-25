import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./Home";
import { MealPlanner } from "./MealPlanner";
import "./App.css";
import { Contacts } from "./Contacts";
import { Recipes } from "./Recipes";
import { Videos } from "./Videos";

function Layout() {
  const location = useLocation();
  const hideHeaderOn = ["/"]; // seznam cest, kde se hlavička nemá zobrazit
  const shouldHideHeader = hideHeaderOn.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}

      <Routes>
        <Route index element={<Home />} />
        <Route path="/welcome" element={<Home />} />
        <Route path="/planner" element={<MealPlanner />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/recipes" element={<Recipes />} />
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
