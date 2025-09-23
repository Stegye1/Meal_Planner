import React from "react";

export function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
          <img src="logo.jpg" alt="Logo" />
        </div>

        <ul className="nav-links">
          <li>
            <a href="/welcome">Úvod</a>
          </li>

          <li>
            <a href="/planner">Plánování jídelníčku</a>
          </li>

          <li>
            <a href="/videos">Videa</a>
          </li>

          <li>
            <a href="/recipes">Recepty</a>
          </li>

          <li>
            <a href="/contacts">Kontakty</a>
          </li>
        </ul>

        <button className="nav-action" onClick={() => window.print()}>
          Vytisknout
        </button>
      </nav>
    </header>
  );
}
