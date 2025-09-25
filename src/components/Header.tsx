import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
          <img src="logo.jpg" alt="Logo" />
        </div>

        <ul className="nav-links">
          <li>
            <Link to="/welcome">Úvod</Link>
          </li>

          <li>
            <Link to="/planner">Plánování jídelníčku</Link>
          </li>

          <li>
            <Link to="/videos">Videa</Link>
          </li>

          <li>
            <Link to="/recipes">Recepty</Link>
          </li>

          <li>
            <Link to="/contacts">Kontakty</Link>
          </li>
        </ul>

        <button className="nav-action" onClick={() => window.print()}>
          Vytisknout
        </button>
      </nav>
    </header>
  );
}
